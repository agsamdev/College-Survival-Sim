import { useState, useEffect } from "react";

const API_BASE = "https://api.tvmaze.com";

export default function NetflixScreen({ gs, onWatch, onBack }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedShow, setSelectedShow] = useState(null);
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/shows`)
      .then(r => r.json())
      .then(data => {
        setShows(data.slice(0, 30));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const search = () => {
    if (!query.trim()) return;
    setLoading(true);
    fetch(`${API_BASE}/search/shows?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(data => {
        setShows(data.map(d => d.show).slice(0, 30));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleWatch = (show) => {
    setSelectedShow(show);
    setWatching(true);
    setTimeout(() => {
      onWatch(show.name);
      setWatching(false);
      setSelectedShow(null);
    }, 2000);
  };

  if (watching && selectedShow) {
    return (
      <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: "0.5rem" }}>📺</div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: "#E24B4A", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            NOW WATCHING
          </div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "#e8e8e8", lineHeight: 1.7, marginBottom: "0.5rem" }}>
            {selectedShow.name}
          </div>
          {selectedShow.image?.medium && (
            <img src={selectedShow.image.medium} alt={selectedShow.name} style={{ width: 210, borderRadius: 8, marginBottom: "0.5rem" }} />
          )}
          <div style={{ fontFamily: "'VT323'", fontSize: 20, color: "#888", lineHeight: 1.5 }}>
            {selectedShow.genres?.join(" • ") || "No genres"}
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 16, color: "#555", marginTop: "0.5rem" }}>
            Rating: {selectedShow.rating?.average || "N/A"}/10
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", padding: "1rem" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 10, color: "#E24B4A", lineHeight: 1.8 }}>
              📺 NETFLIX
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 16, color: "#888" }}>
              {gs.flags?.netflixSub ? "Active subscriber" : "No subscription"}
            </div>
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 26, color: "#97C459" }}>
            ₱{gs.php}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <input value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search()}
            placeholder="Search shows..."
            style={{
              flex: 1, fontFamily: "'VT323'", fontSize: 18, padding: "10px 14px",
              background: "#1a2236", border: "1px solid #2a3a50", borderRadius: 8,
              color: "#e8e8e8", outline: "none",
            }} />
          <button onClick={search} style={{
            fontFamily: "'Press Start 2P'", fontSize: 7, padding: "10px 16px",
            background: "#E24B4A", color: "white", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
          }}>
            SEARCH
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", fontFamily: "'VT323'", fontSize: 20, color: "#888", padding: "2rem" }}>
            Loading shows...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.6rem" }}>
            {shows.map(show => (
              <button key={show.id} onClick={() => gs.flags?.netflixSub ? handleWatch(show) : null}
                style={{
                  background: "#1a2236", border: `1px solid ${gs.flags?.netflixSub ? "#2a3a50" : "#3a2020"}`,
                  borderRadius: 10, padding: "0.6rem", cursor: gs.flags?.netflixSub ? "pointer" : "not-allowed",
                  textAlign: "left", opacity: gs.flags?.netflixSub ? 1 : 0.5,
                  transition: "border-color 0.15s",
                }}>
                {show.image?.medium ? (
                  <img src={show.image.medium} alt={show.name} style={{ width: "100%", borderRadius: 6, marginBottom: 6 }} />
                ) : (
                  <div style={{ width: "100%", height: 100, background: "#111827", borderRadius: 6, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'VT323'", fontSize: 32, color: "#444" }}>
                    📺
                  </div>
                )}
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#e8e8e8", lineHeight: 1.6, marginBottom: 2 }}>
                  {show.name}
                </div>
                <div style={{ fontFamily: "'VT323'", fontSize: 12, color: "#888", lineHeight: 1.3 }}>
                  {show.genres?.slice(0, 2).join(" • ") || "No genres"}
                </div>
                <div style={{ fontFamily: "'VT323'", fontSize: 13, color: "#FFD700" }}>
                  ★ {show.rating?.average || "?"}/10
                </div>
              </button>
            ))}
          </div>
        )}

        <button onClick={onBack} style={{
          marginTop: "0.75rem", fontFamily: "'Press Start 2P'", fontSize: 8,
          padding: "10px 20px", background: "#2a3a50", color: "#aaa",
          border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6,
        }}>
          ◀ BACK TO CAMPUS
        </button>
      </div>
    </div>
  );
}
