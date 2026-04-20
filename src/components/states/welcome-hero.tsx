import { Plus } from "lucide-react";
import styles from "./welcome-hero.module.css";

export function WelcomeHero() {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Welcome!</h1>

        <p className={styles.subtitle}>What&apos;s your first task?</p>

        <button type="button" className={styles.button}>
          <span className={styles.icon}>
            <Plus size={30} strokeWidth={2.2} />
          </span>
          <span>Add Your First Task</span>
        </button>
      </div>
    </section>
  );
}