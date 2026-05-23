import { useState, useMemo } from "react";
import { MAJORS, getTeacherForSubject, DEFAULT_SCHEDULE, getCurrentLesson } from "../data/majors";
import { DAYS, TIME_SLOTS, getDayName } from "../data/gameData";

const SUBJECT_TEACHER_NOTES = {
  algorithms: "Remember: arrays are fast for indexing, linked lists for insertion.",
  ai_ml: "The key insight: gradient descent finds local minima iteratively.",
  software_eng: "Design patterns are reusable solutions to common problems.",
  mechanics: "Physics is the language of engineering � learn to speak it.",
  electronics: "Current flows from high to low potential � always.",
  structures: "Every force has an equal and opposite reaction.",
  finance: "Cash flow is king � revenue without collection isn't real.",
  marketing: "Know your customer better than they know themselves.",
  management: "A leader's job is to create more leaders, not followers.",
  anatomy: "The body is a system of systems � learn how they integrate.",
  pharma: "First, do no harm � dosing is a responsibility, not a calculation.",
  patient_care: "Treat the patient, not just the disease.",
  design: "Architecture is the thoughtful making of spaces.",
  building_tech: "A building stands on physics and falls on oversight.",
  arch_history: "We build on the shoulders of those who built before us.",
};

export default function StudyScreen({ majorId, dayIndex, slotIndex, gs, onStudy, onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [showTeacher, setShowTeacher] = useState(true);

  const major = MAJORS[majorId];
  const dayName = getDayName(dayIndex);
  const currentLesson = getCurrentLesson(majorId, dayName, slotIndex);

  if (!major) {
    return (
      <div style={{ fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ textAlign: "center", fontFamily: "'VT323'", fontSize: 20, color: "#E24B4A" }}>
          No major selected!<br />
          <button onClick={onBack} style={{ marginTop: "1rem", fontFamily: "'Press Start 2P'", fontSize: 8, padding: "12px 24px", background: "#185FA5", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
            ? BACK
          </button>
        </div>
      </div>
    );
  }

  const subjectList = major.subjects;
  const currentSubject = selectedSubject
    ? subjectList.find(s => s.id === selectedSubject)
    : currentLesson
      ? subjectList.find(s => s.id === currentLesson.subject)
      : subjectList[0];

  const teacher = currentSubject ? getTeacherForSubject(majorId, currentSubject.id) : null;
  const lessons = currentSubject?.lessons || [];
  const currentLessonData = lessons[currentLessonIdx % lessons.length];
  const teacherNote = SUBJECT_TEACHER_NOTES[currentSubject?.id] || "Focus on understanding the core concepts.";

  const handleStudy = () => {
    if (currentLessonData) {
      onStudy(currentSubject.id, currentLessonData, currentLessonIdx);
      setCurrentLessonIdx(prev => (prev + 1) % lessons.length);
    }
  };

  return (
    <div style={{
      fontFamily: "'Nunito',sans-serif", minHeight: "100vh", background: "#0d1117",
      padding: "1rem",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: "0.75rem", background: "linear-gradient(135deg, #1a2236, #111827)",
          borderRadius: 12, padding: "1rem", border: `1px solid ${major.color}40`,
        }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 9, color: major.color, lineHeight: 1.8 }}>
              {major.icon} {major.name}
            </div>
            <div style={{ fontFamily: "'VT323'", fontSize: 16, color: "#888", marginTop: 4 }}>
              {major.description}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'VT323'", fontSize: 20, color: "#63a4ff" }}>
              {dayName} � {TIME_SLOTS[slotIndex]}
            </div>
            {currentLesson && (
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#555", lineHeight: 1.7 }}>
                ?? {currentLesson.room} � {currentLesson.label}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "0.75rem" }}>
          {/* Subject List */}
          <div style={{
            background: "#1a2236", borderRadius: 10, padding: "0.75rem",
            border: "1px solid #2a3a50",
          }}>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: "#888", marginBottom: "0.5rem", lineHeight: 1.7 }}>
              ?? SUBJECTS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {subjectList.map(sub => (
                <button key={sub.id} onClick={() => { setSelectedSubject(sub.id); setCurrentLessonIdx(0); }}
                  style={{
                    fontFamily: "'VT323'", fontSize: 15, padding: "8px 10px",
                    background: (selectedSubject === sub.id || (!selectedSubject && currentSubject?.id === sub.id)) ? major.color + "30" : "#111827",
                    color: (selectedSubject === sub.id || (!selectedSubject && currentSubject?.id === sub.id)) ? major.color : "#aaa",
                    border: `1px solid ${(selectedSubject === sub.id || (!selectedSubject && currentSubject?.id === sub.id)) ? major.color : "#2a3a50"}`,
                    borderRadius: 6, cursor: "pointer", textAlign: "left",
                    transition: "all 0.12s",
                  }}>
                  <div>{sub.icon} {sub.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{sub.lessons.length} lessons</div>
                </button>
              ))}
            </div>

            {/* Schedule mini-view */}
            {DEFAULT_SCHEDULE[majorId] && (
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#555", marginBottom: 4, lineHeight: 1.7 }}>
                  ?? WEEKLY SCHEDULE
                </div>
                {["MON","TUE","WED","THU","FRI"].slice(0, 5).map(day => {
                  const sched = DEFAULT_SCHEDULE[majorId][day];
                  if (!sched) return null;
                  const isToday = day === dayName;
                  return (
                    <div key={day} style={{
                      background: isToday ? "rgba(99,164,255,0.1)" : "transparent",
                      borderRadius: 4, padding: "3px 6px", marginBottom: 2,
                      borderLeft: isToday ? "3px solid #63a4ff" : "3px solid transparent",
                    }}>
                      <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: isToday ? "#63a4ff" : "#555", lineHeight: 1.7 }}>
                        {day}
                      </div>
                      {sched.map((e, i) => (
                        <div key={i} style={{
                          fontFamily: "'VT323'", fontSize: 12, color: "#888",
                          display: "flex", justifyContent: "space-between",
                        }}>
                          <span>{TIME_SLOTS[e.slot][0]} � {e.label}</span>
                          <span style={{ color: "#555" }}>{e.room}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main Study Area */}
          <div style={{
            background: "#1a2236", borderRadius: 10, padding: "1rem",
            border: `1px solid ${major.color}40`, minHeight: 400,
            display: "flex", flexDirection: "column",
          }}>
            {/* Teacher */}
            <div style={{
              display: "flex", alignItems: "center", gap: "1rem",
              background: "#111827", borderRadius: 8, padding: "0.75rem",
              marginBottom: "0.75rem", border: "1px solid #2a3a50",
              cursor: "pointer",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = teacher?.color || major.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2a3a50"}
              onClick={() => setShowTeacher(!showTeacher)}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 8,
                background: teacher?.color || major.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0,
              }}>
                {teacher?.specialty?.charAt(0) || major.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: teacher?.color || major.color, lineHeight: 1.7 }}>
                  {teacher?.name || "Instructor"}
                </div>
                <div style={{ fontFamily: "'VT323'", fontSize: 15, color: "#888" }}>
                  {teacher?.specialty || "Faculty"} � "{teacherNote}"
                </div>
              </div>
              <div style={{ fontFamily: "'VT323'", fontSize: 14, color: "#555" }}>
                {showTeacher ? "?" : "?"}
              </div>
            </div>

            {/* Teacher's board / lesson content */}
            {showTeacher && currentLessonData && (
              <div style={{
                flex: 1, background: "#0d1b2a", borderRadius: 8, padding: "1rem",
                border: "1px solid #1a4a2a", marginBottom: "0.75rem",
                position: "relative", overflow: "hidden",
              }}>
                {/* Chalkboard effect */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: 4, background: "linear-gradient(90deg, #3a6a4a, #1a4a2a, #3a6a4a)",
                }} />
                <div style={{
                  fontFamily: "'Press Start 2P'", fontSize: 7, color: "#97C459",
                  marginBottom: "0.75rem", lineHeight: 1.8,
                  textAlign: "center", textTransform: "uppercase",
                }}>
                  ?? {currentLessonData.title}
                </div>
                <div style={{
                  fontFamily: "'VT323'", fontSize: 20, color: "#e8e8e8",
                  lineHeight: 1.6, textAlign: "center",
                  padding: "0.5rem",
                  background: "rgba(0,0,0,0.3)", borderRadius: 6,
                }}>
                  {currentLessonData.concept}
                </div>
                {/* Chalk dust animation */}
                <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                  fontFamily: "'VT323'", fontSize: 12, color: "#555" }}>
                  ~ chalk dust ~
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={handleStudy}
                style={{
                  flex: 1, fontFamily: "'Press Start 2P'", fontSize: 7,
                  padding: "12px", background: "linear-gradient(135deg, #3B6D11, #2a5a08)",
                  color: "white", border: "none", borderRadius: 8, cursor: "pointer",
                  lineHeight: 1.6, transition: "transform 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                ?? STUDY THIS LESSON
              </button>
              <button onClick={onBack}
                style={{
                  fontFamily: "'Press Start 2P'", fontSize: 7,
                  padding: "12px 20px", background: "#2a3a50",
                  color: "#aaa", border: "none", borderRadius: 8, cursor: "pointer",
                  lineHeight: 1.6,
                }}>
                ? BACK
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginTop: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 5, color: "#555", lineHeight: 1.7 }}>
                  LESSON PROGRESS: {currentLessonIdx + 1} / {lessons.length}
                </div>
                <div style={{ fontFamily: "'VT323'", fontSize: 14, color: "#888" }}>
                  {Math.round(((currentLessonIdx + 1) / lessons.length) * 100)}%
                </div>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                    height: "100%", width: `${((currentLessonIdx + 1) / lessons.length) * 100}%`,
                  background: major.color, borderRadius: 3,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
