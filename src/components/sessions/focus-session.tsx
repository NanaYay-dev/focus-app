"use client";

import { useEffect, useMemo, useState } from "react";
import type { FocusSessionDraft } from "./session.types";
import styles from "./session.module.css";

type FocusSessionProps = {
  session: FocusSessionDraft;
  onExit: () => void;
};

function FlightPlaneIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.planeSvg}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M9.333333333333332 5.964913333333333 14.666666666666666 9.333333333333332v1.3333333333333333l-5.333333333333333 -1.6842v3.5730666666666666L11.333333333333332 13.666666666666666V14.666666666666666l-3 -0.6666666666666666L5.333333333333333 14.666666666666666v-1l2 -1.1111333333333333v-3.5730666666666666L2 10.666666666666666v-1.3333333333333333l5.333333333333333 -3.3684199999999995V2.333333333333333c0 -0.5522866666666666 0.4477333333333333 -1 1 -1s1 0.4477133333333333 1 1v3.63158Z"
      />
    </svg>
  );
}

export function FocusSession({ session, onExit }: FocusSessionProps) {
  const totalSeconds = session.durationMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const time = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }, [secondsLeft]);

  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const breaks = useMemo(() => {
    const breakCount =
      session.durationMinutes >= 45 ? 2 : session.durationMinutes >= 30 ? 1 : 0;

    return Array.from({ length: breakCount }, (_, index) => {
      const position = ((index + 1) / (breakCount + 1)) * 100;

      return {
        id: `break-${index + 1}`,
        label: `Break ${index + 1}`,
        position,
      };
    });
  }, [session.durationMinutes]);

  return (
    <section className={styles.flightScreen}>
      <div className={styles.flightInner}>
<div className={styles.flightTop}>
  <div>
    <h1 className={styles.sessionTitle}>
      {session.title || "Untitled focus session"}
    </h1>

    <div className={styles.sessionMeta}>
      <div className={styles.flightRoute}>
        <span>{session.from}</span>

        <span className={styles.routeDivider}>
          <span>
            <FlightPlaneIcon />
          </span>
        </span>

        <span>{session.to}</span>
      </div>

      <p className={styles.flightDuration}>
        Duration: {session.durationMinutes} min
      </p>
    </div>
  </div>
</div>

        <div className={styles.flightLineWrap}>
          <div className={styles.flightLine}>
            <div
              className={styles.flightLineActive}
              style={{ width: `${progress}%` }}
            />

            <div className={styles.pointStart}>
              <span className={`${styles.mapPin} ${styles.pointPassed}`} />
              <span>{session.from}</span>
            </div>

            {breaks.map((breakPoint) => {
              const isPassed = progress >= breakPoint.position;

              return (
                <div
                  key={breakPoint.id}
                  className={styles.pointBreak}
                  style={{ left: `${breakPoint.position}%` }}
                >
                  <span
                    className={`${styles.circlePoint} ${
                      isPassed ? styles.pointPassed : ""
                    }`}
                  />

                  <span>{breakPoint.label}</span>
                </div>
              );
            })}

            <div className={styles.pointEnd}>
              <span
                className={`${styles.mapPin} ${
                  progress >= 100 ? styles.pointPassed : ""
                }`}
              />
              <span>{session.to}</span>
            </div>

            <span
              className={styles.flightPlane}
              style={{ left: `${progress}%` }}
            >
              <FlightPlaneIcon />
            </span>
          </div>
        </div>

        <div className={styles.referenceTimerCard}>
          <div>
            <p className={styles.referenceTimerLabel}>Time left</p>
            <div className={styles.referenceTimer}>{time}</div>
          </div>

          <button
            type="button"
            className={styles.referencePause}
            onClick={() => setIsRunning((value) => !value)}
          >
            {isRunning ? "Ⅱ" : "▶"}
          </button>
        </div>

        <button type="button" className={styles.referenceEnd} onClick={onExit}>
          End session
        </button>
      </div>
    </section>
  );
}
