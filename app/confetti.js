"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateSize() {
      setSize(motion.matches ? null : { width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    motion.addEventListener("change", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      motion.removeEventListener("change", updateSize);
    };
  }, [complete]);

  if (!size || complete) return null;

  return (
    <ReactConfetti
      {...size}
      aria-hidden="true"
      numberOfPieces={180}
      recycle={false}
      gravity={0.16}
      colors={["#6ee7b7", "#34d399", "#93c5fd", "#e2e8f0", "#c4b5fd"]}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}
      onConfettiComplete={() => setComplete(true)}
    />
  );
}
