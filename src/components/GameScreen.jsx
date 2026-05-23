import { useState, useEffect, useCallback, useMemo } from "react";
import {
  TIME_SLOTS, TOTAL_DAYS, DAYS, INITIAL_STATE,
  LOCATION_NPC, LOCATION_ART, MAP_LOCATIONS,
  ACTIONS, CANTEEN_ITEMS, BOOKSTORE_ITEMS, WATSONS_ITEMS,
  RANDOM_EVENTS, EXAM_EVENTS,
  clamp, applyEffects, getDayName, getGradeLetter, getRomanceStage, ROMANCE_STAGE_COLORS,
} from "../data/gameData";
import PlayerAvatar from "./PlayerAvatar";
import NpcAvatar from "./NpcAvatar";
import StatBar from "./StatBar";
import DialogBox from "./DialogBox";
import BattleFlash from "./BattleFlash";
import RomancePanel from "./RomancePanel";
import Basketball from "./minigames/Basketball";
import FpsRange from "./minigames/FpsRange";
import Chess from "./minigames/Chess";
import F1Racing from "./minigames/F1Racing";
import StudyScreen from "./StudyScreen";
import NetflixScreen from "./NetflixScreen";
import { MAJORS } from "../data/majors";

const CONTEXT_TIPS = {
  default: ["Chapel = free restore.","Study Group = Grade + Social.","Keep ₱100 for a Bluebook.","Stress over 80 = danger.","Apply part-time at Canteen!","Energy Drinks spike stress.","Watsons sells health items!","Subscribe Netflix for stress relief!","Travel to Baguio or Beach on weekends!","F1 Racing at the paddock!","Netflix costs ₱200/week.","F1 = Arrow keys to drive!"],
  romance: ["Gift flowers from the canteen!","Talk to your crush daily.","Dates cost ₱100 but boost affection.","Love found = permanent stress reduction."],
  sports: ["Basketball = focus + social.","Shooting range = focus boost.","Chess = grade + focus.","Sports Day = stamina test!"],
  netflix: ["Subscribe ₱200/week to unlock Netflix.","Watch shows to reduce stress!","Netflix charges every Monday.","Binge responsibly!"],
  travel: ["Baguio trip costs ₱350.","Beach day costs ₱400.","Travel = big stress reduction.","Plan your budget wisely!"],
  f1: ["F1 Racing builds social + focus.","Use Arrow Keys to drive.","Complete 3 laps to finish!","Watch out for the walls!"],
};

