import useTypingText from "../hooks/useTypingText";

export default function DialogBox({ text, color }) {
  const { displayed, done, skip } = useTypingText(text || "", 30);
  return (
    <div onClick={skip} style={{ cursor: "pointer", minHeight: 60 }}>
      <div style={{ fontFamily: "'VT323'", fontSize: 17, color: "#e8e8e8", lineHeight: 1.5, minHeight: 52 }}>
        &ldquo;{displayed}{!done ? <span style={{ color, animation: "blink 0.7s step-end infinite" }}>▮</span> : "\""}
      </div>
      {done && (
        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#555", marginTop: 2, lineHeight: 1.8 }}>
          [tap to refresh]
        </div>
      )}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
