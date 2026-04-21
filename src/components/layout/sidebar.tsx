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

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const navItems = [
  { label: "Home", icon: House, active: true },
  { label: "Timer", icon: TimerReset, active: false },
  { label: "Kanban", icon: KanbanSquare, active: false },
  { label: "Stats", icon: ChartColumn, active: false },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
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
                className={cn(
                  styles.navItem,
                  isOpen ? styles.navItemOpen : styles.navItemClosed,
                  item.active && styles.navItemActive,
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
                isDark ? <Moon size={16} /> : <Sun size={16} />
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