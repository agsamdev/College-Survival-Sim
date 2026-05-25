import { useState } from "react";

export default function ConversationPanel({ 
  conversation, 
  npcId, 
  onChoose, 
  onClose 
}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  if (!conversation) return null;

  const handleChoiceClick = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
    setShowResponse(true);
  };

  const handleContinue = () => {
    const choice = conversation.choices[selectedChoice];
    if (choice && onChoose) {
      onChoose(npcId, choice);
    }
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#0d1b2a",
        border: "2px solid #2a5a8a",
        borderRadius: 12,
        padding: "1.5rem",
        maxWidth: 600,
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 0 20px rgba(42, 90, 138, 0.6)",
      }}>
        {/* Header */}
        <div style={{
          fontFamily: "'Press Start 2P'",
          fontSize: 10,
          color: "#3B8FD1",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <div>{conversation.npc}</div>
            <div style={{ fontSize: 7, color: "#888", marginTop: "0.2rem" }}>
              {conversation.location}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid #888",
              color: "#888",
              fontSize: 12,
              width: 30,
              height: 30,
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Dialogue Text */}
        <div style={{
          background: "#1a2a3a",
          border: "1px solid #2a4a6a",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1.5rem",
          fontFamily: "'VT323'",
          fontSize: 16,
          color: "#c8d8e8",
          lineHeight: 1.6,
          minHeight: 80,
        }}>
          {conversation.text}
        </div>

        {/* Choices or Response */}
        {!showResponse ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {conversation.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoiceClick(idx)}
                style={{
                  background: selectedChoice === idx ? "#2a5a8a40" : "#1a3a5a",
                  border: selectedChoice === idx ? "1px solid #5a8aff" : "1px solid #2a4a6a",
                  borderRadius: 6,
                  padding: "0.75rem 1rem",
                  fontFamily: "'VT323'",
                  fontSize: 14,
                  color: selectedChoice === idx ? "#5abaff" : "#8ab8d8",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                  lineHeight: 1.5,
                }}
                onMouseEnter={(e) => {
                  if (selectedChoice !== idx) {
                    e.currentTarget.style.background = "#1a4a7a";
                    e.currentTarget.style.borderColor = "#3a6aaa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChoice !== idx) {
                    e.currentTarget.style.background = "#1a3a5a";
                    e.currentTarget.style.borderColor = "#2a4a6a";
                  }
                }}
              >
                {choice.label}
              </button>
            ))}
            <div style={{
              fontSize: 12,
              color: "#666",
              fontFamily: "'VT323'",
              marginTop: "0.5rem",
              textAlign: "center",
            }}>
              {selectedChoice !== null
                ? "Click CONTINUE to proceed..."
                : "Select a response..."}
            </div>
          </div>
        ) : (
          <div style={{
            background: "#1a3a2a",
            border: "1px solid #2a6a4a",
            borderRadius: 8,
            padding: "1rem",
            fontFamily: "'VT323'",
            fontSize: 16,
            color: "#a8d8c8",
            lineHeight: 1.6,
          }}>
            <div style={{ fontStyle: "italic", marginBottom: "0.5rem", color: "#6aaa8a" }}>
              {conversation.choices[selectedChoice]?.text}
            </div>
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #2a6a4a" }}>
              <div style={{ color: "#7abaaa", fontStyle: "italic" }}>
                "{conversation.choices[selectedChoice]?.response}"
              </div>
              {conversation.choices[selectedChoice]?.effect && (
                <div style={{ marginTop: "0.5rem", fontSize: 13, color: "#888" }}>
                  {Object.entries(conversation.choices[selectedChoice].effect).map(
                    ([key, val]) =>
                      val !== 0 && (
                        <div key={key}>
                          {key}: {val > 0 ? "+" : ""}{val}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              fontFamily: "'Press Start 2P'",
              fontSize: 8,
              padding: "0.75rem",
              background: "#1a2a3a",
              color: "#888",
              border: "1px solid #444",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2a3a4a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a2a3a";
            }}
          >
            CANCEL
          </button>
          {showResponse && (
            <button
              onClick={handleContinue}
              style={{
                flex: 1,
                fontFamily: "'Press Start 2P'",
                fontSize: 8,
                padding: "0.75rem",
                background: "#2a5a8a",
                color: "#5abaff",
                border: "1px solid #5a8aff",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3a6aaa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2a5a8a";
              }}
            >
              CONTINUE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
