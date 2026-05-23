import { useState, useEffect } from "react";

export default function BattleFlash({ onDone }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    let i = 0;
    const frames = [
      { bg: "white" }, { bg: "#111" }, { bg: "white" },
      { bg: "#111" }, { bg: "white" }, { bg: "#111" },
    ];
    const iv = setInterval(() => {
      i++;
      setFrame(i);
      if (i >= frames.length) { clearInterval(iv); onDone(); }
    }, 120);
    return () => clearInterval(iv);
  }, []);

  const frames = [
    { bg: "white" }, { bg: "#111" }, { bg: "white" },
    { bg: "#111" }, { bg: "white" }, { bg: "#111" },
  ];
  const f = frames[Math.min(frame, frames.length - 1)];
  return (
    <div style={{
      position: "fixed", inset: 0, background: f.bg, zIndex: 9999,
      opacity: frame >= frames.length ? 0 : 1,
      transition: "opacity 0.08s", pointerEvents: "none",
    }} />
  );
}
