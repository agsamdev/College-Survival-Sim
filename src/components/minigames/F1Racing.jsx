import { useRef, useEffect, useState, useCallback } from "react";
import {
  playEngineSound, playCrowdRoar, playLapComplete,
  playRaceFinish, playEngineStart,
} from "../../utils/audio";

const TRACK_W = 600;
const TRACK_H = 400;
const LAPS = 3;
const BASE_SPEED = 2.5;

function drawAudience(ctx, track, c) {
  c.save();
  const cx = TRACK_W / 2, cy = TRACK_H / 2;
  for (let i = 0; i < track.length; i += 3) {
    const pt = track[i];
    const nx = -(Math.cos(i / 100 * Math.PI * 2 + 0.5));
    const ny = -(Math.sin(i / 100 * Math.PI * 2 + 0.5));
    const side = i % 6 < 3 ? 1 : -1;
    const ox = nx * (side * 32);
    const oy = ny * (side * 24);
    const ax = pt.x + ox, ay = pt.y + oy;
    if (ax < 5 || ax > TRACK_W - 5 || ay < 5 || ay > TRACK_H - 5) continue;
    const colors = ["#E24B4A", "#185FA5", "#EF9F27", "#97C459", "#63a4ff", "#D85A30"];
    const col = colors[(i + Math.floor(c.elapsed * 2)) % colors.length];
    c.fillStyle = "#2a1a08";
    c.fillRect(ax - 2, ay - 4, 4, 6);
    c.fillStyle = "#F5CBA7";
    c.fillRect(ax - 1.5, ay - 5, 3, 2);
    c.fillStyle = col;
    c.fillRect(ax - 2, ay + 1, 4, 4);
  }
  c.restore();
}

function drawGrandstands(ctx) {
  const cx = TRACK_W / 2, cy = TRACK_H / 2;
  [[cx, 15], [cx, TRACK_H - 15], [20, cy], [TRACK_W - 20, cy]].forEach(([gx, gy]) => {
    ctx.fillStyle = "#2a2a3e";
    ctx.fillRect(gx - 30, gy - 8, 60, 16);
    ctx.fillStyle = "#3a3a5e";
    ctx.fillRect(gx - 28, gy - 6, 56, 12);
    for (let r = 0; r < 3; r++) {
      for (let s = 0; s < 5; s++) {
        ctx.fillStyle = ["#E24B4A", "#185FA5", "#EF9F27", "#97C459", "#D85A30"][(r + s) % 5];
        ctx.fillRect(gx - 22 + s * 10, gy - 5 + r * 3, 6, 2);
      }
    }
  });
}

function drawTrack(ctx, g) {
  const grad = ctx.createRadialGradient(TRACK_W / 2, TRACK_H / 2, 50, TRACK_W / 2, TRACK_H / 2, 220);
  grad.addColorStop(0, "#2a5a2a");
  grad.addColorStop(0.4, "#1a3a1a");
  grad.addColorStop(1, "#0a0a0a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, TRACK_W, TRACK_H);

  // Track base
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 44;
  ctx.beginPath();
  g.track.forEach((pt, i) => { i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y); });
  ctx.closePath();
  ctx.stroke();

  // Track surface
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 38;
  ctx.beginPath();
  g.track.forEach((pt, i) => { i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y); });
  ctx.closePath();
  ctx.stroke();

  // Curbing (red/white)
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  g.track.forEach((pt, i) => { i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y); });
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);

  // Inner grass
  ctx.fillStyle = "#1a4a1a";
  ctx.beginPath();
  ctx.ellipse(TRACK_W / 2, TRACK_H / 2, 120, 70, 0, 0, Math.PI * 2);
  ctx.fill();

  // Track markings (small dots along track)
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  for (let i = 5; i < g.track.length; i += 10) {
    const pt = g.track[i];
    ctx.fillRect(pt.x - 1, pt.y - 1, 2, 2);
  }
}

