import { useRef, useEffect, useState, useCallback } from "react";

const CANVAS_W = 600;
const CANVAS_H = 400;
const GAME_TIME = 30;
const TARGET_LIFE = 2000;

export default function FpsRange({ onFinish }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameState, setGameState] = useState("playing");
  const [accuracy, setAccuracy] = useState(100);

  const initGame = useCallback(() => ({
    targets: [],
    scoreCount: 0,
    hitsCount: 0,
    missesCount: 0,
    shotsCount: 0,
    mouseX: CANVAS_W / 2,
    mouseY: CANVAS_H / 2,
    startTime: Date.now(),
    muzzleFlash: 0,
    particles: [],
  }), []);

  useEffect(() => {
    const g = initGame();
    gameRef.current = g;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const spawnTarget = () => {
      if (gameRef.current.gameOver) return;
      const types = ["normal", "moving", "small"];
      const type = types[Math.floor(Math.random() * types.length)];
      const sizes = { normal: 35, moving: 40, small: 22 };
      const speeds = { normal: 0, moving: (Math.random() - 0.5) * 2, small: 1.5 };
      const scores = { normal: 10, moving: 15, small: 25 };
      const x = 100 + Math.random() * 350;
      const y = 60 + Math.random() * 200;
      gameRef.current.targets.push({
        x, y, r: sizes[type], vx: speeds[type], vy: speeds[type],
        life: TARGET_LIFE, birth: Date.now(), type, score: scores[type],
        color: type === "small" ? "#FFD700" : type === "moving" ? "#FF69B4" : "#E24B4A",
      });
    };

    // Spawn targets periodically
    const spawnInterval = setInterval(spawnTarget, 600);

    let animId;
    const gameLoop = () => {
      const g = gameRef.current;
      if (!g) return;

      const elapsed = (Date.now() - g.startTime) / 1000;
      const remaining = Math.max(0, GAME_TIME - elapsed);
      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0 && gameState === "playing") {
        g.gameOver = true;
        setGameState("done");
        setScore(g.scoreCount);
        setHits(g.hitsCount);
        setMisses(g.missesCount);
        setAccuracy(g.shotsCount > 0 ? Math.round((g.hitsCount / g.shotsCount) * 100) : 100);
        clearInterval(spawnInterval);
      }

      // Update targets
      g.targets = g.targets.filter(t => {
        t.x += t.vx;
        t.y += t.vy;
        if (t.x < t.r) t.x = t.r;
        if (t.x > CANVAS_W - t.r) t.x = CANVAS_W - t.r;
        if (t.y < 30) t.y = 30;
        if (t.y > CANVAS_H - 80) t.y = CANVAS_H - 80;
        return Date.now() - t.birth < TARGET_LIFE;
      });

      // Update muzzle flash
      if (g.muzzleFlash > 0) g.muzzleFlash -= 0.1;

      // Particles
      g.particles = g.particles.filter(pt => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        pt.vy += 0.1;
        return pt.life > 0;
      });

      draw(ctx, g);
      animId = requestAnimationFrame(gameLoop);
    };
    animId = requestAnimationFrame(gameLoop);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      gameRef.current.mouseX = (e.clientX - rect.left) * scaleX;
      gameRef.current.mouseY = (e.clientY - rect.top) * scaleY;
    };

    const handleClick = (e) => {
      if (gameRef.current.gameOver) return;
      const g = gameRef.current;
      g.muzzleFlash = 1;
      g.shotsCount++;

      // Spawn shell casing particle
      g.particles.push({
        x: g.mouseX, y: g.mouseY, vx: 0, vy: -2,
        life: 10, color: "#FFD700",
      });

      // Check hits
      let hitSomething = false;
      for (let i = g.targets.length - 1; i >= 0; i--) {
        const t = g.targets[i];
        const dx = g.mouseX - t.x;
        const dy = g.mouseY - t.y;
        if (dx * dx + dy * dy < t.r * t.r) {
          hitSomething = true;
          g.scoreCount += t.score;
          g.hitsCount++;
          setHits(g.hitsCount);
          setScore(g.scoreCount);
          // Explosion particles
          for (let p = 0; p < 12; p++) {
            g.particles.push({
              x: t.x, y: t.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              life: 20,
              color: t.color,
            });
          }
          g.targets.splice(i, 1);
        }
      }
      if (!hitSomething) {
        g.missesCount++;
        setMisses(g.missesCount);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  if (gameState === "done") {
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}>
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: "0.5rem" }}>🎯</div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 11, color: "#97C459", lineHeight: 2, marginBottom: "0.5rem" }}>
            RANGE COMPLETE!
          </div>
          <div style={{ background: "#1a2236", border: "1px solid #2a3a50", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'VT323'", fontSize: 54, color: "#FFD700", fontWeight: 700, marginBottom: "0.5rem" }}>
              {score}
            </div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "#888", lineHeight: 1.8 }}>TOTAL SCORE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginTop: "1rem" }}>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#97C459" }}>{hits}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.7 }}>HITS</div>
              </div>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#E24B4A" }}>{misses}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.7 }}>MISSES</div>
              </div>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#63a4ff" }}>{accuracy}%</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.7 }}>ACCURACY</div>
              </div>
            </div>
          </div>
          <button onClick={() => onFinish(Math.min(score, 200))}
            style={{ fontFamily: "'Press Start 2P'", fontSize: 8, padding: "12px 24px",
              background: "#185FA5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
            ◀ BACK TO CAMPUS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
      display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem",
    }}>
      <div style={{ maxWidth: 620, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 10, color: "#FFD700", lineHeight: 1.8 }}>
            🎯 SHOOTING RANGE
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#97C459" }}>
            Score: {score}
          </div>
        </div>
        <div style={{
          background: "#111", borderRadius: 10, overflow: "hidden",
          border: "2px solid #2a3a50", cursor: "crosshair",
        }}>
          <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{
          background: "#1a2236", borderRadius: 10, padding: "0.5rem 1rem",
          border: "1px solid #2a3a50", marginTop: 6,
          fontFamily: "'VT323'", fontSize: 15, color: "#888", textAlign: "center",
        }}>
          Click to shoot! Gold = 25pts, Pink = 15pts, Red = 10pts
        </div>
      </div>
    </div>
  );
}

