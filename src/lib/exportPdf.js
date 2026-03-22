import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';

const PAGE_MARGIN_MM = 10;
const PIXEL_RATIO    = 2;

/** Background colour of the report (#0f111a). */
const BG = { r: 15, g: 17, b: 26 };
const BG_TOLERANCE   = 30;
const BREAK_SEARCH   = 0.08; // search ±8 % of page height for a clean break row

// ── DOM pre-processing ────────────────────────────────────────────────────────

/**
 * Reads `window.getComputedStyle(el).color` for every element in the subtree
 * and writes it back as an explicit inline `style.color`.
 *
 * Why: Tailwind v4 maps utility classes like `text-slate-200` to CSS custom
 * properties that resolve to `oklch(…)`. SVG foreignObject (used by
 * html-to-image) inherits CSS variables from the host document but some
 * browsers silently drop them during SVG serialisation, making text invisible.
 * Inlining the already-computed RGB/sRGB value avoids the CSS variable chain.
 *
 * Also removes `backdrop-filter` from every element: it creates CSS stacking
 * contexts that break the SVG foreignObject compositing model and prevent
 * html-to-image from reading <canvas> pixel data.
 *
 * @param {HTMLElement} element
 * @returns {() => void}  restore function — call after capture
 */
export function prepareForCapture(element) {
    const saved = [];

    [element, ...element.querySelectorAll('*')].forEach(el => {
        if (!(el instanceof HTMLElement)) return;
        const cs  = window.getComputedStyle(el);
        const orig = {};

        // Inline computed text colour (converts oklch / CSS variables → rgb)
        const color = cs.color;
        if (color) {
            orig.color = el.style.color;
            el.style.color = color;
        }

        // Remove backdrop-filter (SVG foreignObject ignores it but it creates
        // stacking contexts that can prevent child text from painting and
        // blocks canvas pixel access)
        const bf = cs.backdropFilter || cs.webkitBackdropFilter;
        if (bf && bf !== 'none') {
            orig.backdropFilter       = el.style.backdropFilter;
            orig.webkitBackdropFilter = el.style.webkitBackdropFilter;
            el.style.backdropFilter       = 'none';
            el.style.webkitBackdropFilter = 'none';
        }

        if (Object.keys(orig).length) saved.push({ el, orig });
    });

    return () => saved.forEach(({ el, orig }) => Object.assign(el.style, orig));
}

/**
 * Hides every `.no-print` element within `element` by setting `display: none`.
 * Returns a restore function.
 */
export function hidePrintExcluded(element) {
    const saved = [];
    element.querySelectorAll('.no-print').forEach(el => {
        saved.push({ el, display: el.style.display });
        el.style.display = 'none';
    });
    return () => saved.forEach(({ el, display }) => { el.style.display = display; });
}

// ── Canvas helpers (kept for backward-compatibility / direct use) ─────────────

/**
 * Reads every <canvas> inside `element`, capturing its pixel data and its
 * position relative to `element`.
 *
 * Note: html-to-image natively captures <canvas> content once backdrop-filter
 * stacking contexts are removed (see prepareForCapture). These helpers are
 * retained for scenarios where compositing is explicitly needed.
 */
export function collectChartSnapshots(element) {
    const parentRect = element.getBoundingClientRect();
    const snapshots  = [];

    element.querySelectorAll('canvas').forEach(canvas => {
        try {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const rect    = canvas.getBoundingClientRect();
            snapshots.push({
                dataUrl,
                x: (rect.left - parentRect.left) * PIXEL_RATIO,
                y: (rect.top  - parentRect.top)  * PIXEL_RATIO,
                w: rect.width  * PIXEL_RATIO,
                h: rect.height * PIXEL_RATIO,
            });
        } catch (_) {
            // Skip tainted (cross-origin) canvases
        }
    });

    return snapshots;
}

/**
 * Draws each snapshot image onto `pageCanvas` at the recorded position.
 * Resolves after all images are painted.
 */
export function compositeCharts(pageCanvas, snapshots) {
    const ctx = pageCanvas.getContext('2d');
    return Promise.all(
        snapshots.map(({ dataUrl, x, y, w, h }) =>
            new Promise(resolve => {
                const img   = new Image();
                img.onload  = () => { ctx.drawImage(img, x, y, w, h); resolve(); };
                img.onerror = resolve;
                img.src     = dataUrl;
            })
        )
    );
}

// ── Smart page-break detection ────────────────────────────────────────────────

/**
 * Returns true when every pixel in row `y` of `canvas` matches the report
 * background colour within BG_TOLERANCE — indicating a safe cut point.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number}                  canvasWidth
 * @param {number}                  y
 */
