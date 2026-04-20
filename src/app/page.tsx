"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { WelcomeHero } from "@/components/states/welcome-hero";
import styles from "./page.module.css";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <section className={styles.content}>
          <div className={styles.contentGlow} />
          <WelcomeHero />
        </section>
      </div>
    </main>
  );
}