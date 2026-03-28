import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';

const PAGE_MARGIN_MM = 10;
const PIXEL_RATIO = 2;

/** Background colour of the report (#0f111a). */
const BG = { r: 15, g: 17, b: 26 };
const BG_TOLERANCE = 30;
const BREAK_SEARCH = 0.08; // search ±8 % of page height for a clean break row

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
 * @param element
 * @returns restore function — call after capture
 */
export function prepareForCapture(element: HTMLElement): () => void {
    const saved: Array<{ el: HTMLElement; orig: Record<string, string> }> = [];

    [element, ...element.querySelectorAll('*')].forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        const cs = window.getComputedStyle(node);
        const orig: Record<string, string> = {};

        const color = cs.color;
        if (color) {
            orig.color = node.style.color;
            node.style.color = color;
        }

        const bf = cs.backdropFilter || (cs as any).webkitBackdropFilter;
        if (bf && bf !== 'none') {
            orig.backdropFilter = node.style.backdropFilter;
            orig.webkitBackdropFilter = (node.style as any).webkitBackdropFilter;
            node.style.backdropFilter = 'none';
            (node.style as any).webkitBackdropFilter = 'none';
        }

        if (Object.keys(orig).length) saved.push({ el: node, orig });
    });

    return () => saved.forEach(({ el, orig }) => Object.assign(el.style, orig));
}

/**
 * Hides every `.no-print` element within `element` by setting `display: none`.
 * Returns a restore function.
 */
export function hidePrintExcluded(element: HTMLElement): () => void {
    const saved: Array<{ el: HTMLElement; display: string }> = [];
    element.querySelectorAll('.no-print').forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        saved.push({ el: node, display: node.style.display });
        node.style.display = 'none';
    });
    return () => saved.forEach(({ el, display }) => { el.style.display = display; });
}

// ── Canvas helpers (kept for backward-compatibility / direct use) ─────────────

export interface ChartSnapshot {
    dataUrl: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export function collectChartSnapshots(element: HTMLElement): ChartSnapshot[] {
    const parentRect = element.getBoundingClientRect();
    const snapshots: ChartSnapshot[] = [];

    element.querySelectorAll('canvas').forEach(canvas => {
        try {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const rect = canvas.getBoundingClientRect();
            snapshots.push({
                dataUrl,
                x: (rect.left - parentRect.left) * PIXEL_RATIO,
                y: (rect.top - parentRect.top) * PIXEL_RATIO,
                w: rect.width * PIXEL_RATIO,
                h: rect.height * PIXEL_RATIO,
            });
        } catch (_) {
            // Skip tainted (cross-origin) canvases
        }
    });

    return snapshots;
}

export function compositeCharts(
    pageCanvas: HTMLCanvasElement,
    snapshots: ChartSnapshot[]
): Promise<void[]> {
    const ctx = pageCanvas.getContext('2d')!;
    return Promise.all(
        snapshots.map(({ dataUrl, x, y, w, h }) =>
            new Promise<void>(resolve => {
                const img = new Image();
                img.onload = () => { ctx.drawImage(img, x, y, w, h); resolve(); };
                img.onerror = () => resolve();
                img.src = dataUrl;
            })
        )
    );
}

// ── Smart page-break detection ────────────────────────────────────────────────

function isBackgroundRow(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    y: number
): boolean {
    try {
        const { data } = ctx.getImageData(0, y, canvasWidth, 1);
        for (let i = 0; i < data.length; i += 4) {
            if (Math.abs(data[i] - BG.r) > BG_TOLERANCE ||
                Math.abs(data[i + 1] - BG.g) > BG_TOLERANCE ||
                Math.abs(data[i + 2] - BG.b) > BG_TOLERANCE) {
                return false;
            }
        }
        return true;
    } catch (_) {
        return false;
    }
}

function findBreakRow(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    targetY: number,
    window: number
): number {
    for (let dy = 0; dy <= window; dy++) {
        const y = targetY - dy;
        if (y > 0 && isBackgroundRow(ctx, canvasWidth, y)) return y;
    }
    const downLimit = Math.min(Math.round(window * 0.25), 80);
    for (let dy = 1; dy <= downLimit; dy++) {
        const y = targetY + dy;
        if (y < canvasHeight && isBackgroundRow(ctx, canvasWidth, y)) return y;
    }
    return targetY;
}

export function calculatePageBreaks(
    canvas: HTMLCanvasElement,
    pageHeightPx: number
): number[] {
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    const search = Math.round(pageHeightPx * BREAK_SEARCH);
    const breaks: number[] = [];
    let cutY = Math.round(pageHeightPx);

    while (cutY < height) {
        const snap = findBreakRow(ctx, width, height, cutY, search);
        breaks.push(snap);
        cutY = snap + Math.round(pageHeightPx);
    }

    return breaks;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function exportReportToPdf(
    element: HTMLElement,
    filename = 'AISVSwise-Report.pdf'
): Promise<void> {
    const elementW = element.scrollWidth || element.offsetWidth;
    const elementH = element.scrollHeight || element.offsetHeight;

    const restoreColors = prepareForCapture(element);
    const restoreHidden = hidePrintExcluded(element);

    let pageCanvas: HTMLCanvasElement;
    try {
        pageCanvas = await toCanvas(element, {
            backgroundColor: '#0f111a',
            pixelRatio: PIXEL_RATIO,
            width: elementW,
            height: elementH,
        });
    } finally {
        restoreColors();
        restoreHidden();
    }

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const contentW = pageW - PAGE_MARGIN_MM * 2;
    const contentH = pageH - PAGE_MARGIN_MM * 2;
    const ratio = contentW / pageCanvas.width;

    const pageHeightPx = Math.round(contentH / ratio);
    const breakPoints = calculatePageBreaks(pageCanvas, pageHeightPx);

    const sections: [number, number][] = [];
    let start = 0;
    for (const bp of breakPoints) {
        sections.push([start, bp]);
        start = bp;
    }
    sections.push([start, pageCanvas.height]);

    for (let i = 0; i < sections.length; i++) {
        const [startY, endY] = sections[i];
        const sectionH = endY - startY;
        if (sectionH <= 0) continue;

        if (i > 0) pdf.addPage();

        const slice = document.createElement('canvas');
        slice.width = pageCanvas.width;
        slice.height = sectionH;
        slice.getContext('2d')!.drawImage(
            pageCanvas,
            0, startY, pageCanvas.width, sectionH,
            0, 0, pageCanvas.width, sectionH,
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
