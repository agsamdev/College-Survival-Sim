import { useState, useEffect, useCallback } from "react";
import { startBGM, stopBGM, setVolume } from "../utils/audio";

const PLAYLISTS = [
  { name: "Lo-Fi Study", emoji: "📚", mood: "chill" },
  { name: "Night Drive", emoji: "🌙", mood: "ambient" },
  { name: "Campus Beats", emoji: "🎧", mood: "upbeat" },
  { name: "Rainy Day", emoji: "🌧️", mood: "mellow" },
];

export default function MusicPlayer({ onClose }) {
  const [playing, setPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(0);
  const [vol, setVol] = useState(0.3);
  const [showSpotify, setShowSpotify] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState("");

  const togglePlay = useCallback(() => {
    if (playing) {
      stopBGM();
      setPlaying(false);
    } else {
      startBGM();
      setPlaying(true);
    }
  }, [playing]);

  useEffect(() => {
    return () => { stopBGM(); };
  }, []);

  const changeVol = (v) => {
    const nv = Math.max(0, Math.min(1, v));
    setVol(nv);
    setVolume(nv);
  };

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      fontFamily: "'Nunito',sans-serif",
      background: "linear-gradient(180deg, #1a1a2e 0%, #0d1117 100%)",
      borderTop: "2px solid #2a3a50",
      padding: "0.75rem 1rem",
      paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
    }}>
      {/* Minimized bar */}
      {!showSpotify && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 600, margin: "0 auto" }}>
          <button onClick={togglePlay} style={{
            width: 40, height: 40, borderRadius: 10,
            background: playing ? "#E24B4A" : "#185FA5",
            border: "none", cursor: "pointer", fontSize: 18, color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            {playing ? "⏸" : "▶"}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 5, color: "#97C459",
              lineHeight: 1.6,
            }}>
              {playing ? "NOW PLAYING" : "MUSIC OFF"}
            </div>
            <div style={{
              fontFamily: "'VT323'", fontSize: 16, color: "#e8e8e8",
              lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {PLAYLISTS[currentPlaylist].emoji} {PLAYLISTS[currentPlaylist].name}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input type="range" min="0" max="1" step="0.05" value={vol}
              onChange={e => changeVol(parseFloat(e.target.value))}
              style={{ width: 60, accentColor: "#97C459" }} />
            <div style={{ fontSize: 16, opacity: 0.5 }}>🔊</div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {PLAYLISTS.map((pl, i) => (
              <button key={i} onClick={() => { setCurrentPlaylist(i); if (playing) { stopBGM(); startBGM(); } }}
                style={{
                  width: 28, height: 28, borderRadius: 6, fontSize: 14,
                  background: i === currentPlaylist ? "#2a3a50" : "transparent",
                  border: i === currentPlaylist ? "1px solid #97C459" : "1px solid #2a3a50",
                  cursor: "pointer",
                }}>
                {pl.emoji}
              </button>
            ))}
          </div>
          <button onClick={() => setShowSpotify(true)} style={{
            fontFamily: "'Press Start 2P'", fontSize: 5, padding: "6px 10px",
            background: "#1DB954", color: "white", border: "none", borderRadius: 6,
            cursor: "pointer", lineHeight: 1.6, whiteSpace: "nowrap",
          }}>
            SPOTIFY
          </button>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 6, fontSize: 14,
            background: "transparent", border: "1px solid #2a3a50",
            cursor: "pointer", color: "#888",
          }}>
            ✕
          </button>
        </div>
      )}

      {/* Spotify panel */}
      {showSpotify && (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 6, color: "#1DB954", lineHeight: 1.6,
            }}>
              🎵 SPOTIFY
            </div>
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowSpotify(false)}
              style={{
                fontFamily: "'Press Start 2P'", fontSize: 5, padding: "4px 8px",
                background: "#2a3a50", color: "#aaa", border: "none", borderRadius: 4,
                cursor: "pointer",
              }}>
              ◀ BACK
            </button>
          </div>
          <div style={{
            background: "#0d1117", border: "1px solid #2a3a50", borderRadius: 10,
            padding: "1rem",
          }}>
            <div style={{
              fontFamily: "'VT323'", fontSize: 18, color: "#1DB954",
              marginBottom: "0.5rem", lineHeight: 1.4,
            }}>
              Connect to Spotify
            </div>
            <div style={{
              fontFamily: "'Nunito'", fontSize: 13, color: "#888",
              marginBottom: "0.75rem",
            }}>
              Open Spotify Web Player to listen alongside your game.
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input value={spotifyUrl} onChange={e => setSpotifyUrl(e.target.value)}
                placeholder="Paste a Spotify playlist/track URL..."
                style={{
                  flex: 1, fontFamily: "'Nunito'", fontSize: 13,
                  padding: "8px 12px", background: "#111827",
                  border: "1px solid #2a3a50", borderRadius: 6, color: "#e8e8e8",
                  outline: "none",
                }} />
              <a href={spotifyUrl || "https://open.spotify.com"} target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "'Press Start 2P'", fontSize: 6, padding: "8px 14px",
                  background: "#1DB954", color: "white", border: "none", borderRadius: 6,
                  cursor: "pointer", textDecoration: "none", lineHeight: 1.6,
                  display: "flex", alignItems: "center",
                }}>
                OPEN
              </a>
            </div>
            <div style={{
              fontFamily: "'Nunito'", fontSize: 11, color: "#555", lineHeight: 1.4,
            }}>
              💡 Tip: Open Spotify in a separate window/tab while playing. <br />
              Use your browser's audio mixer to balance game and music.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
