import {
    collectChartSnapshots,
    compositeCharts,
    exportReportToPdf,
    prepareForCapture,
    hidePrintExcluded,
    calculatePageBreaks,
} from '../src/lib/exportPdf';

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('html-to-image', () => ({ toCanvas: jest.fn() }));
jest.mock('jspdf', () => ({ jsPDF: jest.fn() }));

import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';

// ── DOM helpers ───────────────────────────────────────────────────────────────

const DATA_URL = 'data:image/jpeg;base64,TESTPDF';
const CANVAS_PNG = 'data:image/png;base64,CHARTPNG';

/** Background-colour pixel data (r=15 g=17 b=26 a=255) for `width` pixels. */
function bgPixels(width) {
    const data = new Uint8ClampedArray(width * 4);
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 15; data[i + 1] = 17; data[i + 2] = 26; data[i + 3] = 255;
    }
    return { data };
}

/** Non-background pixel data — every pixel is bright white. */
function fgPixels(width) {
    return { data: new Uint8ClampedArray(width * 4).fill(255) };
}

/**
 * Element with explicit scrollWidth / scrollHeight (jsdom always returns 0).
 */
function makeElement(scrollWidth = 1000, scrollHeight = 2000) {
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollWidth', { value: scrollWidth, configurable: true });
    Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true });
    el.getBoundingClientRect = () => ({ left: 50, top: 100, width: scrollWidth, height: scrollHeight });
    return el;
}

/**
 * Canvas with mocked pixel data and bounding rect.
 */
function makeCanvas({ left = 100, top = 200, width = 400, height = 300 } = {}) {
    const canvas = document.createElement('canvas');
    canvas.toDataURL = jest.fn(() => CANVAS_PNG);
    canvas.getBoundingClientRect = () => ({ left, top, width, height });
    Object.defineProperty(canvas, 'offsetWidth', { value: width, configurable: true });
    Object.defineProperty(canvas, 'offsetHeight', { value: height, configurable: true });
    return canvas;
}

function makePdfInstance() {
    return {
        internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
        addImage: jest.fn(),
        addPage: jest.fn(),
        save: jest.fn(),
    };
}

/** A <canvas>-like object with a 2D context spy. */
function makePageCanvas(width = 2000, height = 4000) {
    const drawImage = jest.fn();
    const getImageData = jest.fn(() => bgPixels(width));   // returns background rows
    return {
        width,
        height,
        getContext: jest.fn(() => ({ drawImage, getImageData })),
        toDataURL: jest.fn(() => DATA_URL),
        _drawImage: drawImage,
        _getImageData: getImageData,
    };
}

// ── prepareForCapture ────────────────────────────────────────────────────────

describe('prepareForCapture', () => {
    it('returns a restore function', () => {
        const el = document.createElement('div');
        const restore = prepareForCapture(el);
        expect(typeof restore).toBe('function');
    });

    it('inlines the computed text color as an explicit style', () => {
        const el = document.createElement('div');
        prepareForCapture(el);
        expect(el.style.color).toBeTruthy();
    });

    it('restores the original inline color after calling the restore function', () => {
        const el = document.createElement('div');
        el.style.color = 'red';
        const restore = prepareForCapture(el);
        restore();
        expect(el.style.color).toBe('red');
    });

    it('removes backdrop-filter when set', () => {
        const el = document.createElement('div');
        const orig = window.getComputedStyle;
        jest.spyOn(window, 'getComputedStyle').mockImplementation(target => {
            if (target === el) {
                return { color: 'rgb(0,0,0)', backdropFilter: 'blur(8px)', webkitBackdropFilter: 'blur(8px)' };
            }
            return orig(target);
        });

        prepareForCapture(el);
        expect(el.style.backdropFilter).toBe('none');
        expect(el.style.webkitBackdropFilter).toBe('none');
        jest.restoreAllMocks();
    });

    it('restores backdrop-filter after calling the restore function', () => {
        const el = document.createElement('div');
        el.style.backdropFilter = 'blur(4px)';

        const orig = window.getComputedStyle;
        jest.spyOn(window, 'getComputedStyle').mockImplementation(target => {
            if (target === el) {
                return { color: 'rgb(0,0,0)', backdropFilter: 'blur(4px)', webkitBackdropFilter: '' };
            }
            return orig(target);
        });

        const restore = prepareForCapture(el);
        restore();
        expect(el.style.backdropFilter).toBe('blur(4px)');
        jest.restoreAllMocks();
    });

    it('processes child elements as well as the root', () => {
        const parent = document.createElement('div');
        const child = document.createElement('span');
        parent.appendChild(child);

        const orig = window.getComputedStyle;
        jest.spyOn(window, 'getComputedStyle').mockImplementation(target => {
            if (target === child) {
                return { color: 'rgb(200,200,200)', backdropFilter: 'none', webkitBackdropFilter: 'none' };
            }
            return orig(target);
        });

        prepareForCapture(parent);
        expect(child.style.color).toBeTruthy();
        jest.restoreAllMocks();
    });
});

