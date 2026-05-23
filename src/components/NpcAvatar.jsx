const NPCCONFIGS = {
  "ella jabonero": {
    bodyColor: "#D85A30", bodyAccent: "#c07028", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#1a0a05", hairHighlight: "#3a1a10", accessory: "glasses", animSpeed: "2.2s",
    outfitDetail: "apron", curlyHair: true,
  },
  kuya_ben: {
    bodyColor: "#185FA5", bodyAccent: "#1a6ab5", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#2a1a08", hairHighlight: "#4a2a18", accessory: "glasses", animSpeed: "2.8s",
    outfitDetail: "vest",
  },
  prof_reyes: {
    bodyColor: "#2a3a5a", bodyAccent: "#3a4a6a", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#888", hairHighlight: "#aaa", accessory: "glasses", animSpeed: "3.2s",
    outfitDetail: "tie",
  },
  librarian: {
    bodyColor: "#534AB7", bodyAccent: "#635ac7", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#333", hairHighlight: "#555", accessory: "book", animSpeed: "2.5s",
    outfitDetail: "cardigan",
  },
  chaplain: {
    bodyColor: "#639922", bodyAccent: "#73a932", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#c8c8c8", hairHighlight: "#ddd", accessory: "cross", animSpeed: "3.5s",
    outfitDetail: "robe",
  },
  classmate_mac: {
    bodyColor: "#3B6D11", bodyAccent: "#4a7d20", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#5a3010", hairHighlight: "#7a4a20", accessory: "headphones", animSpeed: "1.8s",
    outfitDetail: "hoodie",
  },
  roommate: {
    bodyColor: "#534AB7", bodyAccent: "#635ac7", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#2a1a08", hairHighlight: "#4a2a18", accessory: "none", animSpeed: "2.4s",
    outfitDetail: "polo",
  },
  f1_champ: {
    bodyColor: "#EF9F27", bodyAccent: "#d08010", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#5a3010", hairHighlight: "#7a4a20", accessory: "none", animSpeed: "2s",
    outfitDetail: "racing",
  },
  ate_liza: {
    bodyColor: "#E24B4A", bodyAccent: "#c03030", skinColor: "#F5CBA7", skinShadow: "#e8b892",
    hairColor: "#2a1a08", hairHighlight: "#4a2a18", accessory: "none", animSpeed: "2.6s",
    outfitDetail: "blazer",
  },
};

