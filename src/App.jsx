import { useState, useRef, useEffect } from "react";
import {
  INITIAL_STATE, TOTAL_WEEKS, TOTAL_DAYS,
  getGradeLetter, getDayName, TIME_SLOTS,
  DAYS,
} from "./data/gameData";
import GameScreen from "./components/GameScreen";
import PlayerAvatar from "./components/PlayerAvatar";
import LoginScreen from "./components/LoginScreen";
import useAuth from "./hooks/useAuth";
import { MAJORS } from "./data/majors";

export default function App() {
  const { user, loading, login, register, logout, saveGame, loadGame, getSaves, getAllUsers, switchUser } = useAuth();
  const [gs, setGs] = useState(INITIAL_STATE);
  const [gamePhase, setGamePhase] = useState("login");
  const [playerName, setPlayerName] = useState("");
  const saveTimerRef = useRef(null);

  // Auto-save every 30 seconds during gameplay
  useEffect(() => {
    if (gamePhase === "game" && user) {
      saveTimerRef.current = setInterval(() => {
        saveGame(gs);
      }, 30000);
    }
    return () => {
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    };
  }, [gamePhase, user, gs, saveGame]);

  // Save on game over
  useEffect(() => {
    if (gamePhase === "gameover" && user) {
      saveGame(gs);
    }
  }, [gamePhase]);

  const startGame = () => {
    setGs({ ...INITIAL_STATE });
    setGamePhase("select_major");
  };

  const selectMajor = (majorId) => {
    setGs(prev => ({ ...prev, major: majorId }));
    setGamePhase("game");
  };

  const handleEndGame = (finalState) => {
    setGs(finalState);
    setGamePhase("gameover");
  };

  const handleLogin = (u, p) => login(u, p);
  const handleRegister = (u, p, d) => register(u, p, d);

  const handleContinue = (savedState) => {
    if (savedState) {
      setGs(savedState);
      if (savedState.major) {
        setGamePhase("game");
      } else {
        setGamePhase("select_major");
      }
      setPlayerName(user?.displayName || "");
    } else {
      setPlayerName(user?.displayName || "");
      startGame();
    }
  };

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Nunito:wght@400;700;900&display=swap";
    document.head.appendChild(link);
  }, []);

  if (loading) {
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh",
        background: "#0d1117", display: "flex", alignItems: "center",
        justifyContent: "center", color: "#888",
      }}>
        <div style={{ fontFamily: "'VT323'", fontSize: 24 }}>Loading...</div>
      </div>
    );
  }

  if (!user || gamePhase === "login") {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={handleRegister}
        onContinue={handleContinue}
        onLogout={logout}
        onSwitchUser={switchUser}
        user={user}
        saves={getSaves()}
        allUsers={getAllUsers()}
      />
    );
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (gamePhase === "intro") {
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem",
      }}>
        <div style={{
          position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none",
        }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 3, height: 3,
              background: ["#97C459", "#63a4ff", "#E24B4A", "#e8a020", "#FF69B4"][i % 5],
              borderRadius: "50%",
              opacity: 0.3 + Math.random() * 0.4,
              animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }} />
          ))}
          <style>{`
            @keyframes particleFloat {
              0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
              50% { transform: translateY(-30px) scale(1.5); opacity: 0.7; }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 5px rgba(151, 196, 89, 0.3); }
              50% { box-shadow: 0 0 20px rgba(151, 196, 89, 0.6); }
            }
          `}</style>
        </div>

        <div style={{
          maxWidth: 460, width: "100%", textAlign: "center",
          animation: "slideUp 0.8s ease",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: "1.5rem", alignItems: "center" }}>
            <PlayerAvatar stamina={80} stress={20} size={64} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 12, color: "#97C459", lineHeight: 2 }}>
                COLLEGE
              </div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 12, color: "#63a4ff", lineHeight: 2 }}>
                SURVIVAL
              </div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 12, color: "#E24B4A", lineHeight: 2 }}>
                SIM
              </div>
              <div style={{ fontFamily: "'VT323'", fontSize: 16, color: "#FF69B4", marginTop: 4 }}>
                ★ 2.0 EDITION ★
              </div>
            </div>
          </div>

          <div style={{
            fontFamily: "'VT323'", fontSize: 20, color: "#888", lineHeight: 1.6,
            marginBottom: "1.5rem", background: "#1a2236", border: "1px solid #2a3a50",
            borderRadius: 12, padding: "1rem",
          }}>
            4 weeks. 6 stats. 1 final exam.<br />
            <span style={{ color: "#97C459" }}>✓ Playable minigames</span><br />
            <span style={{ color: "#FF69B4" }}>✓ Romance system</span><br />
            <span style={{ color: "#FFD700" }}>✓ Basketball, FPS, Chess</span><br />
            <span style={{ color: "#E24B4A" }}>Stress hits 100 — you burn out.</span><br />
            <span style={{ color: "#97C459" }}>Score 70% on Finals — you win.</span>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem",
            marginBottom: "1.5rem",
          }}>
            {[
              ["⚡", "Focus", "Study effectiveness"],
              ["💪", "Stamina", "Do anything"],
              ["💸", "PHP", "Buy food & items"],
              ["😰", "Stress", "100 = burnout"],
              ["📊", "Grade", "Pass finals at 70"],
              ["👥", "Social", "Keep friends close"],
              ["🏀", "Sports", "3 playable sports"],
              ["♟️", "Chess", "Strategic matches"],
              ["💕", "Romance", "Find love"],
            ].map(([ic, nm, ds]) => (
              <div key={nm} style={{
                background: "#1a2236", border: "1px solid #2a3a50",
                borderRadius: 8, padding: "8px 10px", textAlign: "left",
              }}>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#63a4ff", marginBottom: 4, lineHeight: 1.7 }}>
                  {ic} {nm}
                </div>
                <div style={{ fontFamily: "'VT323'", fontSize: 15, color: "#888" }}>{ds}</div>
              </div>
            ))}
          </div>

          <div style={{
            fontFamily: "'VT323'", fontSize: 18, color: "#888",
            marginBottom: "0.75rem", lineHeight: 1.5,
          }}>
            What's your name, isko?
          </div>
          <input
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder="Enter your name..."
            maxLength={20}
            style={{
              width: "100%", fontFamily: "'Press Start 2P'", fontSize: 10,
              padding: "12px 16px", marginBottom: "1rem",
              background: "#1a2236", border: "2px solid #2a3a50", borderRadius: 8,
              color: "#e8e8e8", textAlign: "center", outline: "none",
            }}
          />
          <button onClick={startGame}
            style={{
              fontFamily: "'Press Start 2P'", fontSize: 9, padding: "14px 28px",
              background: "linear-gradient(135deg, #97C459, #6a9f30)",
              color: "#173404", border: "none", borderRadius: 8, cursor: "pointer",
              lineHeight: 1.6, transition: "transform 0.1s, box-shadow 0.2s",
              animation: "glow 2s ease-in-out infinite",
            }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}>
            ▶ CHOOSE YOUR MAJOR
          </button>

          <div style={{
            marginTop: "1rem", fontFamily: "'VT323'", fontSize: 14, color: "#555",
            lineHeight: 1.5,
          }}>
            Choose a major to start learning real concepts!
          </div>

          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button onClick={() => { logout(); setGamePhase("login"); }}
              style={{
                fontFamily: "'Press Start 2P'", fontSize: 6, padding: "8px 14px",
                background: "transparent", color: "#E24B4A",
                border: "1px solid #E24B4A40", borderRadius: 6, cursor: "pointer",
                lineHeight: 1.6,
              }}>
              🚪 LOGOUT
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME OVER ────────────────────────────────────────────────────────────
  if (gamePhase === "gameover") {
    const g = getGradeLetter(gs.grade);
    const week = Math.floor(gs.day / 7) + 1;
    const reasons = {
      exhausted: { title: "💀 COLLAPSED", sub: "Stamina hit zero. Found you face-down in the library.", color: "#A32D2D" },
      broke: { title: "💸 WENT BROKE", sub: "₱0 left. Skipped too many meals to function.", color: "#BA7517" },
      burnout: { title: "🔥 BURNED OUT", sub: "Stress maxed out. Forced withdrawal from the semester.", color: "#D85A30" },
      graduated: { title: "🎓 SEMESTER DONE", sub: "You survived four weeks. The campus remembers your name.", color: "#3B6D11" },
      finals: {
        title: gs.won ? "🎉 YOU PASSED!" : "📉 YOU FAILED",
        sub: gs.won ? "Finals cleared. Diploma secured. Mama would be proud." : "Grade too low. See you next semester, anak.",
        color: gs.won ? "#3B6D11" : "#A32D2D",
      },
    };
    const m = reasons[gs.gameOverReason] || reasons.graduated;

    const bestBasketball = gs.minigameStats?.basketball?.highScore || 0;
    const bestFps = gs.minigameStats?.fps?.highScore || 0;
    const hasRomance = gs.romance && Object.values(gs.romance).some(r => r.affection >= 50);

    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1117, #1a1a2e)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "2rem 1rem",
      }}>
        <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
          <PlayerAvatar stamina={gs.stamina} stress={gs.stress} size={72} />

          {playerName && (
            <div style={{ fontFamily: "'VT323'", fontSize: 22, color: "#63a4ff", marginBottom: "0.25rem", lineHeight: 1.5 }}>
              {playerName}
            </div>
          )}
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 12, color: m.color, lineHeight: 2, margin: "0.5rem 0 0.25rem" }}>
            {m.title}
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 20, color: "#aaa", marginBottom: "1.5rem", lineHeight: 1.5 }}>
            {m.sub}
          </div>

          <div style={{
            background: "#1a2236", border: "1px solid #2a3a50", borderRadius: 12,
            padding: "1.25rem", marginBottom: "1.5rem",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888", marginBottom: 6, lineHeight: 1.7 }}>GRADE</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 38, color: g.c, fontWeight: 700 }}>{g.l}</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#888" }}>{Math.round(gs.grade)}%</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888", marginBottom: 6, lineHeight: 1.7 }}>WEEK</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 38, color: "#63a4ff" }}>{week}</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#888" }}>/ {TOTAL_WEEKS}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888", marginBottom: 6, lineHeight: 1.7 }}>SAVINGS</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 32, color: "#97C459" }}>₱{gs.php}</div>
              </div>
            </div>

            <div style={{
              borderTop: "1px solid #2a3a50", paddingTop: "0.75rem",
              display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#e8a020" }}>🏀 {bestBasketball}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#555", lineHeight: 1.7 }}>BASKETBALL BEST</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#FFD700" }}>🎯 {bestFps}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#555", lineHeight: 1.7 }}>FPS BEST</div>
              </div>
              {hasRomance && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'VT323'", fontSize: 18, color: "#FF69B4" }}>💕 ✓</div>
                  <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#555", lineHeight: 1.7 }}>LOVE FOUND</div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button onClick={() => { setGs({ ...INITIAL_STATE }); setGamePhase("intro"); }}
              style={{
                fontFamily: "'Press Start 2P'", fontSize: 8, padding: "12px 24px",
                background: "linear-gradient(135deg, #185FA5, #0f3d6b)",
                color: "white", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
              }}>
              ↺ PLAY AGAIN
            </button>
            {user && (
              <button onClick={() => { logout(); setGamePhase("login"); }}
                style={{
                  fontFamily: "'Press Start 2P'", fontSize: 7, padding: "10px 20px",
                  background: "#2a3a50", color: "#aaa", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
                }}>
                🚪 LOGOUT
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── SELECT MAJOR ──────────────────────────────────────────────────────────
  if (gamePhase === "select_major") {
    const allMajors = Object.values(MAJORS);
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "2rem 1rem",
      }}>
        <div style={{ maxWidth: 600, width: "100%" }}>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 14, color: "#FFD700",
            textAlign: "center", marginBottom: "0.5rem", lineHeight: 2,
          }}>
            🎓 SELECT YOUR MAJOR
          </div>
          {playerName && (
            <div style={{
              fontFamily: "'VT323'", fontSize: 20, color: "#63a4ff",
              textAlign: "center", marginBottom: "0.5rem", lineHeight: 1.5,
            }}>
              Welcome, {playerName}!
            </div>
          )}
          <div style={{
            fontFamily: "'VT323'", fontSize: 18, color: "#888",
            textAlign: "center", marginBottom: "1.5rem", lineHeight: 1.5,
          }}>
            Your choice determines what subjects you study and the lessons you learn.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {allMajors.map(major => (
              <button key={major.id} onClick={() => selectMajor(major.id)}
                style={{
                  background: "#1a2236", border: `2px solid ${major.color}40`,
                  borderRadius: 12, padding: "1.25rem", cursor: "pointer",
                  textAlign: "left", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = major.color; e.currentTarget.style.background = "#1e2a42"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${major.color}40`; e.currentTarget.style.background = "#1a2236"; }}>
                <div style={{ fontSize: 36, marginBottom: "0.5rem" }}>{major.icon}</div>
                <div style={{
                  fontFamily: "'Press Start 2P'", fontSize: 8, color: major.color,
                  marginBottom: "0.25rem", lineHeight: 1.7,
                }}>
                  {major.name}
                </div>
                <div style={{
                  fontFamily: "'VT323'", fontSize: 16, color: "#999", lineHeight: 1.4,
                }}>
                  {major.description}
                </div>
                <div style={{
                  marginTop: "0.5rem", display: "flex", gap: "0.4rem", flexWrap: "wrap",
                }}>
                  {major.subjects.map(sub => (
                    <span key={sub.id} style={{
                      fontFamily: "'Press Start 2P'", fontSize: 4,
                      background: `${major.color}20`, color: major.color,
                      padding: "3px 6px", borderRadius: 4, lineHeight: 1.7,
                    }}>
                      {sub.icon} {sub.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setGamePhase("intro")}
            style={{
              marginTop: "1rem", fontFamily: "'Press Start 2P'", fontSize: 7,
              padding: "10px 20px", background: "#2a3a50",
              color: "#aaa", border: "none", borderRadius: 8, cursor: "pointer",
              lineHeight: 1.6, display: "block", marginLeft: "auto", marginRight: "auto",
            }}>
            ◀ BACK
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN GAME ────────────────────────────────────────────────────────────
  return <GameScreen gs={gs} setGs={setGs} onEndGame={handleEndGame} playerName={playerName} onSave={() => saveGame(gs)} onLogout={() => { saveGame(gs); logout(); setGamePhase("login"); }} />;
}
