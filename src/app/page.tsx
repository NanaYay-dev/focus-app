"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { WelcomeHero } from "@/components/states/welcome-hero";
import { ui } from "@/components/ui/ui";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main className={ui.page}>
      <div className={ui.appFrame}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <section className={ui.content}>
          <div className={ui.contentGlow} />
          <WelcomeHero />
        </section>
      </div>
    </main>
  );
}