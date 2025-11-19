import React, { useRef, useState } from "react";

type Tilt3DProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees
  scale?: number; // scale on hover
  shine?: boolean; // enable subtle shine overlay
};

/**
 * Lightweight 3D tilt wrapper with smooth transform and optional shine.
 * No dependencies; uses requestAnimationFrame for buttery motion.
 */
function Tilt3D({
  children,
  className,
  maxTilt = 12,
  scale = 1.02,
  shine = true,
  onMouseEnter: userEnter,
  onMouseLeave: userLeave,
  onMouseMove: userMove,
  ...rest
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const update = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (py - 0.5) * (maxTilt * 2); // rotateX
    const ry = (0.5 - px) * (maxTilt * 2); // rotateY

    const run = () => {
      if (!ref.current) return;
      ref.current.style.transform = `perspective(900px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg) scale(${hovered ? scale : 1})`;
      if (shine) {
        ref.current.style.setProperty(
          "--tilt-shine-x",
          `${Math.round(px * 100)}%`
        );
        ref.current.style.setProperty(
          "--tilt-shine-y",
          `${Math.round(py * 100)}%`
        );
      }
      frame.current = null;
    };

    if (!frame.current) frame.current = requestAnimationFrame(run);
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div
      className={
        "tilt-3d relative will-change-transform transition-transform duration-200 " +
        (className || "")
      }
      onMouseEnter={(e) => {
        setHovered(true);
        userEnter && userEnter(e);
      }}
      onMouseMove={(e) => {
        update(e);
        userMove && userMove(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        reset();
        userLeave && userLeave(e);
      }}
      {...rest}
    >
      <div
        ref={ref}
        className="[transform-style:preserve-3d]"
        style={{ transform: "perspective(900px)" }}
      >
        {children}
        {shine && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-inherit"
            style={{
              background:
                "radial-gradient( circle at var(--tilt-shine-x,50%) var(--tilt-shine-y,50%), rgba(255,255,255,0.25), transparent 60% )",
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Tilt3D;
