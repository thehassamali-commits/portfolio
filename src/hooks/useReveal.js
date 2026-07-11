import { useEffect, useRef, useState } from "react";

// Fires once when the element scrolls into view, then stops observing.
// prefers-reduced-motion is already handled globally in tokens.css
// (it zeroes out all transition durations), so this hook doesn't need
// its own reduced-motion branch — the class still toggles, it just
// won't animate for those users.
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
