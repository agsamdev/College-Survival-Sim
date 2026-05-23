export default function PlayerAvatar({ stamina, stress, size = 48 }) {
  const exhausted = stamina < 30;
  const panicking = stress > 80;
  const s = size;
  return (
    <svg viewBox="0 0 32 32" width={s} height={s} xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", display: "block" }}>
      <rect x="8" y="6" width="16" height="16" fill="#F5CBA7" rx="2" />
      <rect x="8" y="5" width="16" height="5" fill="#5a3010" rx="2" />
      <rect x="6" y="7" width="3" height="8" fill="#5a3010" />
      <rect x="23" y="7" width="3" height="8" fill="#5a3010" />
      {panicking ? (
        <>
          <rect x="11" y="13" width="3" height="4" fill="#E24B4A" />
          <rect x="18" y="13" width="3" height="4" fill="#E24B4A" />
          <rect x="12" y="14" width="1" height="1" fill="white" />
          <rect x="19" y="14" width="1" height="1" fill="white" />
        </>
      ) : exhausted ? (
        <>
          <rect x="11" y="14" width="4" height="2" fill="#333" rx="1" />
          <rect x="18" y="14" width="4" height="2" fill="#333" rx="1" />
          <rect x="11" y="16" width="4" height="1" fill="#c9a090" opacity="0.8" />
          <rect x="18" y="16" width="4" height="1" fill="#c9a090" opacity="0.8" />
          <rect x="23" y="12" width="2" height="3" fill="#7ad4f8" rx="1" />
        </>
      ) : (
        <>
          <rect x="11" y="13" width="3" height="4" fill="#333" rx="1" />
          <rect x="18" y="13" width="3" height="4" fill="#333" rx="1" />
          <rect x="12" y="13" width="1" height="1" fill="white" />
          <rect x="19" y="13" width="1" height="1" fill="white" />
        </>
      )}
      {panicking ? (
        <rect x="13" y="19" width="6" height="3" fill="#c0392b" rx="1" />
      ) : exhausted ? (
        <rect x="13" y="19" width="6" height="2" fill="#a88" rx="1" />
      ) : (
        <>
          <rect x="13" y="19" width="6" height="2" fill="#c0392b" rx="1" />
          <rect x="14" y="20" width="4" height="1" fill="#ff6b6b" />
        </>
      )}
      {panicking && (
        <>
          <rect x="10" y="2" width="2" height="5" fill="#5a3010" transform="rotate(-15,11,5)" />
          <rect x="16" y="1" width="2" height="6" fill="#5a3010" />
          <rect x="21" y="2" width="2" height="5" fill="#5a3010" transform="rotate(15,22,5)" />
        </>
      )}
      <rect x="10" y="22" width="12" height="8" fill="#185FA5" rx="1" />
      <rect x="14" y="22" width="4" height="3" fill="#e8e8e8" />
    </svg>
  );
}