export default function NpcAvatar({ npcId, size = 64 }) {
  const c = NPCCONFIGS[npcId] || NPCCONFIGS.roommate;
  const s = size;
  const hasGlasses = c.accessory === "glasses";

  return (
    <>
      <style>{`
        .npc-float { animation: npcFloat ${c.animSpeed} ease-in-out infinite; }
        .npc-glasses-shine { animation: glassesShine 4s ease-in-out infinite; }
        @keyframes npcFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes glassesShine {
          0%, 85%, 100% { opacity: 0; }
          90% { opacity: 0.4; }
          95% { opacity: 0; }
        }
      `}</style>
      <svg viewBox="0 0 32 44" width={s} height={s * 1.375} xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated", display: "block" }}
        className="npc-float">

        {/* Hair back */}
        {c.curlyHair ? (
          <>
            {/* Curly short hair - overlapping curl bumps */}
            <rect x="5" y="1" width="6" height="5" fill={c.hairColor} rx="2" />
            <rect x="10" y="0" width="6" height="5" fill={c.hairColor} rx="2" />
            <rect x="15" y="0" width="6" height="5" fill={c.hairColor} rx="2" />
            <rect x="20" y="1" width="6" height="5" fill={c.hairColor} rx="2" />
            <rect x="4" y="4" width="4" height="6" fill={c.hairColor} rx="2" />
            <rect x="24" y="4" width="4" height="6" fill={c.hairColor} rx="2" />
            <rect x="5" y="6" width="3" height="5" fill={c.hairColor} rx="1.5" />
            <rect x="24" y="6" width="3" height="5" fill={c.hairColor} rx="1.5" />
            <rect x="7" y="8" width="3" height="3" fill={c.hairColor} rx="1" />
            <rect x="22" y="8" width="3" height="3" fill={c.hairColor} rx="1" />
            {/* Curl highlights */}
            <circle cx="8" cy="2" r="1.5" fill={c.hairHighlight} opacity="0.5" />
            <circle cx="16" cy="1.5" r="1.5" fill={c.hairHighlight} opacity="0.5" />
            <circle cx="23" cy="2.5" r="1" fill={c.hairHighlight} opacity="0.5" />
          </>
        ) : (
          <>
            <rect x="7" y="2" width="18" height="6" fill={c.hairColor} rx="1" />
            <rect x="5" y="4" width="4" height="8" fill={c.hairColor} />
            <rect x="23" y="4" width="4" height="8" fill={c.hairColor} />
            <rect x="9" y="1" width="14" height="3" fill={c.hairHighlight} rx="1" />
            {/* Hair highlight streaks */}
            <rect x="11" y="2" width="2" height="4" fill={c.hairHighlight} opacity="0.6" />
            <rect x="19" y="2" width="2" height="4" fill={c.hairHighlight} opacity="0.6" />
          </>
        )}

        {/* Face */}
        <rect x="8" y="5" width="16" height="15" fill={c.skinColor} rx="1" />
        <rect x="8" y="5" width="16" height="2" fill={c.skinShadow} rx="1" />

        {/* Eyebrows */}
        <rect x="10" y="7" width="4" height="1" fill="#5a3010" />
        <rect x="18" y="7" width="4" height="1" fill="#5a3010" />

        {/* Eyes */}
        <rect x="10" y="9" width="4" height="4" fill="white" rx="0.5" />
        <rect x="18" y="9" width="4" height="4" fill="white" rx="0.5" />
        <circle cx="12" cy="11" r="1.5" fill="#333" />
        <circle cx="20" cy="11" r="1.5" fill="#333" />
        <circle cx="12.5" cy="10.5" r="0.5" fill="white" />
        <circle cx="20.5" cy="10.5" r="0.5" fill="white" />

        {/* Nose */}
        <rect x="15" y="13" width="2" height="2" fill="#d4a07a" rx="0.5" />

        {/* Mouth */}
        <rect x="13" y="16" width="6" height="2" fill="#c0392b" rx="1" />
        <rect x="14" y="17" width="4" height="1" fill="#ff6b6b" />

        {/* Blush */}
        <rect x="9" y="14" width="2" height="1.5" fill="#ffb0b0" opacity="0.4" rx="0.5" />
        <rect x="21" y="14" width="2" height="1.5" fill="#ffb0b0" opacity="0.4" rx="0.5" />

        {/* Glasses */}
        {hasGlasses && (
          <>
            <rect x="9" y="8" width="6" height="6" fill="none" stroke="#666" strokeWidth="1" rx="0.5" />
            <rect x="17" y="8" width="6" height="6" fill="none" stroke="#666" strokeWidth="1" rx="0.5" />
            <line x1="15" y1="11" x2="17" y2="11" stroke="#666" strokeWidth="1" />
            <rect x="11" y="10" width="3" height="2" fill="white" opacity="0" className="npc-glasses-shine" />
            <rect x="19" y="10" width="3" height="2" fill="white" opacity="0" className="npc-glasses-shine" />
          </>
        )}

        {/* Neck */}
        <rect x="14" y="20" width="4" height="2" fill={c.skinShadow} rx="0.5" />

        {/* Collar */}
        <polygon points="11,22 13,24 16,22" fill="white" />
        <polygon points="16,22 19,24 21,22" fill="white" />

        {/* Body */}
        <rect x="8" y="22" width="16" height="14" fill={c.bodyColor} rx="1" />
        <rect x="8" y="22" width="16" height="2" fill={c.bodyAccent} rx="0.5" />

        {/* Outfit-specific details */}
        {c.outfitDetail === "apron" && (
          <>
            <rect x="10" y="22" width="12" height="14" fill="#e8e8d0" rx="1" />
            <rect x="10" y="22" width="12" height="2" fill="#d8d8c0" rx="0.5" />
            <rect x="14" y="26" width="4" height="3" fill="#d0d0b8" rx="0.5" />
            <rect x="14" y="31" width="4" height="3" fill="#d0d0b8" rx="0.5" />
            {/* Apron strings */}
            <line x1="10" y1="24" x2="8" y2="28" stroke="#e8e8d0" strokeWidth="1" />
            <line x1="22" y1="24" x2="24" y2="28" stroke="#e8e8d0" strokeWidth="1" />
          </>
        )}

        {c.outfitDetail === "vest" && (
          <>
            <rect x="11" y="23" width="10" height="13" fill="#1a4a7a" rx="1" />
            <rect x="14" y="25" width="4" height="2" fill="#FFD700" rx="0.5" />
            <rect x="14" y="29" width="4" height="2" fill="#FFD700" rx="0.5" />
            <rect x="18" y="24" width="3" height="4" fill="#e8e8e8" rx="0.5" />
          </>
        )}

        {c.outfitDetail === "tie" && (
          <>
            <rect x="15" y="23" width="2" height="10" fill="#E24B4A" rx="0.5" />
            <rect x="12" y="24" width="8" height="1" fill="#3a4a6a" />
          </>
        )}

        {c.outfitDetail === "cardigan" && (
          <>
            <rect x="9" y="23" width="14" height="13" fill="#635ac7" rx="1" />
            <rect x="11" y="24" width="10" height="11" fill="#4a3a9a" rx="1" />
            <line x1="14" y1="25" x2="14" y2="34" stroke="#888" strokeWidth="0.5" />
            <circle cx="14" cy="27" r="1" fill="#888" />
            <circle cx="14" cy="30" r="1" fill="#888" />
          </>
        )}

        {c.outfitDetail === "robe" && (
          <>
            <rect x="7" y="22" width="18" height="15" fill="#639922" rx="1" />
            <rect x="7" y="22" width="18" height="3" fill="#73a932" rx="0.5" />
            <line x1="16" y1="24" x2="16" y2="36" stroke="#4a7a18" strokeWidth="1" />
            {/* Cross pendant */}
            <line x1="16" y1="26" x2="16" y2="32" stroke="#EF9F27" strokeWidth="1.5" />
            <line x1="13" y1="28" x2="19" y2="28" stroke="#EF9F27" strokeWidth="1.5" />
            <circle cx="16" cy="25" r="1" fill="#EF9F27" />
          </>
        )}

        {c.outfitDetail === "hoodie" && (
          <>
            <rect x="9" y="22" width="14" height="14" fill="#3B6D11" rx="1" />
            <rect x="9" y="22" width="14" height="3" fill="#4a7d20" rx="0.5" />
            {/* Hood */}
            <rect x="10" y="21" width="12" height="3" fill="#3B6D11" rx="1" />
            {/* Pocket */}
            <rect x="12" y="28" width="8" height="3" fill="#4a7d20" rx="0.5" />
            {/* Drawstrings */}
            <line x1="14" y1="23" x2="14" y2="27" stroke="#e8e8e8" strokeWidth="0.5" />
            <line x1="18" y1="23" x2="18" y2="27" stroke="#e8e8e8" strokeWidth="0.5" />
          </>
        )}

        {c.outfitDetail === "polo" && (
          <>
            <rect x="11" y="23" width="10" height="13" fill="#635ac7" rx="1" />
            <rect x="14" y="25" width="4" height="2" fill="#FFD700" rx="0.5" />
            <rect x="15" y="24" width="2" height="2" fill="#e8e8e8" />
          </>
        )}

        {c.outfitDetail === "racing" && (
          <>
            <rect x="9" y="23" width="14" height="13" fill="#EF9F27" rx="1" />
            <rect x="9" y="23" width="14" height="2" fill="#d08010" rx="0.5" />
            {/* Racing stripes */}
            <rect x="12" y="25" width="8" height="2" fill="#E24B4A" />
            <rect x="13" y="28" width="6" height="2" fill="#E24B4A" />
            {/* Number */}
            <text x="15" y="33" fill="white" fontSize="5" fontFamily="monospace" fontWeight="bold">1</text>
          </>
        )}

        {c.outfitDetail === "blazer" && (
          <>
            <rect x="9" y="23" width="14" height="13" fill="#E24B4A" rx="1" />
            <rect x="9" y="23" width="14" height="2" fill="#c03030" rx="0.5" />
            {/* Lapels */}
            <polygon points="11,24 14,28 11,32" fill="#c03030" />
            <polygon points="21,24 18,28 21,32" fill="#c03030" />
            {/* Name tag */}
            <rect x="13" y="26" width="6" height="3" fill="white" rx="0.5" />
            <rect x="14" y="27" width="4" height="1" fill="#E24B4A" />
          </>
        )}

        {/* Arms */}
        <rect x="5" y="22" width="3" height="10" fill={c.skinColor} rx="0.5" />
        <rect x="5" y="22" width="3" height="1.5" fill={c.bodyColor} />
        <rect x="24" y="22" width="3" height="10" fill={c.skinColor} rx="0.5" />
        <rect x="24" y="22" width="3" height="1.5" fill={c.bodyColor} />

        {/* Hands */}
        <rect x="5" y="31" width="3" height="2" fill={c.skinColor} rx="0.5" />
        <rect x="24" y="31" width="3" height="2" fill={c.skinColor} rx="0.5" />

        {/* Legs */}
        <rect x="10" y="35" width="5" height="4" fill="#1a1a2e" rx="0.5" />
        <rect x="17" y="35" width="5" height="4" fill="#1a1a2e" rx="0.5" />

        {/* Shoes */}
        <rect x="9" y="38" width="6" height="3" fill="#333" rx="1" />
        <rect x="17" y="38" width="6" height="3" fill="#333" rx="1" />
        <rect x="10" y="39" width="2" height="1" fill="#555" />
        <rect x="18" y="39" width="2" height="1" fill="#555" />

        {/* Headphones accessory */}
        {c.accessory === "headphones" && (
          <>
            <rect x="5" y="5" width="4" height="7" fill="#222" rx="1" />
            <rect x="23" y="5" width="4" height="7" fill="#222" rx="1" />
            <path d="M 7,6 Q 16,0 25,6" fill="none" stroke="#222" strokeWidth="2" />
            <rect x="5" y="9" width="4" height="3" fill="#333" rx="0.5" />
            <rect x="23" y="9" width="4" height="3" fill="#333" rx="0.5" />
          </>
        )}

        {/* Book accessory */}
        {c.accessory === "book" && (
          <>
            <rect x="17" y="24" width="8" height="10" fill="#e8e0c8" rx="0.5" />
            <line x1="18" y1="26" x2="24" y2="26" stroke="#888" strokeWidth="0.5" />
            <line x1="18" y1="28" x2="24" y2="28" stroke="#888" strokeWidth="0.5" />
            <line x1="18" y1="30" x2="22" y2="30" stroke="#888" strokeWidth="0.5" />
            <rect x="19" y="26" width="4" height="6" fill="#d8d0b8" rx="0.5" />
            {/* Bookmark */}
            <rect x="24" y="25" width="1" height="5" fill="#E24B4A" />
          </>
        )}
      </svg>
    </>
  );
}