function drawCar(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(-10, -4, 22, 12);
  // Main body
  ctx.fillStyle = "#E24B4A";
  ctx.fillRect(-10, -5, 20, 10);
  // Cockpit
  ctx.fillStyle = "#222";
  ctx.fillRect(-4, -4, 8, 8);
  // Headrest
  ctx.fillStyle = "#E24B4A";
  ctx.fillRect(-5, -6, 10, 2);
  // Front wing
  ctx.fillStyle = "#EF9F27";
  ctx.fillRect(-12, -2, 4, 4);
  ctx.fillRect(8, -2, 4, 4);
  // Rear wing
  ctx.fillStyle = "#EF9F27";
  ctx.fillRect(-13, -6, 2, 12);
  ctx.fillRect(11, -6, 2, 12);
  // Nose
  ctx.fillStyle = "#ff6b6b";
  ctx.fillRect(-14, -2, 4, 4);
  // Wheels
  ctx.fillStyle = "#111";
  ctx.fillRect(-11, -7, 3, 2);
  ctx.fillRect(-11, 5, 3, 2);
  ctx.fillRect(8, -7, 3, 2);
  ctx.fillRect(8, 5, 3, 2);
  // Wheel rims
  ctx.fillStyle = "#888";
  ctx.fillRect(-10, -6, 1, 1);
  ctx.fillRect(-10, 5, 1, 1);
  ctx.fillRect(9, -6, 1, 1);
  ctx.fillRect(9, 5, 1, 1);
  ctx.restore();
}

function drawStartLights(ctx, g) {
  const lx = TRACK_W / 2 + 150, ly = TRACK_H / 2 - 30;
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = g.elapsed < 2 ? (i < Math.floor(g.elapsed * 2.5) ? "#E24B4A" : "#333") : "#97C459";
    ctx.fillRect(lx - 12 + i * 6, ly, 4, 6);
  }
  if (g.elapsed < 2) {
    ctx.fillStyle = "#888";
    ctx.font = "8px monospace";
    ctx.fillText("LIGHTS OUT", lx - 18, ly + 14);
  }
}

