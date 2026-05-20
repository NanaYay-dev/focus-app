import type { BoardingPassPreset } from "./session.types";
import styles from "./session.module.css";

type BoardingPassCardProps = {
  preset: BoardingPassPreset;
  isSelected: boolean;
  onSelect: () => void;
};

export function BoardingPassCard({
  preset,
  isSelected,
  onSelect,
}: BoardingPassCardProps) {
  return (
    <button
      type="button"
      className={`${styles.ticket} ${isSelected ? styles.ticketSelected : ""}`}
      onClick={onSelect}
    >
      <div className={styles.ticketTop}>
        <span>Boarding pass</span>
        <span className={styles.barcode}>|||||||</span>
      </div>

      <div className={styles.route}>
        <span>{preset.from}</span>
        <span className={styles.plane}>✈</span>
        <span>{preset.to}</span>
      </div>

      <div className={styles.ticketBottom}>
        <div>
          <span className={styles.smallLabel}>Time left</span>
          <strong>{preset.durationMinutes}:00</strong>
        </div>

        <div>
          <span className={styles.smallLabel}>Duration</span>
          <span>{preset.durationMinutes} min</span>
        </div>
      </div>

      <p className={styles.ticketLabel}>{preset.label}</p>
    </button>
  );
}