function isBackgroundRow(ctx, canvasWidth, y) {
    try {
        const { data } = ctx.getImageData(0, y, canvasWidth, 1);
        for (let i = 0; i < data.length; i += 4) {
            if (Math.abs(data[i]   - BG.r) > BG_TOLERANCE ||
                Math.abs(data[i+1] - BG.g) > BG_TOLERANCE ||
                Math.abs(data[i+2] - BG.b) > BG_TOLERANCE) {
                return false;
            }
        }
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Searches for the nearest background row to `targetY`, scanning upward first
 * (so pages are never taller than `pageHeightPx`) then slightly downward.
 * Falls back to `targetY` if nothing is found within `window` pixels.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} targetY
 * @param {number} window      Max pixels to search
 * @returns {number}
 */
function findBreakRow(ctx, canvasWidth, canvasHeight, targetY, window) {
    // Prefer scanning upward (never exceeds page height)
    for (let dy = 0; dy <= window; dy++) {
        const y = targetY - dy;
        if (y > 0 && isBackgroundRow(ctx, canvasWidth, y)) return y;
    }
    // Fall back: scan a short distance downward
    const downLimit = Math.min(Math.round(window * 0.25), 80);
    for (let dy = 1; dy <= downLimit; dy++) {
        const y = targetY + dy;
        if (y < canvasHeight && isBackgroundRow(ctx, canvasWidth, y)) return y;
    }
    return targetY;
}

/**
 * Calculates page-break Y positions (in canvas pixels) that snap to
 * background-coloured rows, avoiding cuts through text or charts.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number}            pageHeightPx  Nominal page height in canvas pixels
 * @returns {number[]}  Y positions where each page ends (ascending, exclusive of
 *                      canvas.height — that is always the last boundary)
 */
export function calculatePageBreaks(canvas, pageHeightPx) {
    const ctx    = canvas.getContext('2d');
    const width  = canvas.width;
    const height = canvas.height;
    const search = Math.round(pageHeightPx * BREAK_SEARCH);
    const breaks = [];
    let cutY = Math.round(pageHeightPx);

    while (cutY < height) {
        const snap = findBreakRow(ctx, width, height, cutY, search);
        breaks.push(snap);
        cutY = snap + Math.round(pageHeightPx);
    }

    return breaks;
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Captures a DOM element as a paginated A4 PDF, preserving the dark theme.
 *
 * Strategy:
 *  1. Pre-process the element: inline computed text colours, remove
 *     backdrop-filter, hide .no-print nodes.
 *  2. Capture the full page layout with html-to-image (which natively reads
 *     <canvas> elements once stacking contexts are resolved).
 *  3. Restore the original DOM state.
 *  4. Detect smart page-break positions that snap to background rows,
 *     avoiding cuts through text or charts.
 *  5. Crop each section into its own canvas and add to the PDF.
 *
 * @param {HTMLElement} element   DOM node to export
 * @param {string}      filename  Output filename (default: 'SAMMwise-Report.pdf')
 */
export async function exportReportToPdf(element, filename = 'SAMMwise-Report.pdf') {
    const elementW = element.scrollWidth  || element.offsetWidth;
    const elementH = element.scrollHeight || element.offsetHeight;

    // Step 1 — pre-process DOM
    const restoreColors = prepareForCapture(element);
    const restoreHidden = hidePrintExcluded(element);

    // Step 2 — capture (html-to-image reads <canvas> natively)
    let pageCanvas;
    try {
        pageCanvas = await toCanvas(element, {
            backgroundColor: '#0f111a',
            pixelRatio:      PIXEL_RATIO,
            width:           elementW,
            height:          elementH,
        });
    } finally {
        // Step 3 — restore regardless of success or failure
        restoreColors();
        restoreHidden();
    }

    // Step 4 — smart page breaks
    const pdf      = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW    = pdf.internal.pageSize.getWidth();
    const pageH    = pdf.internal.pageSize.getHeight();
    const contentW = pageW - PAGE_MARGIN_MM * 2;
    const contentH = pageH - PAGE_MARGIN_MM * 2;
    const ratio    = contentW / pageCanvas.width;         // mm per canvas-pixel

    const pageHeightPx = Math.round(contentH / ratio);   // page height in canvas px
    const breakPoints  = calculatePageBreaks(pageCanvas, pageHeightPx);

    // Build [startY, endY] sections
    const sections = [];
    let start = 0;
    for (const bp of breakPoints) {
        sections.push([start, bp]);
        start = bp;
    }
    sections.push([start, pageCanvas.height]);

    // Step 5 — crop each section and add to PDF
    for (let i = 0; i < sections.length; i++) {
        const [startY, endY] = sections[i];
        const sectionH = endY - startY;
        if (sectionH <= 0) continue;

        if (i > 0) pdf.addPage();

        const slice = document.createElement('canvas');
        slice.width  = pageCanvas.width;
        slice.height = sectionH;
        slice.getContext('2d').drawImage(
            pageCanvas,
            0, startY, pageCanvas.width, sectionH,
            0, 0,      pageCanvas.width, sectionH,
        );

        pdf.addImage(
            slice.toDataURL('image/jpeg', 0.92),
            'JPEG',
            PAGE_MARGIN_MM,
            PAGE_MARGIN_MM,
            contentW,
            sectionH * ratio,
        );
    }

    pdf.save(filename);
}