function drawTrees(ctx) {
  const trees = [
    { x: 40, y: 30 }, { x: 55, y: 10 }, { x: 10, y: 55 },
    { x: TRACK_W - 40, y: 30 }, { x: TRACK_W - 55, y: 10 }, { x: TRACK_W - 10, y: 55 },
    { x: 40, y: TRACK_H - 30 }, { x: 10, y: TRACK_H - 55 },
    { x: TRACK_W - 40, y: TRACK_H - 30 }, { x: TRACK_W - 10, y: TRACK_H - 55 },
  ];
  trees.forEach(({ x, y }) => {
    ctx.fillStyle = "#2a1a08";
    ctx.fillRect(x - 2, y - 2, 4, 8);
    ctx.fillStyle = "#1a6a1a";
    ctx.beginPath();
    ctx.arc(x, y - 6, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2a8a2a";
    ctx.beginPath();
    ctx.arc(x, y - 8, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

export default function F1Racing({ onFinish }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const keysRef = useRef({});
  const [speed, setSpeed] = useState(0);
  const [lap, setLap] = useState(1);
  const [bestTime, setBestTime] = useState(null);
  const [gameState, setGameState] = useState("ready");
  const [finalTime, setFinalTime] = useState(0);
  const [showMusic, setShowMusic] = useState(false);

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
      soundTimer: 0,
    };
  }, []);

  const startRace = useCallback(() => {
    const g = initGame();
    g.startTime = Date.now();
    gameRef.current = g;
    setGameState("racing");
    setLap(1);
    setSpeed(0);
    playEngineStart();
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
      const wasMoving = p.speed > 0.1;

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

      // Engine sound
      if (p.speed > 0.3) {
        g.soundTimer++;
        if (g.soundTimer % 4 === 0) playEngineSound(p.speed);
      }

      // Crowd when fast
      if (p.speed > 2 && Math.random() < 0.02) playCrowdRoar(p.speed / 5);

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
            playRaceFinish();
            return;
          }
          playLapComplete();
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
    drawTrack(ctx, g);
    drawTrees(ctx);
    drawGrandstands(ctx);
    drawAudience(ctx, g.track, g);

    // Start/finish line
    ctx.fillStyle = "white";
    for (let i = -24; i < 24; i += 6) {
      ctx.fillStyle = i % 12 === 0 ? "white" : "#333";
      ctx.fillRect(TRACK_W / 2 + 150 - 2, TRACK_H / 2 + i, 4, 4);
    }

    drawStartLights(ctx, g);

    // Sparks
    g.sparks.forEach(s => {
      ctx.globalAlpha = s.life / 15;
      ctx.fillStyle = "#FFD700";
      ctx.fillRect(s.x, s.y, 3, 3);
    });
    ctx.globalAlpha = 1;

    // Speed lines
    if (g.player.speed > 1.5) {
      ctx.strokeStyle = `rgba(255,255,255,${(g.player.speed - 1.5) / 8 * 0.1})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const sx = g.player.x + (Math.random() - 0.5) * 40;
        const sy = g.player.y + (Math.random() - 0.5) * 40;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (Math.random() - 0.5) * 20, sy + (Math.random() - 0.5) * 20);
        ctx.stroke();
      }
    }

    // Car
    drawCar(ctx, g.player);

    // HUD
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, TRACK_W, 30);
    ctx.fillStyle = "#EF9F27";
    ctx.font = "bold 14px monospace";
    ctx.fillText(`🏁 LAP ${g.lap}/${LAPS}`, 10, 20);
    ctx.fillStyle = "#97C459";
    ctx.fillText(`⚡ ${Math.round(g.player.speed * 20)} km/h`, TRACK_W / 2 - 60, 20);
    ctx.fillStyle = "#63a4ff";
    ctx.fillText(`⏱ ${g.elapsed.toFixed(1)}s`, TRACK_W - 130, 20);
    ctx.fillStyle = "#888";
    ctx.font = "10px monospace";
    ctx.fillText("← → Steer | ↑ Accelerate", 10, TRACK_H - 8);
  }

  const handleFinish = () => {
    const minTime = Math.max(finalTime, 1);
    const score = minTime < 15 ? 1000 : minTime < 25 ? 800 : minTime < 40 ? 500 : 300;
    const rewards = { focus: 8, stamina: -10, social: 10, stress: -15 };
    if (minTime < 20) {
      rewards.focus += 5;
      rewards.social += 5;
    }
    onFinish({ score: Math.round(score / minTime * 30), time: finalTime, rewards });
  };

  if (gameState === "ready") {
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1117 0%, #1a1a0a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background checkered pattern */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.03,
          backgroundImage: "linear-gradient(45deg, #EF9F27 25%, transparent 25%, transparent 75%, #EF9F27 75%)",
          backgroundSize: "20px 20px",
        }} />
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: "0.5rem", animation: "floatSlow 3s ease-in-out infinite" }}>🏎️</div>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 10, color: "#EF9F27",
            lineHeight: 2, marginBottom: "0.25rem", textShadow: "0 0 20px rgba(239,159,39,0.3)",
          }}>
            F1 GRAND PRIX
          </div>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888",
            lineHeight: 1.6, marginBottom: "0.75rem",
          }}>
            CAMPUS CHALLENGE
          </div>
          <div style={{
            background: "#1a2236", border: "1px solid #EF9F2740", borderRadius: 12,
            padding: "1rem", marginBottom: "1.25rem",
          }}>
            <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#ccc", lineHeight: 1.6 }}>
              Race {LAPS} laps around the campus track!
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 16, color: "#888", lineHeight: 1.5 }}>
              ← → Steer · ↑ Accelerate · Avoid the grass!
            </div>
          </div>
          <button onClick={startRace} style={{
            fontFamily: "'Press Start 2P'", fontSize: 9, padding: "14px 28px",
            background: "linear-gradient(135deg, #EF9F27, #c08010)",
            color: "#1a1a00", border: "none", borderRadius: 8, cursor: "pointer",
            lineHeight: 1.6, boxShadow: "0 0 30px rgba(239,159,39,0.2)",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(239,159,39,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(239,159,39,0.2)"; }}>
            🏁 START RACE
          </button>
          <button onClick={() => onFinish({ score: 0, time: 0, rewards: { focus: 0, stamina: 0, social: 0, stress: 0 } })}
            style={{
              marginTop: "0.5rem", fontFamily: "'Press Start 2P'", fontSize: 7,
              padding: "10px 20px", background: "#2a3a50", color: "#aaa",
              border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
            }}>
            ◀ BACK TO CAMPUS
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "done") {
    const minTime = Math.max(finalTime, 1);
    const grade = minTime < 15 ? "S" : minTime < 25 ? "A" : minTime < 40 ? "B" : "C";
    const score = Math.round(1000 / minTime * 3);
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1117 0%, #1a1a0a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(45deg, #FFD700 25%, transparent 25%, transparent 75%, #FFD700 75%)",
          backgroundSize: "20px 20px",
        }} />
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: "0.5rem", animation: "floatSlow 2s ease-in-out infinite" }}>🏁</div>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 11, color: "#EF9F27",
            lineHeight: 2, marginBottom: "0.75rem",
          }}>
            RACE COMPLETE!
          </div>
          <div style={{
            background: "linear-gradient(145deg, #1a2236, #111827)",
            border: "2px solid #EF9F2740", borderRadius: 16, padding: "1.5rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 7, color: grade === "S" ? "#FFD700" : grade === "A" ? "#97C459" : "#888",
              marginBottom: "0.25rem",
            }}>
              RANK {grade}
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 54, color: "#FFD700", fontWeight: 700, lineHeight: 1 }}>
              {finalTime.toFixed(1)}s
            </div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "#888", lineHeight: 1.8 }}>
              TOTAL TIME
            </div>
            <div style={{
              display: "flex", justifyContent: "center", gap: "1rem",
              marginTop: "0.75rem",
            }}>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 20, color: "#97C459" }}>{score}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.6 }}>SCORE</div>
              </div>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 20, color: "#63a4ff" }}>{Math.round(120 / minTime * 20)} km/h</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.6 }}>AVG SPEED</div>
              </div>
            </div>
          </div>
          <button onClick={handleFinish} style={{
            fontFamily: "'Press Start 2P'", fontSize: 8, padding: "12px 24px",
            background: "linear-gradient(135deg, #185FA5, #0f3d6b)",
            color: "white", border: "none", borderRadius: 8, cursor: "pointer",
            lineHeight: 1.6,
          }}>
            ◀ BACK TO CAMPUS
          </button>
        </div>
      </div>
    );
  }

  const sendKey = (key, type = "keydown") => {
    window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
  };
  const onTouchStart = (key) => { sendKey(key, "keydown"); };
  const onTouchEnd = (key) => { sendKey(key, "keyup"); };

  return (
    <div style={{
      fontFamily: "'Nunito',sans-serif", minHeight: "100dvh", background: "#0d1117",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0.5rem", paddingBottom: "env(safe-area-inset-bottom, 8px)",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 620, width: "100%", display: "flex", flexDirection: "column", flex: 1, maxHeight: "100dvh" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 6, flexShrink: 0, gap: 4,
        }}>
          <button onClick={() => onFinish({ score: 0, time: 0, rewards: { focus: 0, stamina: 0, social: 0, stress: 0 } })}
            style={{
              fontFamily: "'Press Start 2P'", fontSize: 5, padding: "6px 10px",
              background: "#2a3a50", color: "#aaa", border: "none", borderRadius: 6,
              cursor: "pointer", lineHeight: 1.6, minHeight: 32,
            }}>
            ◀ QUIT
          </button>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 7, color: "#EF9F27",
            lineHeight: 1.8, textAlign: "center",
          }}>
            🏁 LAP {lap}/{LAPS}
          </div>
          <div style={{
            fontFamily: "'VT323'", fontSize: 16, color: "#63a4ff",
            textAlign: "right",
          }}>
            {speed} km/h
          </div>
        </div>
        <div style={{
          background: "#111", borderRadius: 10, overflow: "hidden",
          border: "2px solid #2a3a50", flex: 1,
        }}>
          <canvas ref={canvasRef} width={TRACK_W} height={TRACK_H}
            style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }} />
        </div>

        {/* Touch controls */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          marginTop: 6, gap: 8, flexShrink: 0, paddingBottom: 4,
        }}>
          {["ArrowLeft", "ArrowUp", "ArrowRight"].map(key => (
            <button key={key}
              onTouchStart={(e) => { e.preventDefault(); onTouchStart(key); }}
              onTouchEnd={(e) => { e.preventDefault(); onTouchEnd(key); }}
              onMouseDown={() => onTouchStart(key)}
              onMouseUp={() => onTouchEnd(key)}
              onMouseLeave={() => onTouchEnd(key)}
              className="touch-btn"
              style={{
                width: 64, height: 64, borderRadius: 14, border: "2px solid #EF9F27",
                background: "#1a2236", color: "#EF9F27", fontSize: 24, cursor: "pointer",
                WebkitUserSelect: "none", userSelect: "none", touchAction: "none",
              }}>
              {key === "ArrowLeft" ? "◀" : key === "ArrowRight" ? "▶" : "▲"}
            </button>
          ))}
        </div>
        <div style={{
          textAlign: "center", fontFamily: "'VT323'", fontSize: 12, color: "#555",
          flexShrink: 0, lineHeight: 1.5,
        }}>
          ← → steer &nbsp;|&nbsp; ▲ accelerate
        </div>
      </div>
    </div>
  );
}
