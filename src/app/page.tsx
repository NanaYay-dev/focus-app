"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { WelcomeHero } from "@/components/states/welcome-hero";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { ui } from "@/components/ui/ui";

type View = "home" | "timer" | "kanban" | "stats";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<View>("home");

  return (
    <main className={ui.page}>
      <div className={ui.appFrame}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <section className={ui.content}>
          <div className={ui.contentGlow} />

          {activeView === "home" && <WelcomeHero />}
          {activeView === "kanban" && <KanbanBoard />}
          {activeView === "timer" && <div>Timer screen soon</div>}
          {activeView === "stats" && <div>Stats screen soon</div>}
        </section>
      </div>
    </main>
  );
}