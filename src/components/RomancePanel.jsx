import { useMemo } from "react";
import { LOCATION_NPC, ROMANCE_STAGES, ROMANCE_THRESHOLDS, ROMANCE_STAGE_COLORS } from "../data/gameData";
import NpcAvatar from "./NpcAvatar";

export default function RomancePanel({ romance, romanceableNpcs, onFlirt }) {
  const romData = useMemo(() => {
    if (!romance) return [];
    return Object.entries(romance)
      .filter(([id]) => romanceableNpcs.some(n => n.id === id))
      .map(([id, data]) => {
        const npc = romanceableNpcs.find(n => n.id === id);
        const stageIndex = ROMANCE_STAGES.indexOf(data.stage) + 1;
        const maxStages = ROMANCE_STAGES.length;
        return { id, npc, data, stageIndex, maxStages };
      });
  }, [romance, romanceableNpcs]);

  if (romData.length === 0) return null;

  return (
    <div style={{
      background: "#1a2236", borderRadius: 10, padding: "0.75rem",
      border: "1px solid #2a3a50", marginBottom: "0.6rem",
    }}>
      <div style={{
        fontFamily: "'Press Start 2P'", fontSize: 7, color: "#FF69B4",
        marginBottom: "0.5rem", lineHeight: 1.8,
        display: "flex", alignItems: "center", gap: 6,
      }}>
        💕 ROMANCE
        {romData.some(r => r.data.stage === "love") && (
          <span style={{ fontSize: 10, color: "#FF0040" }}>★ LOVE FOUND</span>
        )}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {romData.map(({ id, npc, data, stageIndex, maxStages }) => {
          const stageColor = ROMANCE_STAGE_COLORS[data.stage] || "#888";
          return (
            <div key={id} style={{
              flex: 1, minWidth: 140, background: "#111827", borderRadius: 8,
              padding: "0.5rem", border: `1px solid ${stageColor}30`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <NpcAvatar npcId={id} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Press Start 2P'", fontSize: 5, color: npc?.color || "#888",
                    lineHeight: 1.6, marginBottom: 2,
                  }}>
                    {npc?.name || id}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <div style={{
                      flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%", width: `${Math.min(data.affection, 100)}%`,
                        background: stageColor, borderRadius: 3,
                        transition: "width 0.4s ease",
                        boxShadow: `0 0 6px ${stageColor}60`,
                      }} />
                    </div>
                    <span style={{
                      fontFamily: "'VT323'", fontSize: 13, color: stageColor,
                      fontWeight: 700, minWidth: 32, textAlign: "right",
                    }}>
                      {data.affection}%
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "'VT323'", fontSize: 12, color: stageColor,
                    marginTop: 1, textTransform: "uppercase",
                  }}>
                    {data.stage}
                  </div>
                </div>
              </div>
              {data.stage !== "love" && (
                <button onClick={() => onFlirt(id)}
                  style={{
                    width: "100%", marginTop: 6, fontFamily: "'Press Start 2P'", fontSize: 5,
                    padding: "5px 8px", background: stageColor + "20", color: stageColor,
                    border: `1px solid ${stageColor}40`, borderRadius: 5, cursor: "pointer",
                    lineHeight: 1.6, transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = stageColor + "40"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = stageColor + "20"; }}>
                  {data.stage === "stranger" ? "👋 Get to know" :
                   data.stage === "friendly" ? "💬 Hang out" :
                   data.stage === "flustered" ? "💕 Flirt" :
                   data.stage === "crush" ? "💝 Ask on date" :
                   "💍 Deepen bond"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