export default function GameScreen({ gs: externalGs, setGs: externalSetGs, onEndGame, playerName }) {
  const [gs, setGsLocal] = useState(externalGs);
  const [mapLocation, setMapLocation] = useState("dormitory");
  const [activeEvent, setActiveEvent] = useState(null);
  const [showShop, setShowShop] = useState(null);
  const [notification, setNotification] = useState(null);
  const [battleFlash, setBattleFlash] = useState(false);
  const [pendingEvent, setPendingEvent] = useState(null);
  const [dialogText, setDialogText] = useState("");
  const [activeMinigame, setActiveMinigame] = useState(null);
  const [activeRomanceFlirt, setActiveRomanceFlirt] = useState(null);
  const [showRomance, setShowRomance] = useState(false);
  const [showStudy, setShowStudy] = useState(false);
  const [studyMode, setStudyMode] = useState(null); // "study" or "attend_class"
  const [showNetflix, setShowNetflix] = useState(false);
  const [showTravel, setShowTravel] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  // Sync external state
  useEffect(() => { setGsLocal(externalGs); }, [externalGs]);

  const setGs = useCallback((updater) => {
    if (typeof updater === "function") {
      setGsLocal(prev => {
        const next = updater(prev);
        externalSetGs(next);
        return next;
      });
    } else {
      setGsLocal(updater);
      externalSetGs(updater);
    }
  }, [externalSetGs]);

  const pushNotif = useCallback((msg, color = "#3B6D11") => {
    setNotification({ msg, color });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addLog = useCallback((text) => {
    setGs(prev => ({
      ...prev,
      log: [{ text, day: prev.day, slot: prev.slot }, ...prev.log].slice(0, 30),
    }));
  }, [setGs]);

  const npcData = LOCATION_NPC[mapLocation];
  const romanceableNpcs = Object.values(LOCATION_NPC).filter(n => n.romanceable);

  // Dialog on location change
  useEffect(() => {
    if (!npcData) return;
    const lines = npcData.lines;
    const idx = Math.floor(Math.random() * lines.length);
    setDialogText(lines[idx]);
  }, [mapLocation, npcData]);

  // Cycle tips
  useEffect(() => {
    const iv = setInterval(() => setTipIndex(i => (i + 1) % 12), 5000);
    return () => clearInterval(iv);
  }, []);

  const advanceTime = useCallback((state) => {
    let next = { ...state };
    next.slot = (next.slot + 1) % 4;
    if (next.slot === 0) next.day = next.day + 1;
    next.stress = clamp(next.stress + 2);

    // Netflix weekly billing
    if (next.flags?.netflixSub && next.day > 0 && next.day % 7 === 0 && next.slot === 0) {
      const weekNum = Math.floor(next.day / 7);
      if (weekNum > (next.flags.netflixSubWeek || 0)) {
        next.php = Math.max(0, next.php - 200);
        next.flags = { ...next.flags, netflixSubWeek: weekNum };
        next.log = [{ text: "💳 Netflix subscription: ₱200", day: next.day, slot: next.slot }, ...next.log].slice(0, 30);
      }
    }

    // Check exams
    const examEvt = EXAM_EVENTS.find(e => e.day === next.day && next.slot === 0);
    if (examEvt && !next.flags[examEvt.id]) {
      next.flags = { ...next.flags, [examEvt.id]: true };
      if (examEvt.isFinal) {
        next.won = next.grade >= 70 && next.stamina > 10;
        next.gameOver = true;
        next.gameOverReason = "finals";
        setTimeout(() => onEndGame(next), 500);
        return next;
      }
      setPendingEvent({ ...examEvt, choices: examEvt.choices.map(c => ({
        ...c, effect: typeof c.effect === "function" ? c.effect(next) : c.effect,
      })) });
      setBattleFlash(true);
      return next;
    }

    // Random events 30%
    if (!examEvt && Math.random() < 0.30) {
      const pool = RANDOM_EVENTS.filter(e => e.trigger(next));
      if (pool.length > 0) {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        setPendingEvent(pick);
        setBattleFlash(true);
        return next;
      }
    }

    // Game over checks
    if (next.stamina <= 0) { next.gameOver = true; next.won = false; next.gameOverReason = "exhausted"; setTimeout(() => onEndGame(next), 500); }
    if (next.php <= 0 && next.day > 7) { next.gameOver = true; next.won = false; next.gameOverReason = "broke"; setTimeout(() => onEndGame(next), 500); }
    if (next.stress >= 100) { next.gameOver = true; next.won = false; next.gameOverReason = "burnout"; setTimeout(() => onEndGame(next), 500); }
    if (next.day >= TOTAL_DAYS) { next.gameOver = true; next.won = true; next.gameOverReason = "graduated"; setTimeout(() => onEndGame(next), 500); }

    return next;
  }, [onEndGame]);

  const doAction = useCallback((actionId) => {
    const action = ACTIONS[actionId];
    if (!action) return;

    setGs(prev => {
      // Check requirements
      if (action.requiresFlag && !prev.flags[action.requiresFlag]) {
        pushNotif("⚠ Unlock this first!", "#D85A30"); return prev;
      }
      if (action.requiresRomanceStage) {
        const hasEnoughAffection = Object.entries(prev.romance || {}).some(([, r]) => {
          const stage = getRomanceStage(r.affection);
          const stageOrder = ["stranger", "friendly", "flustered", "crush", "dating", "love"];
          return stageOrder.indexOf(stage) >= stageOrder.indexOf(action.requiresRomanceStage);
        });
        if (!hasEnoughAffection) {
          pushNotif("⚠ Need a closer relationship first!", "#FF69B4"); return prev;
        }
      }
      if (!action.slots.includes(TIME_SLOTS[prev.slot])) {
        pushNotif(`⚠ Not available at ${TIME_SLOTS[prev.slot]}.`, "#D85A30"); return prev;
      }

      // Handle shop
      if (action.isShop) { setShowShop(action.isShop); return prev; }

      // Handle minigames
      if (action.isMinigame) {
        setActiveMinigame(action.isMinigame);
        return prev;
      }

      // Handle romance actions
      if (action.isRomance) {
        if (action.isRomance === "flirt") {
          setShowRomance(true);
          return prev;
        }
        if (action.isRomance === "date") {
          // Find highest affection romance
          let bestNpc = null, bestAff = 0;
          Object.entries(prev.romance || {}).forEach(([id, r]) => {
            if (r.affection > bestAff && romanceableNpcs.some(n => n.id === id)) {
              bestAff = r.affection;
              bestNpc = id;
            }
          });
          if (bestNpc) {
            setGs(p => ({
              ...p,
              romance: {
                ...p.romance,
                [bestNpc]: { ...p.romance[bestNpc], affection: Math.min(100, p.romance[bestNpc].affection + 10), dates: p.romance[bestNpc].dates + 1 },
              },
              social: clamp(p.social + 15),
              php: p.php - 100,
              stress: clamp(p.stress - 10),
            }));
            addLog(`💝 Went on a date! +10 affection`);
            pushNotif("💝 Great date! Affection +10!", "#FF69B4");
          }
          return prev;
        }
        return prev;
      }

      // Handle Netflix
      if (action.isNetflix) {
        if (!prev.flags?.netflixSub) {
          pushNotif("⚠ No Netflix subscription! Subscribe first!", "#E24B4A");
          return prev;
        }
        setShowNetflix(true);
        return prev;
      }

      // Handle Travel
      if (action.isTravel) {
        let next = applyEffects(prev, action.cost || {});
        next = applyEffects(next, action.reward || {});
        addLog(`[${getDayName(prev.day)} ${TIME_SLOTS[prev.slot]}] ${action.label}`);
        pushNotif(`✈ ${action.label} — Stress reduced!`, "#63a4ff");
        return advanceTime(next);
      }

      // Study / Attend Class — open study screen
      if ((actionId === "study" || actionId === "attend_class") && prev.major) {
        setStudyMode(actionId);
        setShowStudy(true);
        return prev;
      }
      if ((actionId === "study" || actionId === "attend_class") && !prev.major) {
        pushNotif("⚠ Choose a major first!", "#E24B4A");
        return prev;
      }

      // Standard action
      let next = applyEffects(prev, action.cost || {});
      next = applyEffects(next, action.reward || {});
      if (action.flagSet) next.flags = { ...next.flags, [action.flagSet]: true };
      addLog(`[${getDayName(prev.day)} ${TIME_SLOTS[prev.slot]}] ${action.label}`);
      return advanceTime(next);
    });
  }, [advanceTime, pushNotif, addLog, setGs, romanceableNpcs]);

  const resolveEvent = useCallback((choice) => {
    setGs(prev => {
      const eff = typeof choice.effect === "function" ? choice.effect(prev) : choice.effect;
      let next = applyEffects(prev, eff);
      addLog(`[Event] ${choice.label}`);
      return advanceTime(next);
    });
    setActiveEvent(null);
  }, [advanceTime, addLog, setGs]);

  const buyItem = useCallback((item) => {
    setGs(prev => {
      if (prev.php < item.price) { pushNotif("⚠ Not enough PHP!", "#D85A30"); return prev; }
      let next = { ...prev, php: prev.php - item.price };
      if (item.effect.romanceBoost) {
        // Romance gift - apply to current NPC
        const npcId = romanceableNpcs.find(n => n.id === mapLocation)?.id || romanceableNpcs[0]?.id;
        if (npcId && next.romance?.[npcId]) {
          next.romance = {
            ...next.romance,
            [npcId]: {
              ...next.romance[npcId],
              affection: Math.min(100, next.romance[npcId].affection + item.effect.romanceBoost),
              gifts: next.romance[npcId].gifts + 1,
            },
          };
          pushNotif(`💕 ${item.name} — Affection +${item.effect.romanceBoost}!`, "#FF69B4");
        } else {
          pushNotif(`✓ ${item.name}`, "#3B6D11");
        }
      } else {
        next = applyEffects(next, item.effect);
        pushNotif(`✓ ${item.name} — ${item.desc}`, "#3B6D11");
      }
      addLog(`[Shop] ${item.name} ₱${item.price}`);
      return next;
    });
  }, [pushNotif, addLog, setGs, mapLocation, romanceableNpcs]);

  const handleFlirt = useCallback((npcId) => {
    setGs(prev => {
      const current = prev.romance?.[npcId];
      if (!current) return prev;
      const bonus = current.stage === "stranger" ? 8 : current.stage === "friendly" ? 5 : current.stage === "flustered" ? 3 : 2;
      const newAffection = Math.min(100, current.affection + bonus);
      const newStage = getRomanceStage(newAffection);
      const npc = romanceableNpcs.find(n => n.id === npcId);
      const msg = npc?.romanceLines?.[newStage] || "💕 Affection increased!";
      pushNotif(msg, ROMANCE_STAGE_COLORS[newStage]);
      addLog(`💕 Flirted with ${npc?.name || npcId} (+${bonus})`);
      return {
        ...prev,
        romance: {
          ...prev.romance,
          [npcId]: { ...current, affection: newAffection, stage: newStage },
        },
        stamina: clamp(prev.stamina - 5),
      };
    });
    setActiveRomanceFlirt(null);
  }, [pushNotif, addLog, setGs, romanceableNpcs]);

  const handleMinigameEnd = useCallback((results) => {
    if (results && results.rewards) {
      setGs(prev => {
        let next = { ...prev };
        if (results.rewards.focus) next.focus = clamp(next.focus + results.rewards.focus);
        if (results.rewards.stress) next.stress = clamp(next.stress + (results.rewards.stress < 0 ? results.rewards.stress : -results.rewards.stress));
        if (results.rewards.social) next.social = clamp(next.social + results.rewards.social);
        if (results.rewards.grade) next.grade = clamp(next.grade + results.rewards.grade, 0, 100);
        if (results.rewards.php) next.php = Math.max(0, next.php + results.rewards.php);
        // Minigame stats
        next.minigameStats = { ...next.minigameStats };
        if (activeMinigame === "basketball") {
          next.minigameStats.basketball = {
            highScore: Math.max(next.minigameStats.basketball?.highScore || 0, results.score || 0),
            gamesPlayed: (next.minigameStats.basketball?.gamesPlayed || 0) + 1,
          };
        }
        if (activeMinigame === "fps") {
          next.minigameStats.fps = {
            highScore: Math.max(next.minigameStats.fps?.highScore || 0, results || 0),
            gamesPlayed: (next.minigameStats.fps?.gamesPlayed || 0) + 1,
          };
        }
        if (activeMinigame === "f1") {
          next.minigameStats.f1 = {
            bestTime: Math.min(next.minigameStats.f1?.bestTime || 999, results.time || 999),
            races: (next.minigameStats.f1?.races || 0) + 1,
          };
        }
        const gradeBonus = results.score ? Math.floor(results.score / 10) : 2;
        next = applyEffects(next, { grade: gradeBonus });
        addLog(`[Minigame] ${activeMinigame} — Score: ${results.score || "-"}${results.rewards ? ` (Focus+${results.rewards.focus || 0})` : ""}`);
        return advanceTime(next);
      });
    }
    setActiveMinigame(null);
  }, [activeMinigame, advanceTime, addLog, setGs]);

  const handleStudy = useCallback((subjectId, lessonData, lessonIndex) => {
    setGs(prev => {
      const bonus = studyMode === "attend_class" ? 8 : 15;
      const focusCost = studyMode === "attend_class" ? -10 : -25;
      let next = applyEffects(prev, { stamina: -15, focus: focusCost, stress: studyMode === "attend_class" ? 8 : 12 });
      next = applyEffects(next, { grade: bonus });
      next.studiedLessons = { ...next.studiedLessons, [subjectId]: (next.studiedLessons[subjectId] || 0) + 1 };
      addLog(`[${getDayName(prev.day)} ${TIME_SLOTS[prev.slot]}] ${studyMode === "attend_class" ? "🏫" : "📖"} ${lessonData.title}`);
      pushNotif(`✓ ${lessonData.title} — Grade +${bonus}`, "#3B6D11");
      return advanceTime(next);
    });
  }, [studyMode, addLog, pushNotif, advanceTime, setGs]);

  const week = Math.floor(gs.day / 7) + 1;
  const dayName = getDayName(gs.day);
  const currentSlot = TIME_SLOTS[gs.slot];
  const slotColor = { MORNING: "#EF9F27", AFTERNOON: "#185FA5", EVENING: "#534AB7", NIGHT: "#0C447C" }[currentSlot];
  const grade = getGradeLetter(gs.grade);

  const availableActions = useMemo(() =>
    Object.entries(ACTIONS).filter(([id, a]) => {
      if (a.oneShot && gs.flags?.[a.flagSet]) return false;
      if (a.requiresFlag && !gs.flags?.[a.requiresFlag]) return false;
      return a.slots.includes(currentSlot);
    }),
    [currentSlot, gs.flags]
  );

  // Render different screens
  if (activeMinigame === "basketball") return <Basketball onFinish={handleMinigameEnd} />;
  if (activeMinigame === "fps") return <FpsRange onFinish={handleMinigameEnd} />;
  if (activeMinigame === "chess") return <Chess onFinish={() => handleMinigameEnd({ score: 5, rewards: { focus: 10, grade: 3, stress: -5 } })} />;
  if (activeMinigame === "f1") return <F1Racing onFinish={handleMinigameEnd} />;

  // Netflix screen
  if (showNetflix) {
    return (
      <NetflixScreen
        gs={gs}
        onWatch={(showName) => {
          setGs(prev => {
            let next = applyEffects(prev, { stress: -25, stamina: -10 });
            addLog(`[Netflix] Watched "${showName}"`);
            pushNotif(`📺 Watched "${showName}" — Stress -25!`, "#E24B4A");
            return advanceTime(next);
          });
          setShowNetflix(false);
        }}
        onBack={() => setShowNetflix(false)}
      />
    );
  }

  // Study screen
  if (showStudy && gs.major) {
    return (
      <StudyScreen
        majorId={gs.major}
        dayIndex={gs.day}
        slotIndex={gs.slot}
        gs={gs}
        onStudy={handleStudy}
        onBack={() => { setShowStudy(false); setStudyMode(null); }}
      />
    );
  }

  // Shop screen
  if (showShop) {
    const items = showShop === "canteen" ? CANTEEN_ITEMS : showShop === "watsons" ? WATSONS_ITEMS : BOOKSTORE_ITEMS;
    const sNpc = showShop === "canteen" ? LOCATION_NPC.canteen : showShop === "watsons" ? LOCATION_NPC.watsons : LOCATION_NPC.bookstore;
    return (
      <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", padding: "1rem" }}>
        {notification && (
          <div style={{
            position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)",
            background: notification.color, color: "white", padding: "8px 16px", borderRadius: 8,
            fontFamily: "'Press Start 2P'", fontSize: 7, lineHeight: 1.7, zIndex: 999,
            whiteSpace: "nowrap", maxWidth: "90vw", textAlign: "center",
          }}>
            {notification.msg}
          </div>
        )}
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{
            background: "#1a2236", border: "1px solid #2a3a50", borderRadius: 12,
            padding: "1rem", marginBottom: "1rem",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <NpcAvatar npcId={sNpc.id} size={56} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: sNpc.color, lineHeight: 1.7, marginBottom: 4 }}>
                {sNpc.name}
              </div>
              <div style={{ fontFamily: "'VT323'", fontSize: 19, color: "#e8e8e8", lineHeight: 1.4 }}>
                &ldquo;{sNpc.lines[0]}&rdquo;
              </div>
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 26, color: "#97C459", fontWeight: 700, textAlign: "right" }}>
              ₱{gs.php}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1rem" }}>
            {items.map(item => (
              <button key={item.id} onClick={() => buyItem(item)}
                style={{
                  background: "#1a2236", border: `1px solid ${gs.php >= item.price ? "#2a3a50" : "#3a2020"}`,
                  borderRadius: 10, padding: "0.85rem",
                  cursor: gs.php >= item.price ? "pointer" : "not-allowed",
                  textAlign: "left", opacity: gs.php >= item.price ? 1 : 0.5,
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => { if (gs.php >= item.price) e.currentTarget.style.borderColor = sNpc.color; }}
                onMouseLeave={e => e.currentTarget.style.borderColor = gs.php >= item.price ? "#2a3a50" : "#3a2020"}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#e8e8e8", marginBottom: 4, lineHeight: 1.7 }}>{item.name}</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 15, color: "#888", marginBottom: 6, lineHeight: 1.4 }}>{item.desc}</div>
                <div style={{ fontFamily: "'VT323'", fontSize: 22, color: "#97C459", fontWeight: 700 }}>₱{item.price}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setShowShop(null)}
            style={{ fontFamily: "'Press Start 2P'", fontSize: 8, padding: "10px 20px", background: "#2a3a50", color: "#aaa", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
            ◀ BACK TO CAMPUS
          </button>
        </div>
      </div>
    );
  }

  // Event screen
  if (activeEvent) {
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}>
        <div style={{ maxWidth: 520, width: "100%" }}>
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 7, color: activeEvent.iconColor,
            textAlign: "center", marginBottom: "0.5rem", lineHeight: 1.8,
            background: "#1a2236", border: `2px solid ${activeEvent.iconColor}`,
            borderRadius: 8, padding: "6px 12px",
          }}>
            ⚔ ENCOUNTER: {activeEvent.title}
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "auto 1fr", gap: "1rem",
            background: "#1a2236", border: `1px solid ${activeEvent.iconColor}40`,
            borderRadius: 12, padding: "1.25rem", marginBottom: "1rem",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <NpcAvatar npcId={activeEvent.npc || "prof_reyes"} size={72} />
              <div style={{ fontFamily: "'VT323'", fontSize: 14, color: activeEvent.iconColor, textAlign: "center", lineHeight: 1.4 }}>
                {Object.values(LOCATION_NPC).find(n => n.id === activeEvent.npc)?.name || "???"}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 22, textAlign: "center", marginBottom: 8 }}>
                {activeEvent.icon}
              </div>
              <div style={{ fontFamily: "'VT323'", fontSize: 20, color: "#e8e8e8", lineHeight: 1.5 }}>
                {activeEvent.text}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {(activeEvent.choices || []).map((c, i) => (
              <button key={i} onClick={() => resolveEvent(c)}
                style={{
                  fontFamily: "'VT323'", fontSize: 20, padding: "12px 18px",
                  background: "#1a2236", color: "#e8e8e8",
                  border: `1px solid ${i === 0 ? activeEvent.iconColor : "#2a3a50"}`,
                  borderRadius: 8, cursor: "pointer", textAlign: "left", lineHeight: 1.4,
                  transition: "all 0.12s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#253044"; e.currentTarget.style.borderColor = activeEvent.iconColor; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1a2236"; e.currentTarget.style.borderColor = i === 0 ? activeEvent.iconColor : "#2a3a50"; }}>
                ▶ {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Romance panel overlay
  if (showRomance) {
    return (
      <div style={{
        fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
        padding: "1rem",
      }}>
        <RomancePanel
          romance={gs.romance}
          romanceableNpcs={romanceableNpcs}
          onFlirt={(npcId) => {
            handleFlirt(npcId);
            setShowRomance(false);
          }}
        />
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
          {romanceableNpcs.map(npc => {
            const r = gs.romance?.[npc.id];
            return (
              <button key={npc.id} onClick={() => {
                setMapLocation(Object.entries(LOCATION_NPC).find(([, v]) => v.id === npc.id)?.[0] || "plaza");
                setShowRomance(false);
              }}
                style={{
                  flex: 1, fontFamily: "'Press Start 2P'", fontSize: 6,
                  padding: "8px", background: "#111827", color: npc.color,
                  border: `1px solid ${npc.color}40`, borderRadius: 8, cursor: "pointer",
                  lineHeight: 1.6,
                }}>
                {npc.name}
                {r && <span style={{ color: ROMANCE_STAGE_COLORS[r.stage], marginLeft: 4 }}>({r.affection}%)</span>}
              </button>
            );
          })}
        </div>
        <button onClick={() => setShowRomance(false)}
          style={{ marginTop: "0.5rem", fontFamily: "'Press Start 2P'", fontSize: 7, padding: "10px 20px", background: "#2a3a50", color: "#aaa", border: "none", borderRadius: 8, cursor: "pointer", lineHeight: 1.6 }}>
          ◀ BACK
        </button>
      </div>
    );
  }

  // Main game screen
  return (
    <div style={{
      fontFamily: "'Nunito',sans-serif", background: "#0d1117", minHeight: "100vh",
      padding: "0.6rem", color: "#e8e8e8",
    }}>
      {battleFlash &&
        <BattleFlash onDone={() => { setBattleFlash(false); setActiveEvent(pendingEvent); setPendingEvent(null); }} />
      }

      {notification && (
        <div style={{
          position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)",
          background: notification.color, color: "white", padding: "8px 16px", borderRadius: 8,
          fontFamily: "'Press Start 2P'", fontSize: 7, lineHeight: 1.7, zIndex: 998,
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", whiteSpace: "nowrap", maxWidth: "90vw", textAlign: "center",
        }}>
          {notification.msg}
        </div>
      )}

      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* ── HEADER ─── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          marginBottom: "0.6rem", flexWrap: "wrap",
        }}>
          <div style={{
            background: "#1a2236",
            border: `2px solid ${gs.stress > 80 ? "#E24B4A" : gs.stamina < 30 ? "#EF9F27" : "#2a3a50"}`,
            borderRadius: 8, padding: "4px 6px", display: "flex", alignItems: "center", gap: 8,
          }}>
            <PlayerAvatar stamina={gs.stamina} stress={gs.stress} size={44} />
            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888", lineHeight: 1.7 }}>
                {gs.stress > 80 ? "😱 PANICKING" : gs.stamina < 30 ? "😵 EXHAUSTED" : "😊 OKAY"}
              </div>
              <div style={{ fontFamily: "'VT323'", fontSize: 15, color: "#555" }}>
                {gs.stress > 80 ? "Burnout imminent!" : gs.stamina < 30 ? "Rest now!" : "Hanging in there."}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "#97C459", lineHeight: 1.8 }}>
              COLLEGE SURVIVAL SIM
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 17, color: "#888" }}>
              {playerName && <span style={{ color: "#63a4ff", marginRight: 8 }}>{playerName}</span>}
              Wk{week}/{4} · {dayName} · {currentSlot}
              {week >= 4 && <span style={{ color: "#E24B4A", marginLeft: 6 }}>★ EXAM WEEK</span>}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ fontFamily: "'VT323'", fontSize: 24, color: "#97C459", fontWeight: 700 }}>₱{gs.php}</div>
            <div style={{
              background: grade.c, borderRadius: 6, padding: "3px 10px",
              fontFamily: "'Press Start 2P'", fontSize: 9, color: "white",
            }}>
              {grade.l}
            </div>
          </div>
        </div>

        {/* ── STAT BARS ── */}
        <div style={{
          background: "#1a2236", borderRadius: 10, padding: "0.75rem 1rem",
          marginBottom: "0.6rem", border: "1px solid #2a3a50",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
            <div>
              <StatBar label="FOCUS" value={gs.focus} color="#378ADD" icon="⚡" />
              <StatBar label="STAMINA" value={gs.stamina} color="#97C459" icon="💪" />
              <StatBar label="SOCIAL" value={gs.social} color="#9FE1CB" icon="👥" />
            </div>
            <div>
              <StatBar label="STRESS" value={gs.stress} color="#E24B4A" icon="😰" />
              <StatBar label="GRADE" value={gs.grade} color={grade.c} icon="📊" />
              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {TIME_SLOTS.map((s, i) => (
                    <div key={s} style={{
                      flex: 1, height: 7, borderRadius: 3,
                      background: i === gs.slot ? slotColor : "#2a3a50",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
                <div style={{ fontFamily: "'VT323'", fontSize: 13, color: "#555", marginTop: 2, textAlign: "center" }}>
                  {TIME_SLOTS.map((s, i) => (
                    <span key={s} style={{ marginRight: 6, color: i === gs.slot ? slotColor : "#444", fontSize: 12 }}>{s[0]}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROMANCE PANEL ── */}
        <RomancePanel
          romance={gs.romance}
          romanceableNpcs={romanceableNpcs}
          onFlirt={handleFlirt}
        />

        {/* ── CENTRAL LOCATION VIEWPORT ── */}
        <div style={{
          background: "#111", borderRadius: 10, overflow: "hidden",
          border: "2px solid #2a3a50", marginBottom: "0.6rem", position: "relative", height: 160,
        }}>
          <div style={{ position: "absolute", inset: 0 }}>
            {LOCATION_ART[mapLocation] || LOCATION_ART.dormitory}
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent,rgba(0,0,0,0.8))",
            padding: "6px 10px 6px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: "white", lineHeight: 1.8 }}>
              📍 {(MAP_LOCATIONS.find(l => l.id === mapLocation) || { label: "CAMPUS" }).label.toUpperCase()}
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 14, color: "#888" }}>{dayName} {currentSlot}</div>
          </div>
        </div>

        {/* ── SPLIT: NPC DIALOGUE + ACTIONS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>

          {/* NPC + Map */}
          <div style={{
            background: "#1a2236", borderRadius: 10, padding: "0.75rem",
            border: `1px solid ${npcData?.color || "#2a3a50"}40`,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flexShrink: 0 }}>
                {npcData && <NpcAvatar npcId={npcData.id} size={56} />}
              </div>
              <div style={{ flex: 1 }}>
                {npcData && (
                  <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: npcData.color, marginBottom: 4, lineHeight: 1.7 }}>
                    {npcData.name}
                    {npcData.romanceable && gs.romance?.[npcData.id] && (
                      <span style={{ color: ROMANCE_STAGE_COLORS[gs.romance[npcData.id].stage], marginLeft: 4, fontSize: 5 }}>
                        [{gs.romance[npcData.id].stage}]
                      </span>
                    )}
                  </div>
                )}
                <DialogBox text={dialogText} color={npcData?.color || "#888"} />
              </div>
            </div>

            {/* Map navigation */}
            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#555", marginBottom: 5, lineHeight: 1.7 }}>
                📍 MOVE TO:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {MAP_LOCATIONS.map(loc => (
                  <button key={loc.id} onClick={() => setMapLocation(loc.id)}
                    style={{
                      fontFamily: "'VT323'", fontSize: 14, padding: "3px 7px",
                      background: mapLocation === loc.id ? loc.color : "#111827",
                      color: mapLocation === loc.id ? "white" : "#888",
                      border: `1px solid ${loc.color}`, borderRadius: 5, cursor: "pointer",
                      transition: "all 0.12s",
                    }}>
                    {loc.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            background: "#1a2236", borderRadius: 10, padding: "0.75rem",
            border: "1px solid #2a3a50", overflowY: "auto", maxHeight: 220,
          }}>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 6, color: slotColor,
              marginBottom: 6, lineHeight: 1.7,
            }}>
              ⚡ {currentSlot} ACTIONS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {availableActions.map(([id, action]) => (
                <button key={id} onClick={() => doAction(id)}
                  style={{
                    background: "#111827", border: "1px solid #2a3a50", borderRadius: 7,
                    padding: "5px 8px", cursor: "pointer", textAlign: "left",
                    transition: "all 0.12s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = slotColor; e.currentTarget.style.background = "#1a2236"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a50"; e.currentTarget.style.background = "#111827"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13 }}>{action.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#e8e8e8", lineHeight: 1.7 }}>
                        {action.label}
                        {action.isMinigame && <span style={{ color: "#FFD700", marginLeft: 4, fontSize: 5 }}>▶ PLAY</span>}
                      </div>
                      <div style={{ fontFamily: "'VT323'", fontSize: 12, color: "#888", lineHeight: 1.2 }}>
                        {action.desc}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MINIGAME STATS ── */}
        {gs.minigameStats && (
          <div style={{
            background: "#1a2236", borderRadius: 10, padding: "0.5rem 0.75rem",
            border: "1px solid #2a3a50", marginBottom: "0.6rem",
            display: "flex", gap: "1rem", alignItems: "center",
          }}>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#FFD700", lineHeight: 1.7 }}>🏆 RECORDS</div>
            <div style={{ fontFamily: "'VT323'", fontSize: 14, color: "#888", display: "flex", gap: "1rem" }}>
              <span>🏀 Best: <span style={{ color: "#e8a020" }}>{gs.minigameStats.basketball?.highScore || 0}</span></span>
              <span>🎯 Best: <span style={{ color: "#FFD700" }}>{gs.minigameStats.fps?.highScore || 0}</span></span>
              <span>♟️ <span style={{ color: "#e8e8e8" }}>W{gs.minigameStats.chess?.wins || 0} L{gs.minigameStats.chess?.losses || 0}</span></span>
              <span>🏎️ Best: <span style={{ color: "#EF9F27" }}>{gs.minigameStats.f1?.bestTime ? gs.minigameStats.f1.bestTime.toFixed(1) + "s" : "—"}</span></span>
            </div>
          </div>
        )}

        {/* ── ACTIVITY LOG ── */}
        <div style={{
          background: "#1a2236", borderRadius: 10, padding: "0.5rem 0.75rem",
          border: "1px solid #2a3a50", maxHeight: 90, overflowY: "auto",
        }}>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#555", marginBottom: 5, lineHeight: 1.7 }}>
            📋 LOG
          </div>
          {gs.log.length === 0 ? (
            <div style={{ fontFamily: "'VT323'", fontSize: 17, color: "#444" }}>No activity yet. Start your day!</div>
          ) : gs.log.map((e, i) => (
            <div key={i} style={{
              fontFamily: "'VT323'", fontSize: 15, color: i === 0 ? "#97C459" : "#555",
              lineHeight: 1.3, borderBottom: "1px solid #2a3a50", paddingBottom: 2, marginBottom: 2,
            }}>
              {e.text}
            </div>
          ))}
        </div>

        {/* tip */}
        <div style={{ marginTop: "0.5rem", fontFamily: "'VT323'", fontSize: 14, color: "#444", textAlign: "center" }}>
          TIP: {CONTEXT_TIPS.default[gs.day % 12]}
        </div>
      </div>
    </div>
  );
}