// ── hidePrintExcluded ─────────────────────────────────────────────────────────

describe('hidePrintExcluded', () => {
    it('returns a restore function', () => {
        const el = document.createElement('div');
        const restore = hidePrintExcluded(el);
        expect(typeof restore).toBe('function');
    });

    it('does nothing when there are no .no-print elements', () => {
        const el = document.createElement('div');
        el.appendChild(document.createElement('span'));
        expect(() => hidePrintExcluded(el)).not.toThrow();
    });

    it('sets display:none on .no-print elements', () => {
        const el = document.createElement('div');
        const btn = document.createElement('button');
        btn.className = 'no-print';
        el.appendChild(btn);

        hidePrintExcluded(el);
        expect(btn.style.display).toBe('none');
    });

    it('restores the original display value after calling restore', () => {
        const el = document.createElement('div');
        const btn = document.createElement('button');
        btn.className = 'no-print';
        btn.style.display = 'inline-block';
        el.appendChild(btn);

        const restore = hidePrintExcluded(el);
        expect(btn.style.display).toBe('none');
        restore();
        expect(btn.style.display).toBe('inline-block');
    });

    it('restores empty display string when element had no inline display', () => {
        const el = document.createElement('div');
        const btn = document.createElement('button');
        btn.className = 'no-print';
        el.appendChild(btn);

        const restore = hidePrintExcluded(el);
        restore();
        expect(btn.style.display).toBe('');
    });

    it('hides multiple .no-print elements', () => {
        const el = document.createElement('div');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');
        btn1.className = 'no-print';
        btn2.className = 'no-print';
        el.appendChild(btn1);
        el.appendChild(btn2);

        hidePrintExcluded(el);
        expect(btn1.style.display).toBe('none');
        expect(btn2.style.display).toBe('none');
    });

    it('does not hide elements without .no-print class', () => {
        const el = document.createElement('div');
        const visible = document.createElement('button');
        visible.className = 'some-other-class';
        el.appendChild(visible);

        hidePrintExcluded(el);
        expect(visible.style.display).not.toBe('none');
    });
});

// ── collectChartSnapshots ────────────────────────────────────────────────────

describe('collectChartSnapshots', () => {
    it('returns an empty array when there are no canvases', () => {
        const el = makeElement();
        expect(collectChartSnapshots(el)).toEqual([]);
    });

    it('returns one snapshot per canvas', () => {
        const el = makeElement();
        el.appendChild(makeCanvas());
        el.appendChild(makeCanvas());
        expect(collectChartSnapshots(el)).toHaveLength(2);
    });

    it('records the canvas dataUrl', () => {
        const el = makeElement();
        const canvas = makeCanvas();
        el.appendChild(canvas);
        const [snap] = collectChartSnapshots(el);
        expect(snap.dataUrl).toBe(CANVAS_PNG);
    });

    it('calculates position relative to the parent element', () => {
        // parent left=50, top=100  |  canvas left=100, top=200  → rel=(50,100)
        const el = makeElement(); // getBoundingClientRect → left:50, top:100
        const canvas = makeCanvas({ left: 100, top: 200, width: 400, height: 300 });
        el.appendChild(canvas);

        const [snap] = collectChartSnapshots(el);
        // (100-50)*2 = 100, (200-100)*2 = 200
        expect(snap.x).toBe(100);
        expect(snap.y).toBe(200);
    });

    it('scales width and height by PIXEL_RATIO (×2)', () => {
        const el = makeElement();
        const canvas = makeCanvas({ left: 50, top: 100, width: 400, height: 300 });
        el.appendChild(canvas);

        const [snap] = collectChartSnapshots(el);
        expect(snap.w).toBe(800);  // 400 × 2
        expect(snap.h).toBe(600);  // 300 × 2
    });

    it('skips tainted canvases (toDataURL throws)', () => {
        const el = makeElement();
        const canvas = makeCanvas();
        canvas.toDataURL = jest.fn(() => { throw new Error('tainted'); });
        el.appendChild(canvas);

        expect(collectChartSnapshots(el)).toHaveLength(0);
    });

    it('skips the tainted canvas but keeps valid ones', () => {
        const el = makeElement();
        const bad = makeCanvas();
        bad.toDataURL = jest.fn(() => { throw new Error('tainted'); });
        const good = makeCanvas();
        el.appendChild(bad);
        el.appendChild(good);

        const snaps = collectChartSnapshots(el);
        expect(snaps).toHaveLength(1);
        expect(snaps[0].dataUrl).toBe(CANVAS_PNG);
    });
});

