const NPCCONFIGS = {
  ate_nena: { bodyColor: "#D85A30", skinColor: "#F5CBA7", hairColor: "#5a3010", accessory: "apron" },
  kuya_ben: { bodyColor: "#185FA5", skinColor: "#F5CBA7", hairColor: "#2a1a08", accessory: "glasses" },
  prof_reyes: { bodyColor: "#2a3a5a", skinColor: "#F5CBA7", hairColor: "#888", accessory: "glasses" },
  librarian: { bodyColor: "#534AB7", skinColor: "#F5CBA7", hairColor: "#333", accessory: "book" },
  chaplain: { bodyColor: "#639922", skinColor: "#F5CBA7", hairColor: "#c8c8c8", accessory: "cross" },
  classmate_mac: { bodyColor: "#3B6D11", skinColor: "#F5CBA7", hairColor: "#5a3010", accessory: "headphones" },
  roommate: { bodyColor: "#534AB7", skinColor: "#F5CBA7", hairColor: "#2a1a08", accessory: "none" },
};

export default function NpcAvatar({ npcId, size = 64 }) {
  const c = NPCCONFIGS[npcId] || NPCCONFIGS.roommate;
  const s = size;
  return (
    <svg viewBox="0 0 32 40" width={s} height={s * 1.25} xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", display: "block" }}>
      <rect x="8" y="4" width="16" height="16" fill={c.skinColor} rx="2" />
      <rect x="8" y="3" width="16" height="5" fill={c.hairColor} rx="2" />
      <rect x="6" y="5" width="3" height="8" fill={c.hairColor} />
      <rect x="23" y="5" width="3" height="8" fill={c.hairColor} />
      <rect x="11" y="11" width="3" height="3" fill="#333" rx="1" />
      <rect x="18" y="11" width="3" height="3" fill="#333" rx="1" />
      <rect x="12" y="11" width="1" height="1" fill="white" />
      <rect x="19" y="11" width="1" height="1" fill="white" />
      <rect x="13" y="17" width="6" height="2" fill="#c0392b" rx="1" />
      {c.accessory === "glasses" && (
        <>
          <rect x="10" y="10" width="5" height="5" fill="none" stroke="#888" strokeWidth="1" />
          <rect x="17" y="10" width="5" height="5" fill="none" stroke="#888" strokeWidth="1" />
          <line x1="15" y1="12" x2="17" y2="12" stroke="#888" strokeWidth="1" />
        </>
      )}
      <rect x="9" y="20" width="14" height="14" fill={c.bodyColor} rx="1" />
      {c.accessory === "apron" && <rect x="11" y="20" width="10" height="14" fill="#e8e8d0" rx="1" />}
      {c.accessory === "cross" && (
        <>
          <line x1="16" y1="23" x2="16" y2="31" stroke="#EF9F27" strokeWidth="2" />
          <line x1="13" y1="26" x2="19" y2="26" stroke="#EF9F27" strokeWidth="2" />
        </>
      )}
      {c.accessory === "headphones" && (
        <>
          <rect x="7" y="7" width="3" height="6" fill="#333" rx="1" />
          <rect x="22" y="7" width="3" height="6" fill="#333" rx="1" />
          <path d="M 8,8 Q 16,2 24,8" fill="none" stroke="#333" strokeWidth="2" />
        </>
      )}
      {c.accessory === "book" && (
        <rect x="12" y="22" width="8" height="10" fill="#e8e0c8" rx="1" />
      )}
      <rect x="4" y="21" width="5" height="10" fill={c.skinColor} rx="2" />
      <rect x="23" y="21" width="5" height="10" fill={c.skinColor} rx="2" />
    </svg>
  );
}
