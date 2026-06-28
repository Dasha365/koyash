import { useLayoutEffect, useRef, useState } from 'react';
import './Stage.css';

// ── One scaling authority for the whole site ──────────────────────────────
// Every screen is designed on a fixed-width canvas and scaled to the viewport
// *width* (anchored top-left), so it always fills the width edge-to-edge — the
// progress bar reaches the screen edges and the top logo is never clipped. If
// the scaled height exceeds the viewport the page simply scrolls vertically.
export const STAGE_W = 1307;
export const STAGE_H = 738;
const MAX_SCALE = 1.6; // never blow the design up past this on ultra-wide displays

export default function Stage({ w = STAGE_W, h = STAGE_H, mode = 'screen', children }) {
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [outerH, setOuterH] = useState(0);

  useLayoutEffect(() => {
    function recompute() {
      const s = Math.min(window.innerWidth / w, MAX_SCALE);
      setScale(s);
      const contentH = mode === 'page' ? innerRef.current?.offsetHeight || h : h;
      setOuterH(contentH * s);
    }
    recompute();
    window.addEventListener('resize', recompute);
    const ro = new ResizeObserver(recompute);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => {
      window.removeEventListener('resize', recompute);
      ro.disconnect();
    };
  }, [w, h, mode]);

  return (
    <div className={`stageOuter ${mode === 'page' ? 'stagePage' : 'stageScreen'}`} style={{ height: outerH || undefined }}>
      <div
        ref={innerRef}
        className={`stageInner ${mode === 'page' ? 'stageInnerPage' : 'stageInnerScreen'}`}
        style={{ width: w, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