// ── compositeCharts ──────────────────────────────────────────────────────────

describe('compositeCharts', () => {
    beforeEach(() => {
        // Make Image load synchronously in jsdom
        jest.spyOn(global, 'Image').mockImplementation(() => {
            const img = {};
            setTimeout(() => img.onload && img.onload(), 0);
            return img;
        });
    });

    afterEach(() => jest.restoreAllMocks());

    it('resolves immediately when snapshots array is empty', async () => {
        const pc = makePageCanvas();
        await expect(compositeCharts(pc, [])).resolves.toEqual([]);
    });

    it('calls drawImage for each snapshot', async () => {
        const pc = makePageCanvas();
        const snapshots = [
            { dataUrl: CANVAS_PNG, x: 0, y: 0, w: 100, h: 100 },
            { dataUrl: CANVAS_PNG, x: 200, y: 300, w: 50, h: 50 },
        ];
        await compositeCharts(pc, snapshots);
        expect(pc._drawImage).toHaveBeenCalledTimes(2);
    });

    it('passes correct coordinates to drawImage', async () => {
        const pc = makePageCanvas();
        const snap = { dataUrl: CANVAS_PNG, x: 10, y: 20, w: 400, h: 300 };
        await compositeCharts(pc, [snap]);

        const [, x, y, w, h] = pc._drawImage.mock.calls[0];
        expect(x).toBe(10);
        expect(y).toBe(20);
        expect(w).toBe(400);
        expect(h).toBe(300);
    });
});

// ── calculatePageBreaks ───────────────────────────────────────────────────────

describe('calculatePageBreaks', () => {
    it('returns an empty array when content fits in one page', () => {
        // canvas height smaller than one page height
        const pc = makePageCanvas(2000, 500);
        expect(calculatePageBreaks(pc, 3000)).toEqual([]);
    });

    it('returns one break point for two-page content', () => {
        const pc = makePageCanvas(2000, 4000);
        // pageHeightPx = 2916 → one break inside [0, 4000]
        const breaks = calculatePageBreaks(pc, 2916);
        expect(breaks).toHaveLength(1);
    });

    it('break point is near the nominal page height', () => {
        const pc = makePageCanvas(2000, 4000);
        const [bp] = calculatePageBreaks(pc, 2916);
        // With all-background pixels the break snaps at or before targetY
        expect(bp).toBeLessThanOrEqual(2916);
        expect(bp).toBeGreaterThan(2916 * 0.9);
    });

    it('returns multiple break points for tall content', () => {
        const pc = makePageCanvas(2000, 16000);
        const breaks = calculatePageBreaks(pc, 2916);
        expect(breaks.length).toBeGreaterThanOrEqual(4);
    });

    it('falls back to the nominal cut when no background row is found', () => {
        // All pixels are foreground (white)
        const getImageData = jest.fn(() => fgPixels(2000));
        const pc = {
            width: 2000,
            height: 6000,
            getContext: jest.fn(() => ({ getImageData })),
        };
        const [bp] = calculatePageBreaks(pc, 2916);
        // Should fall back to targetY (2916) since no bg row exists
        expect(bp).toBe(2916);
    });

    it('each subsequent break is spaced approximately one page height apart', () => {
        const pc = makePageCanvas(2000, 10000);
        const pgH = 2916;
        const breaks = calculatePageBreaks(pc, pgH);
        for (let i = 1; i < breaks.length; i++) {
            const gap = breaks[i] - breaks[i - 1];
            expect(gap).toBeGreaterThan(pgH * 0.85);
            expect(gap).toBeLessThanOrEqual(pgH * 1.1);
        }
    });
});

// ── exportReportToPdf (integration) ──────────────────────────────────────────

