export default function PlayerAvatar({ stamina, stress, size = 48 }) {
  const exhausted = stamina < 30;
  const panicking = stress > 80;
  const s = size;
  const animClass = panicking ? "avatar-shake" : exhausted ? "avatar-wobble" : "avatar-bob";
  const dur = panicking ? "0.15s" : exhausted ? "1.5s" : "2s";
  return (
    <>
      <style>{`
        .avatar-bob { animation: avatarBob ${dur} ease-in-out infinite; }
        .avatar-wobble { animation: avatarWobble ${dur} ease-in-out infinite; }
        .avatar-shake { animation: avatarShake ${dur} ease-in-out infinite; }
        @keyframes avatarBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes avatarWobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        @keyframes avatarShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        .avatar-sweat { animation: sweatDrop 1.5s ease-in-out infinite; }
        @keyframes sweatDrop {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(2px); opacity: 0.4; }
        }
      `}</style>
      <svg viewBox="0 0 32 32" width={s} height={s} xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated", display: "block" }}
        className={animClass}>
        {/* Hair back */}
        <rect x="7" y="4" width="18" height="6" fill="#3a2010" rx="1" />
        <rect x="6" y="6" width="3" height="8" fill="#3a2010" />
        <rect x="23" y="6" width="3" height="8" fill="#3a2010" />
        <rect x="9" y="3" width="14" height="3" fill="#4a2a18" rx="1" />
        <rect x="7" y="5" width="4" height="1" fill="#5a3a22" />
        <rect x="21" y="5" width="4" height="1" fill="#5a3a22" />

        {/* Face/skin */}
        <rect x="8" y="7" width="16" height="14" fill="#F5CBA7" rx="1" />
        <rect x="8" y="7" width="16" height="2" fill="#e8b892" rx="1" />

        {/* Eyebrows */}
        {panicking ? (
          <>
            <rect x="10" y="9" width="5" height="1" fill="#c0392b" />
            <rect x="17" y="9" width="5" height="1" fill="#c0392b" />
            <rect x="10" y="8" width="5" height="1" fill="#D85A30" />
            <rect x="17" y="8" width="5" height="1" fill="#D85A30" />
          </>
        ) : exhausted ? (
          <>
            <rect x="10" y="10" width="5" height="1" fill="#888" />
            <rect x="17" y="10" width="5" height="1" fill="#888" />
          </>
        ) : (
          <>
            <rect x="10" y="9" width="5" height="1" fill="#5a3010" />
            <rect x="17" y="9" width="5" height="1" fill="#5a3010" />
          </>
        )}

        {/* Eyes */}
        {panicking ? (
          <>
            <ellipse cx="12.5" cy="13" rx="2.5" ry="3" fill="#E24B4A" />
            <ellipse cx="19.5" cy="13" rx="2.5" ry="3" fill="#E24B4A" />
            <rect x="11" y="12" width="3" height="2" fill="white" />
            <rect x="18" y="12" width="3" height="2" fill="white" />
            <rect x="13" y="14" width="1" height="1" fill="#600" />
            <rect x="20" y="14" width="1" height="1" fill="#600" />
          </>
        ) : exhausted ? (
          <>
            <rect x="10" y="13" width="5" height="2" fill="#333" rx="1" />
            <rect x="17" y="13" width="5" height="2" fill="#333" rx="1" />
            <circle cx="11" cy="14" r="0.5" fill="#666" />
            <circle cx="18" cy="14" r="0.5" fill="#666" />
          </>
        ) : (
          <>
            <rect x="10" y="12" width="5" height="4" fill="#333" rx="1" />
            <rect x="17" y="12" width="5" height="4" fill="#333" rx="1" />
            <circle cx="12.5" cy="14" r="1.5" fill="#222" />
            <circle cx="19.5" cy="14" r="1.5" fill="#222" />
            <rect x="11" y="12" width="2" height="2" fill="white" />
            <rect x="18" y="12" width="2" height="2" fill="white" />
            <circle cx="12.5" cy="14" r="0.8" fill="#111" />
            <circle cx="19.5" cy="14" r="0.8" fill="#111" />
          </>
        )}

        {/* Nose */}
        <rect x="15" y="16" width="2" height="2" fill="#d4a07a" rx="0.5" />

        {/* Mouth */}
        {panicking ? (
          <>
            <rect x="12" y="19" width="8" height="4" fill="#c0392b" rx="1" />
            <rect x="12" y="19" width="8" height="1.5" fill="#8a2010" />
          </>
        ) : exhausted ? (
          <rect x="13" y="19" width="6" height="1" fill="#a88" rx="0.5" />
        ) : (
          <>
            <rect x="13" y="19" width="6" height="2" fill="#c0392b" rx="1" />
            <rect x="14" y="20" width="4" height="1" fill="#ff6b6b" />
          </>
        )}

        {/* Blush (normal state) */}
        {!panicking && !exhausted && (
          <>
            <rect x="9" y="16" width="2" height="2" fill="#ffb0b0" opacity="0.5" rx="0.5" />
            <rect x="21" y="16" width="2" height="2" fill="#ffb0b0" opacity="0.5" rx="0.5" />
          </>
        )}

        {/* Sweat drops when panicking */}
        {panicking && (
          <>
            <rect x="24" y="11" width="2" height="3" fill="#7ad4f8" rx="1" className="avatar-sweat" />
            <rect x="24" y="15" width="2" height="3" fill="#7ad4f8" rx="1" className="avatar-sweat" style={{ animationDelay: "0.3s" }} />
            <rect x="6" y="12" width="2" height="3" fill="#7ad4f8" rx="1" className="avatar-sweat" style={{ animationDelay: "0.6s" }} />
          </>
        )}

        {/* School ID lanyard */}
        <line x1="16" y1="21" x2="16" y2="25" stroke="#185FA5" strokeWidth="1.5" />
        <rect x="14" y="24" width="4" height="3" fill="#e8e8e8" rx="0.5" stroke="#888" strokeWidth="0.5" />
        <rect x="15" y="25" width="2" height="1" fill="#185FA5" />

        {/* Uniform body */}
        <rect x="9" y="22" width="14" height="8" fill="#185FA5" rx="1" />
        <rect x="9" y="22" width="14" height="1.5" fill="#1a6ab5" rx="0.5" />

        {/* Collar */}
        <polygon points="11,22 13,24 16,22" fill="white" />
        <polygon points="16,22 19,24 21,22" fill="white" />
        <rect x="15" y="23" width="2" height="1" fill="#e8e8e8" />

        {/* Buttons */}
        <circle cx="16" cy="25" r="0.8" fill="#FFD700" />
        <circle cx="16" cy="27" r="0.8" fill="#FFD700" />

        {/* Pocket */}
        <rect x="18" y="25" width="3" height="2" fill="#1a6ab5" rx="0.5" />
        <rect x="18" y="25" width="3" height="0.5" fill="#145a9a" />

        {/* Arms */}
        <rect x="6" y="22" width="3" height="6" fill="#F5CBA7" rx="0.5" />
        <rect x="6" y="22" width="3" height="1.5" fill="#185FA5" />
        <rect x="23" y="22" width="3" height="6" fill="#F5CBA7" rx="0.5" />
        <rect x="23" y="22" width="3" height="1.5" fill="#185FA5" />

        {/* Hands */}
        <rect x="6" y="27" width="3" height="2" fill="#F5CBA7" rx="0.5" />
        <rect x="23" y="27" width="3" height="2" fill="#F5CBA7" rx="0.5" />

        {/* Legs */}
        <rect x="10" y="29" width="5" height="2" fill="#1a3a6a" rx="0.5" />
        <rect x="17" y="29" width="5" height="2" fill="#1a3a6a" rx="0.5" />

        {/* Shoes */}
        <rect x="10" y="30" width="6" height="2" fill="#333" rx="1" />
        <rect x="16" y="30" width="6" height="2" fill="#333" rx="1" />
        <rect x="12" y="31" width="2" height="1" fill="#555" />
        <rect x="18" y="31" width="2" height="1" fill="#555" />
      </svg>
    </>
  );
}
