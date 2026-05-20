"use client";

import { useState } from "react";
import { BoardingPassCard } from "./boarding-pass-card";
import { FocusSession } from "./focus-session";
import type {
  BoardingPassPreset,
  FocusSessionDraft,
  SessionStep,
} from "./session.types";
import styles from "./session.module.css";

const presets: BoardingPassPreset[] = [
  { id: "15", from: "MEL", to: "SYD", durationMinutes: 15, label: "Quick boarding" },
  { id: "25", from: "MEL", to: "NRT", durationMinutes: 25, label: "Pomodoro flight" },
  { id: "30", from: "MEL", to: "LAX", durationMinutes: 30, label: "Focus route" },
  { id: "45", from: "MEL", to: "LHR", durationMinutes: 45, label: "Deep work" },
  { id: "60", from: "MEL", to: "JFK", durationMinutes: 60, label: "Long haul" },
];

export function SessionsPage() {
  const [step, setStep] = useState<SessionStep>("select");
  const [selectedPreset, setSelectedPreset] =
    useState<BoardingPassPreset | null>(null);
  const [sessionTitle, setSessionTitle] = useState("");
  const [activeSession, setActiveSession] =
    useState<FocusSessionDraft | null>(null);

  const handleSelectPreset = (preset: BoardingPassPreset) => {
    setSelectedPreset(preset);
    setStep("setup");
  };

const handleStartSession = () => {
  if (!selectedPreset) return;

  setActiveSession({
    title: sessionTitle.trim(),
    durationMinutes: selectedPreset.durationMinutes,
    from: selectedPreset.from,
    to: selectedPreset.to,
  });

  setStep("focus");
};

  const handleReset = () => {
    setStep("select");
    setSelectedPreset(null);
    setSessionTitle("");
    setActiveSession(null);
  };

  if (step === "focus" && activeSession) {
    return <FocusSession session={activeSession} onExit={handleReset} />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Flight sessions</p>
          <h1 className={styles.title}>Choose your focus ticket</h1>
          <p className={styles.subtitle}>
            Select a boarding pass, name your task if needed, and start focus mode.
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.ticketGrid}>
          {presets.map((preset) => (
            <BoardingPassCard
              key={preset.id}
              preset={preset}
              isSelected={selectedPreset?.id === preset.id}
              onSelect={() => handleSelectPreset(preset)}
            />
          ))}
        </div>

        <aside className={styles.panel}>
          <p className={styles.panelLabel}>Selected flight</p>

          {selectedPreset ? (
            <>
              <h2 className={styles.panelTitle}>
                {selectedPreset.durationMinutes} min focus
              </h2>

              <p className={styles.panelText}>
                {selectedPreset.from} → {selectedPreset.to}
              </p>

              <label className={styles.inputGroup}>
                <span>Task name</span>
                <input
                  value={sessionTitle}
                  onChange={(event) => setSessionTitle(event.target.value)}
                  placeholder="Optional, e.g. Design task modal"
                  className={styles.input}
                />
              </label>

              <button
                type="button"
                className={styles.startButton}
                onClick={handleStartSession}
              >
                Start focus
              </button>
            </>
          ) : (
            <p className={styles.panelText}>
              Pick a boarding pass to prepare your session.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}