import { useState, useCallback } from "react";

const PIECES = {
  wK: { type: "king", color: "white", char: "♔" },
  wQ: { type: "queen", color: "white", char: "♕" },
  wR: { type: "rook", color: "white", char: "♖" },
  wB: { type: "bishop", color: "white", char: "♗" },
  wN: { type: "knight", color: "white", char: "♘" },
  wP: { type: "pawn", color: "white", char: "♙" },
  bK: { type: "king", color: "black", char: "♚" },
  bQ: { type: "queen", color: "black", char: "♛" },
  bR: { type: "rook", color: "black", char: "♜" },
  bB: { type: "bishop", color: "black", char: "♝" },
  bN: { type: "knight", color: "black", char: "♞" },
  bP: { type: "pawn", color: "black", char: "♟" },
};

function createBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  const backRow = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  for (let i = 0; i < 8; i++) {
    board[0][i] = `b${backRow[i]}`;
    board[1][i] = "bP";
    board[6][i] = "wP";
    board[7][i] = `w${backRow[i]}`;
  }
  return board;
}

function getValidMoves(board, row, col, gameHistory = []) {
  const piece = board[row][col];
  if (!piece) return [];
  const p = PIECES[piece];
  const moves = [];
  const color = p.color;

  const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
  const isEnemy = (r, c) => board[r][c] && PIECES[board[r][c]].color !== color;
  const isEmpty = (r, c) => !board[r][c];

  const addIfValid = (r, c) => {
    if (!inBounds(r, c)) return false;
    if (isEmpty(r, c) || isEnemy(r, c)) {
      moves.push([r, c]);
      return isEmpty(r, c);
    }
    return false;
  };

  switch (p.type) {
    case "pawn": {
      const dir = color === "white" ? -1 : 1;
      const startRow = color === "white" ? 6 : 1;
      if (inBounds(row + dir, col) && isEmpty(row + dir, col)) {
        moves.push([row + dir, col]);
        if (row === startRow && inBounds(row + 2 * dir, col) && isEmpty(row + 2 * dir, col)) {
          moves.push([row + 2 * dir, col]);
        }
      }
      for (const dc of [-1, 1]) {
        if (inBounds(row + dir, col + dc) && isEnemy(row + dir, col + dc)) {
          moves.push([row + dir, col + dc]);
        }
      }
      break;
    }
    case "rook": {
      for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        let r = row + dr, c = col + dc;
        while (inBounds(r, c)) {
          if (isEmpty(r, c)) { moves.push([r, c]); } else { if (isEnemy(r, c)) moves.push([r, c]); break; }
          r += dr; c += dc;
        }
      }
      break;
    }
    case "bishop": {
      for (const [dr, dc] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        let r = row + dr, c = col + dc;
        while (inBounds(r, c)) {
          if (isEmpty(r, c)) { moves.push([r, c]); } else { if (isEnemy(r, c)) moves.push([r, c]); break; }
          r += dr; c += dc;
        }
      }
      break;
    }
    case "queen": {
      for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        let r = row + dr, c = col + dc;
        while (inBounds(r, c)) {
          if (isEmpty(r, c)) { moves.push([r, c]); } else { if (isEnemy(r, c)) moves.push([r, c]); break; }
          r += dr; c += dc;
        }
      }
      break;
    }
    case "knight": {
      for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
        if (inBounds(row + dr, col + dc) && !(!isEmpty(row + dr, col + dc) && !isEnemy(row + dr, col + dc))) {
          moves.push([row + dr, col + dc]);
        }
      }
      break;
    }
    case "king": {
      for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
        addIfValid(row + dr, col + dc);
      }
      break;
    }
  }
  return moves;
}

function isInCheck(board, color) {
  let kingRow = -1, kingCol = -1;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === (color === "white" ? "wK" : "bK")) {
        kingRow = r; kingCol = c; break;
      }
    }
  }
  if (kingRow === -1) return false;
  const enemyColor = color === "white" ? "black" : "white";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && PIECES[board[r][c]].color === enemyColor) {
        const moves = getValidMoves(board, r, c);
        if (moves.some(([mr, mc]) => mr === kingRow && mc === kingCol)) return true;
      }
    }
  }
  return false;
}