describe('exportReportToPdf', () => {
    let pdf;
    let pageCanvas;
    let sliceCtx;

    beforeEach(() => {
        jest.clearAllMocks();
        pdf = makePdfInstance();
        pageCanvas = makePageCanvas(2000, 4000);
        jsPDF.mockImplementation(() => pdf);
        toCanvas.mockResolvedValue(pageCanvas);

        // Mock slice canvases created inside exportReportToPdf
        sliceCtx = { drawImage: jest.fn() };
        const origCreate = document.createElement.bind(document);
        jest.spyOn(document, 'createElement').mockImplementation(tag => {
            if (tag === 'canvas') {
                return {
                    width: 0,
                    height: 0,
                    getContext: jest.fn(() => sliceCtx),
                    toDataURL: jest.fn(() => DATA_URL),
                };
            }
            return origCreate(tag);
        });
    });

    afterEach(() => jest.restoreAllMocks());

    // ── toCanvas options ─────────────────────────────────────────────────────

    it('calls toCanvas with dark background', async () => {
        await exportReportToPdf(makeElement());
        expect(toCanvas).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            expect.objectContaining({ backgroundColor: '#0f111a' })
        );
    });

    it('calls toCanvas with pixelRatio 2', async () => {
        await exportReportToPdf(makeElement());
        expect(toCanvas).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            expect.objectContaining({ pixelRatio: 2 })
        );
    });

    it('passes scrollWidth and scrollHeight to toCanvas', async () => {
        await exportReportToPdf(makeElement(1440, 5000));
        expect(toCanvas).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            expect.objectContaining({ width: 1440, height: 5000 })
        );
    });

    // ── jsPDF setup ──────────────────────────────────────────────────────────

    it('creates a portrait A4 PDF', async () => {
        await exportReportToPdf(makeElement());
        expect(jsPDF).toHaveBeenCalledWith(
            expect.objectContaining({ orientation: 'portrait', format: 'a4', unit: 'mm' })
        );
    });

    // ── Single-page output ───────────────────────────────────────────────────

    it('does not call addPage when content fits one page', async () => {
        // pageCanvas: 2000×500px → fits within one A4 page
        pageCanvas = makePageCanvas(2000, 500);
        toCanvas.mockResolvedValue(pageCanvas);

        await exportReportToPdf(makeElement());
        expect(pdf.addPage).not.toHaveBeenCalled();
        expect(pdf.addImage).toHaveBeenCalledTimes(1);
    });

    it('uses JPEG format for addImage', async () => {
        await exportReportToPdf(makeElement());
        const call = pdf.addImage.mock.calls[0];
        expect(call[1]).toBe('JPEG');
    });

    it('places the image at PAGE_MARGIN_MM from the left', async () => {
        await exportReportToPdf(makeElement());
        const [, , xOffset] = pdf.addImage.mock.calls[0];
        expect(xOffset).toBe(10);
    });

    it('places each page section at PAGE_MARGIN_MM from the top', async () => {
        await exportReportToPdf(makeElement());
        const [, , , yOffset] = pdf.addImage.mock.calls[0];
        expect(yOffset).toBe(10);
    });

    it('scales image width to fit content area (210 - 2×10 = 190mm)', async () => {
        await exportReportToPdf(makeElement());
        const [, , , , imgWidth] = pdf.addImage.mock.calls[0];
        expect(imgWidth).toBeCloseTo(190, 1);
    });

    // ── Multi-page output ────────────────────────────────────────────────────

    it('adds extra pages for a tall canvas', async () => {
        pageCanvas = makePageCanvas(2000, 16000);
        toCanvas.mockResolvedValue(pageCanvas);

        await exportReportToPdf(makeElement());
        expect(pdf.addPage).toHaveBeenCalled();
    });

    it('calls addImage once per page', async () => {
        pageCanvas = makePageCanvas(2000, 16000);
        toCanvas.mockResolvedValue(pageCanvas);

        await exportReportToPdf(makeElement());
        const total = pdf.addPage.mock.calls.length + 1;
        expect(pdf.addImage).toHaveBeenCalledTimes(total);
    });

    it('each page section starts at PAGE_MARGIN_MM from the top', async () => {
        pageCanvas = makePageCanvas(2000, 16000);
        toCanvas.mockResolvedValue(pageCanvas);

        await exportReportToPdf(makeElement());
        pdf.addImage.mock.calls.forEach(call => {
            expect(call[3]).toBe(10); // yOffset always PAGE_MARGIN_MM
        });
    });

    // ── Filename ─────────────────────────────────────────────────────────────

    it('saves with the default filename', async () => {
        await exportReportToPdf(makeElement());
        expect(pdf.save).toHaveBeenCalledWith('AISVSwise-Report.pdf');
    });

    it('saves with the provided filename', async () => {
        await exportReportToPdf(makeElement(), 'Empresa-Projeto.pdf');
        expect(pdf.save).toHaveBeenCalledWith('Empresa-Projeto.pdf');
    });

    it('calls save exactly once', async () => {
        await exportReportToPdf(makeElement());
        expect(pdf.save).toHaveBeenCalledTimes(1);
    });

    // ── Error propagation ─────────────────────────────────────────────────────

    it('propagates toCanvas errors to the caller', async () => {
        toCanvas.mockRejectedValue(new Error('layout capture failed'));
        await expect(exportReportToPdf(makeElement())).rejects.toThrow('layout capture failed');
    });
});
