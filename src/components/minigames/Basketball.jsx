import { useRef, useEffect, useState, useCallback } from "react";

const COURT_W = 600;
const COURT_H = 400;
const GRAVITY = 0.4;
const PLAYER_SPEED = 3.5;
const SHOOT_POWER = 7;
const GAME_TIME = 45;

export default function Basketball({ onFinish }) {
  const canvasRef = useRef(null);
  const keysRef = useRef({});
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameState, setGameState] = useState("playing");
  const [combo, setCombo] = useState(0);

  const initGame = useCallback(() => {
    return {
      player: { x: 280, y: 320, w: 20, h: 30, vx: 0, vy: 0, grounded: true, facing: 1 },
      ball: { x: 290, y: 310, r: 8, vx: 0, vy: 0, held: true, shot: false },
      hoop: { x: 520, y: 80, w: 50, h: 8, poleX: 545, backboardX: 520, backboardH: 40 },
      particles: [],
      scoreCount: 0,
      shotsCount: 0,
      comboCount: 0,
      lastScoreTime: 0,
    };
  }, []);

  useEffect(() => {
    const g = initGame();
    gameRef.current = g;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animId;
    let startTime = Date.now();
    let lastTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;

      if (gameRef.current) update(g, dt);
      draw(ctx, g);

      const elapsed = (now - startTime) / 1000;
      const remaining = Math.max(0, GAME_TIME - elapsed);
      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0) {
        setGameState("done");
        setScore(g.scoreCount);
        setShots(g.shotsCount);
        return;
      }

      animId = requestAnimationFrame(gameLoop);
    };
    animId = requestAnimationFrame(gameLoop);

    const handleKeyDown = (e) => { keysRef.current[e.key] = true;
      if (e.key === " " || e.key === "ArrowUp") shoot(g); };
    const handleKeyUp = (e) => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const interval = setInterval(() => {
      setScore(g.scoreCount);
      setShots(g.shotsCount);
      setCombo(g.comboCount);
    }, 200);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, []);

  function shoot(g) {
    if (!g.ball.held) return;
    g.ball.held = false;
    g.ball.shot = true;
    g.ball.vx = g.player.facing * SHOOT_POWER + (Math.random() - 0.5) * 1.5;
    g.ball.vy = -SHOOT_POWER - 2 + (Math.random() - 0.5) * 1;
    g.ball.x = g.player.x + g.player.facing * 12;
    g.ball.y = g.player.y - 10;
    g.shotsCount++;
    setShots(g.shotsCount);

    for (let i = 0; i < 5; i++) {
      g.particles.push({
        x: g.ball.x, y: g.ball.y, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
        life: 20, color: "#e8a020",
      });
    }
  }

  function update(g, dt) {
    const p = g.player;
    const b = g.ball;

    p.vx = 0;
    if (keysRef.current["ArrowLeft"] || keysRef.current["a"]) { p.vx = -PLAYER_SPEED; p.facing = -1; }
    if (keysRef.current["ArrowRight"] || keysRef.current["d"]) { p.vx = PLAYER_SPEED; p.facing = 1; }

    if ((keysRef.current["ArrowUp"] || keysRef.current[" "] || keysRef.current["w"]) && p.grounded && !b.shot) {
      p.vy = -9;
      p.grounded = false;
    }

    p.vy += GRAVITY * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    if (p.x < 0) p.x = 0;
    if (p.x > COURT_W - p.w) p.x = COURT_W - p.w;
    if (p.y > COURT_H - p.h) { p.y = COURT_H - p.h; p.vy = 0; p.grounded = true; }

    if (b.held) {
      b.x = p.x + p.facing * 12;
      b.y = p.y - 18;
    } else {
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      if (b.x < b.r) { b.x = b.r; b.vx *= -0.5; }
      if (b.x > COURT_W - b.r) { b.x = COURT_W - b.r; b.vx *= -0.5; }
      if (b.y > COURT_H - b.r) {
        b.y = COURT_H - b.r;
        b.vy *= -0.4;
        b.vx *= 0.8;
        if (Math.abs(b.vy) < 1) b.vy = 0;
      }
      if (b.y < b.r) { b.y = b.r; b.vy *= -0.5; }

      if (Math.abs(b.vy) < 0.5 && Math.abs(b.vx) < 0.5 && b.y > COURT_H - 20) {
        b.held = true;
        b.shot = false;
        b.vx = 0;
        b.vy = 0;
      }
    }

    // Hoop collision check
    const h = g.hoop;
    if (b.shot && b.vy > 0) {
      if (b.x > h.x && b.x < h.x + h.w && Math.abs(b.y - (h.y + h.h)) < 12 && b.vy > 2) {
        b.vy *= -0.6;
        b.vx += (Math.random() - 0.5) * 2;
        g.scoreCount++;
        g.comboCount++;
        g.lastScoreTime = now;
        setScore(g.scoreCount);
        setCombo(g.comboCount);
        for (let i = 0; i < 10; i++) {
          g.particles.push({
            x: b.x, y: b.y, vx: (Math.random() - 0.5) * 5, vy: -Math.random() * 5 - 2,
            life: 30, color: "#97C459",
          });
        }
      }
    }

    // Update particles
    g.particles = g.particles.filter(pt => {
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vy += 0.1;
      pt.life--;
      return pt.life > 0;
    });
  }

  function draw(ctx, g) {
    const p = g.player;
    const b = g.ball;
    const h = g.hoop;

    ctx.clearRect(0, 0, COURT_W, COURT_H);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, COURT_H);
    skyGrad.addColorStop(0, "#0a0a2e");
    skyGrad.addColorStop(0.6, "#1a1a4e");
    skyGrad.addColorStop(1, "#2a1a1a");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, COURT_W, COURT_H);

    // Stars
    ctx.fillStyle = "white";
    for (let i = 0; i < 30; i++) {
      const sx = (i * 137 + 50) % COURT_W;
      const sy = (i * 97 + 20) % 100;
      ctx.globalAlpha = 0.3 + (i % 3) * 0.2;
      ctx.fillRect(sx, sy, 2, 2);
    }
    ctx.globalAlpha = 1;

    // Court floor
    ctx.fillStyle = "#c8a050";
    ctx.fillRect(0, COURT_H - 60, COURT_W, 60);
    ctx.fillStyle = "#b89040";
    ctx.fillRect(0, COURT_H - 60, COURT_W, 3);

    // Court lines
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.3;
    ctx.strokeRect(10, COURT_H - 55, COURT_W - 20, 45);
    ctx.globalAlpha = 1;

    // Backboard
    ctx.fillStyle = "#555";
    ctx.fillRect(h.backboardX, h.y - 5, 4, h.backboardH);
    ctx.fillStyle = "#888";
    ctx.fillRect(h.poleX - 3, h.y, 6, COURT_H - h.y);

    // Hoop
    ctx.fillStyle = "#E24B4A";
    ctx.fillRect(h.x, h.y, h.w, h.h);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(h.x, h.y, h.w, 3);

    // Net
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 5; i++) {
      const nx = h.x + 5 + i * 10;
      ctx.beginPath();
      ctx.moveTo(nx, h.y + h.h);
      ctx.lineTo(nx + 3, h.y + h.h + 15);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Player body
    ctx.fillStyle = "#185FA5";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "#F5CBA7";
    ctx.fillRect(p.x + 4, p.y - 5, 12, 12);
    ctx.fillStyle = "#5a3010";
    ctx.fillRect(p.x + 4, p.y - 8, 12, 5);
    ctx.fillStyle = "white";
    ctx.fillRect(p.x + 6, p.y - 1, 3, 3);
    ctx.fillRect(p.x + 12, p.y - 1, 3, 3);
    ctx.fillStyle = "#185FA5";
    ctx.fillRect(p.x - 2, p.y + 8, 5, 8);
    ctx.fillRect(p.x + p.w - 3, p.y + 8, 5, 8);

    // Ball
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = "#e8a020";
    ctx.fill();
    ctx.strokeStyle = "#c08010";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(b.x - 5, b.y - 4);
    ctx.lineTo(b.x + 5, b.y + 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(b.x - 5, b.y + 4);
    ctx.lineTo(b.x + 5, b.y - 4);
    ctx.stroke();

    // Particles
    g.particles.forEach(pt => {
      ctx.globalAlpha = pt.life / 30;
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x, pt.y, 4, 4);
    });
    ctx.globalAlpha = 1;

    // Score display overlay
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, COURT_W, 30);
    ctx.fillStyle = "white";
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText(`🏀 ${g.scoreCount}`, 10, 22);
    ctx.fillText(`⏱ ${timeLeft}s`, COURT_W - 120, 22);
    if (g.comboCount > 1) {
      ctx.fillStyle = "#FFD700";
      ctx.fillText(`${g.comboCount}x COMBO!`, COURT_W / 2 - 60, 22);
    }
    ctx.fillStyle = "#888";
    ctx.font = "10px 'VT323'";
    ctx.fillText("ARROWS/WASD move | SPACE/UP jump | SPACE shoot", 10, COURT_H - 10);
  }

  const handleFinish = () => {
    const rewards = { focus: score * 2, stamina: -10, social: 5, stress: -score };
    onFinish({ score, shots, rewards });
  };

  if (gameState === "done") {
    const pct = shots > 0 ? Math.round((score / shots) * 100) : 0;
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}>
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: "0.5rem" }}>🏀</div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 11, color: "#97C459", lineHeight: 2, marginBottom: "0.5rem" }}>
            GAME OVER!
          </div>
          <div style={{ background: "#1a2236", border: "1px solid #2a3a50", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'VT323'", fontSize: 54, color: "#e8a020", fontWeight: 700, marginBottom: "0.5rem" }}>
              {score}
            </div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "#888", lineHeight: 1.8 }}>POINTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginTop: "1rem" }}>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#63a4ff" }}>{shots}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.7 }}>SHOTS</div>
              </div>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#97C459" }}>{pct}%</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.7 }}>ACCURACY</div>
              </div>
              <div>
                <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#9FE1CB" }}>{combo}x</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#888", lineHeight: 1.7 }}>BEST COMBO</div>
              </div>
            </div>
          </div>
          <button onClick={handleFinish}
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
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 10, color: "#e8a020", lineHeight: 1.8 }}>
            🏀 BASKETBALL
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#97C459" }}>
            Score: {score}
          </div>
        </div>
        <div style={{
          background: "#111", borderRadius: 10, overflow: "hidden",
          border: "2px solid #2a3a50", position: "relative",
        }}>
          <canvas ref={canvasRef} width={COURT_W} height={COURT_H}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}