function makeAIMove(board) {
  const allMoves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && PIECES[board[r][c]].color === "black") {
        const moves = getValidMoves(board, r, c);
        moves.forEach(([tr, tc]) => allMoves.push({ fr: r, fc: c, tr, tc }));
      }
    }
  }
  if (allMoves.length === 0) return null;

  // Score moves (prefer captures, then checks, then center control)
  let bestMove = null;
  let bestScore = -999;

  for (const m of allMoves) {
    let score = 0;
    const target = board[m.tr][m.tc];
    if (target) {
      const pieceType = PIECES[target].type;
      const values = { pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 100 };
      score += values[pieceType] || 1;
    }
    // Center preference
    const centerDist = Math.abs(m.tr - 3.5) + Math.abs(m.tc - 3.5);
    score -= centerDist * 0.1;
    // Random factor
    score += Math.random() * 0.5;
    if (score > bestScore) { bestScore = score; bestMove = m; }
  }
  return bestMove;
}

export default function Chess({ onFinish }) {
  const [board, setBoard] = useState(createBoard);
  const [turn, setTurn] = useState("white");
  const [selected, setSelected] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [moveLog, setMoveLog] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [message, setMessage] = useState("");
  const [lastMove, setLastMove] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [playerColor, setPlayerColor] = useState("white");

  const handleClick = useCallback((row, col) => {
    if (gameStatus !== "playing") return;
    if (turn !== playerColor) return;
    if (thinking) return;

    const piece = board[row][col];

    // If a piece is selected and clicking a valid move
    if (selected) {
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = newBoard[selected.row][selected.col];
        newBoard[selected.row][selected.col] = null;
        setBoard(newBoard);
        setMoveLog(prev => [...prev, `${PIECES[board[selected.row][selected.col]]?.char || "?"} ${String.fromCharCode(97 + selected.col)}${8 - selected.row} → ${String.fromCharCode(97 + col)}${8 - row}`]);
        setSelected(null);
        setValidMoves([]);
        setLastMove({ fr: selected.row, fc: selected.col, tr: row, tc: col });
        setTurn("black");
        setMessage("AI thinking...");
        setThinking(true);

        // Check game over conditions
        setTimeout(() => {
          const nb = newBoard;
          const inCheck = isInCheck(nb, "black");
          let aiMove = makeAIMove(nb);

          if (!aiMove) {
            if (inCheck) {
              setGameStatus("won");
              setMessage("🎉 Checkmate! You win!");
            } else {
              setGameStatus("won");
              setMessage("🤝 Stalemate! You win!");
            }
            setThinking(false);
            return;
          }

          const aiBoard = nb.map(r => [...r]);
          aiBoard[aiMove.tr][aiMove.tc] = aiBoard[aiMove.fr][aiMove.fc];
          aiBoard[aiMove.fr][aiMove.fc] = null;
          setBoard(aiBoard);
          setMoveLog(prev => [...prev, `AI: ${String.fromCharCode(97 + aiMove.fc)}${8 - aiMove.fr} → ${String.fromCharCode(97 + aiMove.tc)}${8 - aiMove.tr}`]);
          setLastMove({ fr: aiMove.fr, fc: aiMove.fc, tr: aiMove.tr, tc: aiMove.tc });

          // Check if player is in check
          if (isInCheck(aiBoard, "white")) {
            // Check if checkmate
            let hasMove = false;
            for (let r = 0; r < 8; r++) {
              for (let c = 0; c < 8; c++) {
                if (aiBoard[r][c] && PIECES[aiBoard[r][c]].color === "white") {
                  if (getValidMoves(aiBoard, r, c).length > 0) hasMove = true;
                }
              }
            }
            if (!hasMove) {
              setGameStatus("lost");
              setMessage("💀 Checkmate! AI wins!");
            } else {
              setMessage("⚠ Check! Protect your king!");
            }
          } else {
            setMessage("");
          }

          setTurn("white");
          setThinking(false);
        }, 500);

        return;
      }
      // Clicking elsewhere deselects
      if (!piece || (piece && PIECES[piece]?.color !== playerColor)) {
        setSelected(null);
        setValidMoves([]);
        return;
      }
    }

    // Select a piece
    if (piece && PIECES[piece]?.color === playerColor) {
      const moves = getValidMoves(board, row, col);
      setSelected({ row, col });
      setValidMoves(moves);
    }
  }, [board, selected, validMoves, turn, gameStatus, thinking, playerColor]);

  return (
    <div style={{
      fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
      display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem",
    }}>
      <div style={{ maxWidth: 520, width: "100%" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: "0.5rem", background: "#1a2236", borderRadius: 10,
          padding: "0.75rem 1rem", border: "1px solid #2a3a50",
        }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 9, color: "#e8e8e8", lineHeight: 1.8 }}>
              ♟️ CHESS
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 16, color: turn === "white" ? "#f0f0f0" : "#888" }}>
              {gameStatus === "playing" ? `${turn === "white" ? "Your turn" : "AI thinking..."}` : gameStatus}
            </div>
          </div>
          <div style={{
            fontFamily: "'VT323'", fontSize: 18, color: message.includes("Checkmate") ? "#FFD700" : message.includes("Check") ? "#E24B4A" : "#888",
            textAlign: "right",
          }}>
            {message}
          </div>
        </div>

        <div style={{
          background: "#1a2236", borderRadius: 10, overflow: "hidden",
          border: "1px solid #2a3a50", padding: "0.5rem",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(8, 1fr)",
            gap: 0, aspectRatio: "1",
          }}>
            {board.flatMap((row, r) =>
              row.map((piece, c) => {
                const isWhite = (r + c) % 2 === 0;
                const isSelected = selected?.row === r && selected?.col === c;
                const isValidTarget = validMoves.some(([vr, vc]) => vr === r && vc === c);
                const isLastMove = lastMove &&
                  ((lastMove.fr === r && lastMove.fc === c) || (lastMove.tr === r && lastMove.tc === c));

                return (
                  <div key={`${r}-${c}`} onClick={() => handleClick(r, c)}
                    style={{
                      aspectRatio: "1",
                      background: isSelected ? "#97C459" : isValidTarget ? (isWhite ? "#6a8a3a" : "#5a7a2a") : isLastMove ? (isWhite ? "#d4c070" : "#c4b060") : isWhite ? "#f0d9b5" : "#b58863",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: piece ? (PIECES[piece]?.color === "white" ? 28 : 28) : 0,
                      color: piece ? (PIECES[piece]?.color === "white" ? "#fff" : "#111") : "transparent",
                      cursor: "pointer", userSelect: "none",
                      transition: "background 0.1s",
                      textShadow: piece && PIECES[piece]?.color === "white" ? "0 1px 2px rgba(0,0,0,0.5)" : "0 1px 2px rgba(255,255,255,0.3)",
                      position: "relative",
                    }}>
                    {piece && PIECES[piece]?.char}
                    {isValidTarget && !piece && (
                      <div style={{
                        width: "30%", height: "30%", borderRadius: "50%",
                        background: "rgba(0,0,0,0.2)", position: "absolute",
                      }} />
                    )}
                    {isValidTarget && piece && (
                      <div style={{
                        width: "90%", height: "90%", borderRadius: "50%",
                        border: "3px solid rgba(0,0,0,0.3)", position: "absolute",
                      }} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{
          background: "#1a2236", borderRadius: 10, padding: "0.5rem",
          border: "1px solid #2a3a50", marginTop: "0.5rem",
        }}>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#555", marginBottom: 4, lineHeight: 1.7 }}>📋 MOVE LOG</div>
          <div style={{ maxHeight: 80, overflowY: "auto", fontFamily: "'VT323'", fontSize: 14, color: "#888" }}>
            {moveLog.length === 0 ? <span style={{ color: "#444" }}>No moves yet</span> :
              moveLog.slice(-10).map((m, i) => (
                  <div key={i} style={{ color: i % 2 === 0 ? "#97C459" : "#63a4ff", lineHeight: 1.3 }}>{m}</div>
              ))
            }
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button onClick={() => {
            setBoard(createBoard());
            setTurn("white");
            setSelected(null);
            setValidMoves([]);
            setMoveLog([]);
            setGameStatus("playing");
            setMessage("");
            setLastMove(null);
            setThinking(false);
          }}
            style={{ flex: 1, fontFamily: "'Press Start 2P'", fontSize: 7, padding: "10px", background: "#2a3a50", color: "#aaa", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
            ↺ RESTART
          </button>
          <button onClick={() => onFinish()}
            style={{ flex: 1, fontFamily: "'Press Start 2P'", fontSize: 7, padding: "10px", background: "#185FA5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
            ◀ BACK TO CAMPUS
          </button>
        </div>
      </div>
    </div>
  );
}
