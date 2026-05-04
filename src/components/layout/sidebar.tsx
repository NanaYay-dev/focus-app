"use client";

import { useEffect, useState } from "react";
import {
  ChartColumn,
  ChevronLeft,
  House,
  KanbanSquare,
  Moon,
  Sun,
  TimerReset,
} from "lucide-react";
import Image from "next/image";
import styles from "./sidebar.module.css";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type View = "home" | "timer" | "kanban" | "stats";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  activeView: View;
  onViewChange: (view: View) => void;
};

const navItems: { label: string; view: View; icon: typeof House }[] = [
  { label: "Home", view: "home", icon: House },
  { label: "Timer", view: "timer", icon: TimerReset },
  { label: "Kanban", view: "kanban", icon: KanbanSquare },
];

export function Sidebar({
  isOpen,
  onToggle,
  activeView,
  onViewChange,
}: SidebarProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <aside
      className={cn(
        styles.sidebar,
        isOpen ? styles.sidebarOpen : styles.sidebarClosed,
      )}
    >
      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <ChevronLeft
          className={cn(styles.chevron, !isOpen && styles.chevronClosed)}
        />
      </button>

      <div>
        <div
          className={cn(
            styles.logo,
            isOpen ? styles.logoOpen : styles.logoClosed,
          )}
        >
          <Image src="/logo.png" alt="logo" width={44} height={44} />

          <span
            className={cn(
              styles.logoText,
              isOpen ? styles.logoTextVisible : styles.logoTextHidden,
            )}
          >
            Focus OS
          </span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
<button
  key={item.label}
  type="button"
  onClick={() => onViewChange(item.view)}
  className={cn(
    styles.navItem,
    isOpen ? styles.navItemOpen : styles.navItemClosed,
    activeView === item.view && styles.navItemActive,
  )}
>
                <Icon size={20} />

                <span
                  className={cn(
                    styles.text,
                    isOpen ? styles.textVisible : styles.textHidden,
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className={styles.footer}>
        <div
          className={cn(
            styles.theme,
            isOpen ? styles.themeVisible : styles.themeHidden,
          )}
        >
          <button
            type="button"
            className={styles.themeInner}
            onClick={handleThemeToggle}
            disabled={!mounted}
            aria-label="Toggle theme"
          >
            <div className={styles.themeLabel}>
              {mounted ? (
                isDark ? (
                  <Moon size={16} />
                ) : (
                  <Sun size={16} />
                )
              ) : (
                <Moon size={16} />
              )}

              <span>
                {mounted ? (isDark ? "Night mode" : "Day mode") : "Theme"}
              </span>
            </div>

            <div className={styles.themeStatus}>
              {mounted ? (isDark ? "●" : "○") : "○"}
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
