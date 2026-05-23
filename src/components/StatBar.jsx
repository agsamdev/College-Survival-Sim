export default function StatBar({ label, value, max = 100, color, icon }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888" }}>{icon} {label}</span>
        <span style={{ fontFamily: "'VT323'", fontSize: 15, color, fontWeight: 700 }}>{Math.round(value)}</span>
      </div>
      <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%", width: `${pct}%`, background: color, borderRadius: 4,
          transition: "width 0.4s ease",
          boxShadow: `0 0 8px ${color}40`,
        }} />
      </div>
    </div>
  );
}
