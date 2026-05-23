import { useRef, useEffect, useState, useCallback } from "react";

const TRACK_W = 600;
const TRACK_H = 400;
const LAPS = 3;
const BASE_SPEED = 2.5;

export default function F1Racing({ onFinish }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const keysRef = useRef({});
  const [speed, setSpeed] = useState(0);
  const [lap, setLap] = useState(1);
  const [bestTime, setBestTime] = useState(null);
  const [gameState, setGameState] = useState("ready");
  const [finalTime, setFinalTime] = useState(0);

  const initGame = useCallback(() => {
    const track = [];
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      const x = TRACK_W / 2 + Math.cos(t) * 150 + Math.sin(t * 3) * 20;
      const y = TRACK_H / 2 + Math.sin(t) * 100 + Math.cos(t * 2) * 15;
      track.push({ x, y });
    }
    return {
      player: { x: TRACK_W / 2 + 150, y: TRACK_H / 2, angle: 0, speed: 0 },
      track,
      lap: 1,
      progress: 0,
      lastCheckpoint: 0,
      startTime: 0,
      elapsed: 0,
      finished: false,
      sparks: [],
    };
  }, []);

  const startRace = useCallback(() => {
    const g = initGame();
    g.startTime = Date.now();
    gameRef.current = g;
    setGameState("racing");
    setLap(1);
    setSpeed(0);
  }, [initGame]);

  useEffect(() => {
    if (gameState !== "racing") return;
    const g = gameRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animId;
    const gameLoop = () => {
      const now = Date.now();
      g.elapsed = (now - g.startTime) / 1000;

      const p = g.player;
      if (keysRef.current["ArrowLeft"]) p.angle -= 0.05;
      if (keysRef.current["ArrowRight"]) p.angle += 0.05;
      if (keysRef.current["ArrowUp"]) p.speed = Math.min(p.speed + 0.15, BASE_SPEED + 2);
      else p.speed = Math.max(p.speed - 0.05, 0);

      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;

      if (p.x < 10) p.x = 10;
      if (p.x > TRACK_W - 10) p.x = TRACK_W - 10;
      if (p.y < 10) p.y = 10;
      if (p.y > TRACK_H - 10) p.y = TRACK_H - 10;

      const cx = TRACK_W / 2, cy = TRACK_H / 2;
      const dist = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
      if (dist > 170) {
        p.speed *= 0.7;
        g.sparks.push({ x: p.x, y: p.y, life: 15, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3 });
      }

      const angleToCenter = Math.atan2(p.y - cy, p.x - cx);
      const progress = ((angleToCenter + Math.PI) / (Math.PI * 2)) * 100;
      if (progress > g.lastCheckpoint + 10 || (progress < 10 && g.lastCheckpoint > 80)) {
        if (progress < g.lastCheckpoint) {
          g.lap++;
          setLap(g.lap);
          if (g.lap > LAPS) {
            g.finished = true;
            setFinalTime(g.elapsed);
            setBestTime(g.elapsed);
            setGameState("done");
            return;
          }
        }
        g.lastCheckpoint = progress;
      }

      g.sparks = g.sparks.filter(s => {
        s.x += s.vx; s.y += s.vy; s.life--; return s.life > 0;
      });

      setSpeed(Math.round(p.speed * 20));
      draw(ctx, g);
      animId = requestAnimationFrame(gameLoop);
    };
    animId = requestAnimationFrame(gameLoop);

    const handleKeyDown = (e) => { keysRef.current[e.key] = true; };
    const handleKeyUp = (e) => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  function draw(ctx, g) {
    ctx.clearRect(0, 0, TRACK_W, TRACK_H);

    const grad = ctx.createRadialGradient(TRACK_W / 2, TRACK_H / 2, 50, TRACK_W / 2, TRACK_H / 2, 200);
    grad.addColorStop(0, "#1a3a1a");
    grad.addColorStop(0.5, "#0a1a0a");
    grad.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, TRACK_W, TRACK_H);

    ctx.strokeStyle = "#555";
    ctx.lineWidth = 40;
    ctx.beginPath();
    g.track.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    g.track.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Start/finish line
    ctx.fillStyle = "white";
    for (let i = -20; i < 20; i += 8) {
      ctx.fillRect(TRACK_W / 2 + 150 - 2, TRACK_H / 2 + i, 4, 4);
    }

    // Car
    const p = g.player;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = "#E24B4A";
    ctx.fillRect(-10, -5, 20, 10);
    ctx.fillStyle = "#EF9F27";
    ctx.fillRect(-8, -4, 6, 8);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(-12, -3, 4, 6);
    ctx.fillStyle = "#333";
    ctx.fillRect(-4, -6, 8, 2);
    ctx.restore();

    // Sparks
    g.sparks.forEach(s => {
      ctx.globalAlpha = s.life / 15;
      ctx.fillStyle = "#FFD700";
      ctx.fillRect(s.x, s.y, 3, 3);
    });
    ctx.globalAlpha = 1;

    // HUD
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, TRACK_W, 28);
    ctx.fillStyle = "#EF9F27";
    ctx.font = "14px monospace";
    ctx.fillText(`🏎️ LAP ${g.lap}/${LAPS}`, 10, 20);
    ctx.fillStyle = "#97C459";
    ctx.fillText(`SPEED: ${Math.round(p.speed * 20)} km/h`, TRACK_W / 2 - 60, 20);
    ctx.fillStyle = "#63a4ff";
    ctx.fillText(`TIME: ${g.elapsed.toFixed(1)}s`, TRACK_W - 130, 20);
    ctx.fillStyle = "#888";
    ctx.font = "10px monospace";
    ctx.fillText("← → Steer | ↑ Accelerate", 10, TRACK_H - 8);
  }

  const handleFinish = () => {
    const rewards = { focus: 8, stamina: -10, social: 10, stress: -15 };
    onFinish({ score: Math.round(1000 / Math.max(finalTime, 1)), time: finalTime, rewards });
  };

  if (gameState === "ready") {
    return (
      <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: "0.5rem" }}>🏎️</div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 10, color: "#EF9F27", lineHeight: 2, marginBottom: "0.5rem" }}>
            F1 GRAND PRIX
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#888", marginBottom: "1rem", lineHeight: 1.5 }}>
            Race {LAPS} laps around the campus track!<br />
            Use Arrow Keys to drive!
          </div>
          <button onClick={startRace} style={{ fontFamily: "'Press Start 2P'", fontSize: 9, padding: "14px 28px", background: "linear-gradient(135deg, #EF9F27, #c08010)", color: "#1a1a00", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
            ▶ START RACE
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "done") {
    return (
      <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: "0.5rem" }}>🏁</div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 11, color: "#EF9F27", lineHeight: 2, marginBottom: "0.5rem" }}>
            RACE COMPLETE!
          </div>
          <div style={{ background: "#1a2236", border: "1px solid #2a3a50", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'VT323'", fontSize: 54, color: "#FFD700", fontWeight: 700 }}>{finalTime.toFixed(1)}s</div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "#888", lineHeight: 1.8 }}>TOTAL TIME</div>
            <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#63a4ff", marginTop: "0.5rem" }}>Score: {Math.round(1000 / Math.max(finalTime, 1))}</div>
          </div>
          <button onClick={handleFinish} style={{ fontFamily: "'Press Start 2P'", fontSize: 8, padding: "12px 24px", background: "#185FA5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
            ◀ BACK TO CAMPUS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem" }}>
      <div style={{ maxWidth: 620, width: "100%" }}>
        <div style={{ background: "#111", borderRadius: 10, overflow: "hidden", border: "2px solid #2a3a50" }}>
          <canvas ref={canvasRef} width={TRACK_W} height={TRACK_H} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}
