import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Lightweight route/image prefetch and magnetic buttons init
window.addEventListener("load", () => {
  // Prefetch hero/profile image at high priority already set; prefetch other images on idle
  const prefetchImages: string[] = [
    // Add common project thumbnails if present in DOM later
  ];
  if ((window as any).requestIdleCallback) {
    (window as any).requestIdleCallback(() => {
      prefetchImages.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
      });
    });
  }

  // Magnetic buttons: elements with data-magnetic attribute
  const strength = 0.25; // how far to move towards the cursor
  let current: HTMLElement | null = null;
  const onMove = (e: MouseEvent) => {
    if (!current) return;
    const rect = current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    current.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(
      1
    )}px)`;
  };
  document.addEventListener("mouseover", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>(
      "[data-magnetic]"
    );
    if (el) {
      current = el;
      document.addEventListener("mousemove", onMove);
    }
  });
  document.addEventListener("mouseout", (e) => {
    const el = e.target as HTMLElement;
    if (
      current &&
      (el === current || el.closest("[data-magnetic]") === current)
    ) {
      current.style.transform = "translate(0,0)";
      document.removeEventListener("mousemove", onMove);
      current = null;
    }
  });
});