function draw(ctx, g) {
  const W = CANVAS_W, H = CANVAS_H;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#0a0a1a");
  grad.addColorStop(0.5, "#1a1a2e");
  grad.addColorStop(1, "#0a0a1a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Range walls
  ctx.fillStyle = "#2a2a3a";
  ctx.fillRect(0, H - 60, W, 60);
  ctx.fillStyle = "#3a3a4a";
  ctx.fillRect(0, H - 60, W, 3);

  // Lane lines
  ctx.strokeStyle = "#ffffff15";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const lx = 50 + i * 120;
    ctx.beginPath();
    ctx.moveTo(lx, 0);
    ctx.lineTo(lx, H - 60);
    ctx.stroke();
  }

  // Targets
  g.targets.forEach(t => {
    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.arc(t.x + 3, t.y + 3, t.r, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = t.color;
    ctx.globalAlpha = Math.max(0.3, (t.life / TARGET_LIFE));
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
    ctx.fill();

    // Rings
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r * 0.4, 0, Math.PI * 2);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  });

  // Crosshair
  const mx = g.mouseX, my = g.mouseY;
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 2;
  ctx.shadowBlur = 4;
  ctx.shadowColor = "#FFD700";
  ctx.beginPath();
  ctx.moveTo(mx - 15, my);
  ctx.lineTo(mx - 5, my);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(mx + 5, my);
  ctx.lineTo(mx + 15, my);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(mx, my - 15);
  ctx.lineTo(mx, my - 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(mx, my + 5);
  ctx.lineTo(mx, my + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(mx, my, 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Muzzle flash
  if (g.muzzleFlash > 0) {
    ctx.fillStyle = `rgba(255,215,0,${g.muzzleFlash * 0.3})`;
    ctx.beginPath();
    ctx.arc(mx, my, 30 * g.muzzleFlash, 0, Math.PI * 2);
    ctx.fill();
  }

  // Particles
  g.particles.forEach(pt => {
    ctx.globalAlpha = pt.life / 20;
    ctx.fillStyle = pt.color;
    ctx.fillRect(pt.x, pt.y, 4, 4);
  });
  ctx.globalAlpha = 1;

  // HUD
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(0, 0, W, 24);
  ctx.fillStyle = "#FFD700";
  ctx.font = "16px 'Press Start 2P'";
  ctx.fillText(`SCORE: ${g.scoreCount}`, 10, 18);
  ctx.fillStyle = "white";
  ctx.fillText(`HITS: ${g.hitsCount}`, W - 180, 18);
  ctx.fillStyle = "#E24B4A";
  ctx.fillText(`MISS: ${g.missesCount}`, W - 80, 18);

  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "10px monospace";
  ctx.fillText("CLICK TO SHOOT | Target types: Gold(25) Pink(15) Red(10)", 10, H - 8);
}
