/*
 * BLUEPRINT ATELIER — measures an element's client size via ResizeObserver.
 * Used by the R3F Canvas wrappers: R3F's ResizeObserver occasionally misses
 * the first measurement, so we feed the size in explicitly.
 */
import { useEffect, useRef, useState } from "react";

export function useElementSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) setSize({ width: w, height: h });
    };
    // layout may not be computed synchronously at mount — measure again
    // after paint as a safety net before ResizeObserver callbacks land.
    raf = requestAnimationFrame(update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return { ref, ...size };
}
