import { useState } from "react";
import PlayerAvatar from "./PlayerAvatar";

const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-12px) rotate(2deg); }
  66% { transform: translateY(-6px) rotate(-1deg); }
}
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(3deg); }
}
@keyframes chalkDust {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-120px) translateX(40px); opacity: 0; }
}
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 15px rgba(151, 196, 89, 0.2); }
  50% { box-shadow: 0 0 30px rgba(151, 196, 89, 0.5), 0 0 60px rgba(151, 196, 89, 0.1); }
}
@keyframes sweep {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes bellRing {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-15deg); }
  60% { transform: rotate(8deg); }
  80% { transform: rotate(-8deg); }
}
@keyframes walkCycle {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}
.chalkboard-glow {
  animation: glowPulse 3s ease-in-out infinite;
}
.flicker {
  animation: flicker 4s ease-in-out infinite;
}
`;

export default function LoginScreen({ onLogin, onRegister, onContinue, user, saves, onLogout, allUsers, onSwitchUser }) {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (tab === "login") {
      const res = onLogin(username, password);
      if (!res.ok) setError(res.error);
    } else {
      const res = onRegister(username, password, displayName || username);
      if (!res.ok) setError(res.error);
    }
  };

  const handleSwitchUser = (u) => {
    const res = onSwitchUser(u);
    if (!res.ok) setError(res.error);
  };

  const bg = {
    fontFamily: "'Nunito',sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "2rem 1rem",
  };

  const building = {
    position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
    width: "100%", maxWidth: 600, height: 180, pointerEvents: "none", opacity: 0.06,
  };

  const row = { display: "flex", justifyContent: "center", gap: 4 };
  const col = { display: "flex", flexDirection: "column", gap: 4 };
  const window = {
    width: 24, height: 32, background: "#97C459", borderRadius: 2,
    opacity: 0.6 + Math.random() * 0.4,
  };
  const roof = {
    width: 0, height: 0, borderLeft: "40px solid transparent",
    borderRight: "40px solid transparent", borderBottom: "30px solid #97C459",
    margin: "0 auto", opacity: 0.7,
  };
  const floor = { width: 100, height: 80, };

  const decoItem = (emoji, anim, top, left, size) => ({
    position: "absolute", top, left, fontSize: size,
    animation: `${anim} ${3 + Math.random() * 2}s ease-in-out infinite`,
    pointerEvents: "none", opacity: 0.12,
  });

  if (user) {
    const hasSaves = saves.length > 0;
    return (
      <div style={bg}>
        <style>{styles}</style>

        {/* Decorative items */}
        <div style={decoItem("📚", "floatSlow", "8%", "6%", "28px")} />
        <div style={decoItem("✏️", "float", "15%", "88%", "22px")} />
        <div style={decoItem("🔔", "bellRing", "10%", "78%", "20px")} />
        <div style={decoItem("📓", "floatSlow", "70%", "5%", "24px")} />
        <div style={decoItem("🍎", "float", "72%", "85%", "26px")} />

        {/* Background building */}
        <svg viewBox="0 0 600 180" style={building}>
          <rect x="150" y="50" width="300" height="130" fill="#97C459" />
          <rect x="160" y="60" width="40" height="40" fill="#0d1117" opacity="0.8" rx="2" />
          <rect x="210" y="60" width="40" height="40" fill="#0d1117" opacity="0.6" rx="2" />
          <rect x="260" y="60" width="40" height="40" fill="#0d1117" opacity="0.7" rx="2" />
          <rect x="310" y="60" width="40" height="40" fill="#0d1117" opacity="0.5" rx="2" />
          <rect x="360" y="60" width="40" height="40" fill="#0d1117" opacity="0.8" rx="2" />
          <rect x="410" y="60" width="40" height="40" fill="#0d1117" opacity="0.6" rx="2" />
          <rect x="160" y="115" width="40" height="40" fill="#0d1117" opacity="0.5" rx="2" />
          <rect x="260" y="115" width="40" height="40" fill="#0d1117" opacity="0.8" rx="2" />
          <rect x="360" y="115" width="40" height="40" fill="#0d1117" opacity="0.6" rx="2" />
          <rect x="410" y="115" width="40" height="40" fill="#0d1117" opacity="0.7" rx="2" />
          <rect x="210" y="115" width="40" height="40" fill="#0d1117" opacity="0.5" rx="2" />
          <rect x="310" y="115" width="40" height="40" fill="#0d1117" opacity="0.7" rx="2" />
          <polygon points="300,10 160,50 440,50" fill="#97C459" opacity="0.7" />
          <rect x="285" y="160" width="30" height="20" fill="#0d1117" rx="2" />
        </svg>

        <div style={{ maxWidth: 400, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            background: "linear-gradient(145deg, #1a2236, #111827)",
            border: "3px solid #2a3a50", borderRadius: 16, padding: "1.5rem",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
              background: "#2a3a50", color: "#97C459", fontFamily: "'Press Start 2P'",
              fontSize: 5, padding: "4px 12px", borderRadius: 4, lineHeight: 1.6,
            }}>
              STUDENT PORTAL
            </div>

            <PlayerAvatar stamina={80} stress={20} size={72} />
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 10, color: "#97C459",
              margin: "1rem 0 0.25rem", lineHeight: 2,
            }}>
              WELCOME BACK
            </div>
            <div style={{
              fontFamily: "'VT323'", fontSize: 26, color: "#63a4ff",
              marginBottom: "0.75rem", lineHeight: 1.4,
            }}>
              {user.displayName}
            </div>
            <div style={{
              fontFamily: "'VT323'", fontSize: 14, color: "#555",
              marginBottom: "1rem", lineHeight: 1.4,
            }}>
              @{user.username} · {saves.length} save{saves.length !== 1 ? "s" : ""}
            </div>

            {hasSaves && (
              <div style={{
                background: "#0d1117", border: "2px solid #2a3a50",
                borderRadius: 12, padding: "1rem", marginBottom: "1rem",
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888",
                  marginBottom: "0.5rem", lineHeight: 1.7,
                }}>
                  💾 SAVED PROGRESS
                </div>
                {saves.map((s, i) => (
                  <button key={i} onClick={() => onContinue(s.state)}
                    style={{
                      width: "100%", fontFamily: "'VT323'", fontSize: 18,
                      padding: "8px 12px", marginBottom: 6,
                      background: "#111827", color: "#e8e8e8",
                      border: "1px solid #2a3a50", borderRadius: 8, cursor: "pointer",
                      textAlign: "left", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#97C459"; e.currentTarget.style.background = "#1a2236"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a50"; e.currentTarget.style.background = "#111827"; }}>
                    Slot {i + 1} — {new Date(s.timestamp).toLocaleDateString()}
                    <span style={{ color: "#888", marginLeft: 8, fontSize: 14 }}>
                      Day {s.state?.day ?? "?"} · {s.state?.major ? "WIP" : "No major"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button onClick={() => onContinue(null)}
                className="chalkboard-glow"
                style={{
                  fontFamily: "'Press Start 2P'", fontSize: 8, padding: "14px 28px",
                  background: "linear-gradient(135deg, #97C459, #6a9f30)", color: "#173404",
                  border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
                }}>
                ▶ NEW GAME
              </button>
              <button onClick={() => onContinue(null)}
                style={{
                  fontFamily: "'Press Start 2P'", fontSize: 7, padding: "10px 20px",
                  background: "#185FA5", color: "white",
                  border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
                }}>
                ↺ RESTART
              </button>
            </div>

            {allUsers && allUsers.length > 1 && (
              <div style={{ marginTop: "1rem" }}>
                <button onClick={() => setShowUsers(!showUsers)}
                  style={{
                    fontFamily: "'Press Start 2P'", fontSize: 6, padding: "8px 16px",
                    background: "transparent", color: "#888",
                    border: "1px solid #2a3a50", borderRadius: 8, cursor: "pointer",
                    lineHeight: 1.6, width: "100%",
                  }}>
                  👥 {showUsers ? "HIDE USERS" : "SWITCH USER"} ({allUsers.length})
                </button>
                {showUsers && (
                  <div style={{
                    marginTop: "0.5rem", background: "#0d1117",
                    border: "2px solid #2a3a50", borderRadius: 12, padding: "0.75rem",
                  }}>
                    {allUsers.filter(u => u.username !== user.username).map(u => (
                      <button key={u.username} onClick={() => handleSwitchUser(u.username)}
                        style={{
                          width: "100%", fontFamily: "'VT323'", fontSize: 18,
                          padding: "8px 12px", marginBottom: 4,
                          background: "#111827", color: "#63a4ff",
                          border: "1px solid #2a3a50", borderRadius: 8, cursor: "pointer",
                          textAlign: "left", transition: "all 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#63a4ff"; e.currentTarget.style.background = "#1a2236"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a50"; e.currentTarget.style.background = "#111827"; }}>
                        👤 {u.displayName}
                        <span style={{ color: "#888", fontSize: 14, marginLeft: 8 }}>@{u.username}</span>
                        <span style={{ color: "#555", fontSize: 12, marginLeft: 6 }}>{u.saveCount} save{u.saveCount !== 1 ? "s" : ""}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button onClick={onLogout}
              style={{
                marginTop: "0.75rem", fontFamily: "'Press Start 2P'", fontSize: 6,
                padding: "8px 16px", background: "transparent",
                color: "#E24B4A", border: "1px solid #E24B4A40", borderRadius: 8,
                cursor: "pointer", lineHeight: 1.6,
              }}>
              🚪 LOG OUT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={bg}>
      <style>{styles}</style>

      {/* Animated chalk dust particles */}
      <div style={{
        position: "absolute", top: "30%", left: "15%", width: 4, height: 4,
        background: "#97C459", borderRadius: "50%", opacity: 0, pointerEvents: "none",
        animation: "chalkDust 6s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "80%", width: 3, height: 3,
        background: "#97C459", borderRadius: "50%", opacity: 0, pointerEvents: "none",
        animation: "chalkDust 8s ease-in-out 2s infinite",
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "60%", width: 3, height: 3,
        background: "#97C459", borderRadius: "50%", opacity: 0, pointerEvents: "none",
        animation: "chalkDust 7s ease-in-out 4s infinite",
      }} />

      {/* Decorative school items */}
      <div style={decoItem("📚", "floatSlow", "6%", "5%", "30px")} />
      <div style={decoItem("✏️", "float", "12%", "90%", "24px")} />
      <div style={decoItem("🔔", "bellRing", "8%", "75%", "22px")} />
      <div style={decoItem("📓", "floatSlow", "75%", "4%", "26px")} />
      <div style={decoItem("🍎", "float", "78%", "88%", "28px")} />
      <div style={decoItem("📏", "float", "60%", "92%", "22px")} />
      <div style={decoItem("🧪", "floatSlow", "20%", "3%", "24px")} />
      <div style={decoItem("🏆", "bellRing", "25%", "93%", "20px")} />
      <div style={decoItem("🖍️", "float", "85%", "10%", "22px")} />

      {/* School building background */}
      <svg viewBox="0 0 600 180" style={building}>
        <rect x="150" y="50" width="300" height="130" fill="#97C459" />
        <rect x="160" y="60" width="40" height="40" fill="#0d1117" opacity="0.8" rx="2" />
        <rect x="210" y="60" width="40" height="40" fill="#0d1117" opacity="0.6" rx="2" />
        <rect x="260" y="60" width="40" height="40" fill="#0d1117" opacity="0.7" rx="2" />
        <rect x="310" y="60" width="40" height="40" fill="#0d1117" opacity="0.5" rx="2" />
        <rect x="360" y="60" width="40" height="40" fill="#0d1117" opacity="0.8" rx="2" />
        <rect x="410" y="60" width="40" height="40" fill="#0d1117" opacity="0.6" rx="2" />
        <rect x="160" y="115" width="40" height="40" fill="#0d1117" opacity="0.5" rx="2" />
        <rect x="260" y="115" width="40" height="40" fill="#0d1117" opacity="0.8" rx="2" />
        <rect x="360" y="115" width="40" height="40" fill="#0d1117" opacity="0.6" rx="2" />
        <rect x="410" y="115" width="40" height="40" fill="#0d1117" opacity="0.7" rx="2" />
        <rect x="210" y="115" width="40" height="40" fill="#0d1117" opacity="0.5" rx="2" />
        <rect x="310" y="115" width="40" height="40" fill="#0d1117" opacity="0.7" rx="2" />
        <polygon points="300,10 160,50 440,50" fill="#97C459" opacity="0.7" />
        <rect x="285" y="160" width="30" height="20" fill="#0d1117" rx="2" />
        <circle cx="300" cy="22" r="3" fill="#ffd700" opacity="0.6" />
      </svg>

      <div style={{ maxWidth: 380, width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <PlayerAvatar stamina={80} stress={20} size={64} />
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 9, color: "#97C459",
            marginTop: "0.75rem", lineHeight: 2, textShadow: "0 0 20px rgba(151,196,89,0.3)",
          }}>
            COLLEGE SURVIVAL
          </div>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 7, color: "#63a4ff",
            lineHeight: 1.8, letterSpacing: 2,
            background: "linear-gradient(90deg, transparent, rgba(99,164,255,0.15), transparent)",
            backgroundSize: "200% 100%",
            animation: "sweep 4s ease-in-out infinite",
            borderRadius: 4,
          }}>
            SIMULATOR
          </div>
          <div style={{
            fontFamily: "'VT323'", fontSize: 18, color: "#888", lineHeight: 1.5,
            marginTop: 4,
          }}>
            Sign in to save your progress
          </div>
        </div>

        {/* Existing users list */}
        {allUsers && allUsers.length > 0 && (
          <div style={{
            background: "linear-gradient(145deg, #1a2236, #111827)",
            border: "2px solid #2a3a50", borderRadius: 12, padding: "0.75rem",
            marginBottom: "1rem", position: "relative",
          }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 6, color: "#97C459",
              marginBottom: "0.5rem", lineHeight: 1.7,
            }}>
              👥 REGISTERED USERS ({allUsers.length})
            </div>
            {allUsers.map(u => (
              <button key={u.username}
                onClick={() => { setUsername(u.username); setTab("login"); setError(""); }}
                style={{
                  width: "100%", fontFamily: "'VT323'", fontSize: 17,
                  padding: "6px 10px", marginBottom: 3,
                  background: "#111827", color: "#63a4ff",
                  border: "1px solid #2a3a50", borderRadius: 6, cursor: "pointer",
                  textAlign: "left", transition: "all 0.12s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#63a4ff"; e.currentTarget.style.background = "#1a2236"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a50"; e.currentTarget.style.background = "#111827"; }}>
                👤 {u.displayName}
                <span style={{ color: "#888", fontSize: 13, marginLeft: 6 }}>@{u.username}</span>
                <span style={{ color: "#555", fontSize: 11, marginLeft: 4 }}>— {u.saveCount} save{u.saveCount !== 1 ? "s" : ""}</span>
              </button>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: "flex", marginBottom: "1rem",
          background: "#0d1117", borderRadius: 8, overflow: "hidden",
          border: "2px solid #2a3a50",
        }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); }}
              style={{
                flex: 1, fontFamily: "'Press Start 2P'", fontSize: 7,
                padding: "10px", background: tab === t ? "#2a3a50" : "transparent",
                color: tab === t ? "#e8e8e8" : "#888",
                border: "none", cursor: "pointer", lineHeight: 1.7,
                transition: "all 0.15s",
              }}>
              {t === "login" ? "LOG IN" : "REGISTER"}
            </button>
          ))}
        </div>

        {/* Chalkboard-style form */}
        <form onSubmit={handleSubmit} className="chalkboard-glow" style={{
          background: "linear-gradient(145deg, #1a2236, #111827)",
          border: "3px solid #2a3a50", borderRadius: 16, padding: "1.25rem",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
            background: "#2a3a50", color: "#97C459", fontFamily: "'Press Start 2P'",
            fontSize: 5, padding: "4px 14px", borderRadius: 4, lineHeight: 1.6,
          }}>
            📋 {tab === "login" ? "LOG IN" : "NEW STUDENT"}
          </div>

          <div style={{ marginBottom: "0.9rem" }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 6, color: "#97C459",
              marginBottom: 6, lineHeight: 1.7,
            }}>
              👤 USERNAME
            </div>
            <input value={username} onChange={e => setUsername(e.target.value)}
              placeholder="Enter username..."
              style={{
                width: "100%", fontFamily: "'VT323'", fontSize: 20,
                padding: "10px 14px", background: "#0d1117",
                border: "2px solid #2a3a50", borderRadius: 8, color: "#e8e8e8",
                outline: "none", transition: "border-color 0.15s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "#97C459"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "#2a3a50"; }} />
          </div>

          <div style={{ marginBottom: "0.9rem" }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 6, color: "#97C459",
              marginBottom: 6, lineHeight: 1.7,
            }}>
              🔒 PASSWORD
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter password..."
              style={{
                width: "100%", fontFamily: "'VT323'", fontSize: 20,
                padding: "10px 14px", background: "#0d1117",
                border: "2px solid #2a3a50", borderRadius: 8, color: "#e8e8e8",
                outline: "none", transition: "border-color 0.15s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "#97C459"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "#2a3a50"; }} />
          </div>

          {tab === "register" && (
            <div style={{ marginBottom: "0.9rem" }}>
              <div style={{
                fontFamily: "'Press Start 2P'", fontSize: 6, color: "#97C459",
                marginBottom: 6, lineHeight: 1.7,
              }}>
                🏷️ DISPLAY NAME (optional)
              </div>
              <input value={displayName} onChange={e => setDisplayName(e.target.value)}
                placeholder="How you'll appear in-game..."
                style={{
                  width: "100%", fontFamily: "'VT323'", fontSize: 20,
                  padding: "10px 14px", background: "#0d1117",
                  border: "2px solid #2a3a50", borderRadius: 8, color: "#e8e8e8",
                  outline: "none", transition: "border-color 0.15s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#97C459"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#2a3a50"; }} />
            </div>
          )}

          {error && (
            <div style={{
              fontFamily: "'VT323'", fontSize: 18, color: "#E24B4A",
              marginBottom: "0.75rem", textAlign: "center",
              background: "rgba(226,75,74,0.1)", borderRadius: 6, padding: "6px 10px",
              border: "1px solid rgba(226,75,74,0.3)",
            }}>
              ⚠ {error}
            </div>
          )}

          <button type="submit"
            className="chalkboard-glow"
            style={{
              width: "100%", fontFamily: "'Press Start 2P'", fontSize: 8,
              padding: "12px", background: "linear-gradient(135deg, #185FA5, #0f3d6b)",
              color: "white", border: "none", borderRadius: 8, cursor: "pointer",
              lineHeight: 1.6, transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
            {tab === "login" ? "▶ LOG IN" : "▶ CREATE ACCOUNT"}
          </button>
        </form>

        <div style={{
          marginTop: "1rem", fontFamily: "'VT323'", fontSize: 14, color: "#555",
          textAlign: "center", lineHeight: 1.5,
        }}>
          Progress is saved to your browser. <br />
          Clear localStorage to reset.
        </div>
      </div>
    </div>
  );
}
