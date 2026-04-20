import {
  ChartColumn,
  ChevronLeft,
  House,
  KanbanSquare,
  Moon,
  Settings,
  TimerReset,
} from "lucide-react";
import Image from "next/image";
import styles from "./sidebar.module.css";
import { cn } from "@/lib/utils";

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
  return (
    <aside
      className={cn(
        styles.sidebar,
        isOpen ? styles.sidebarOpen : styles.sidebarClosed,
      )}
    >
      <button className={styles.toggle} onClick={onToggle}>
        <ChevronLeft />
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
        <button
          className={cn(
            styles.navItem,
            isOpen ? styles.navItemOpen : styles.navItemClosed,
          )}
        >
          <Settings size={20} />

          <span
            className={cn(
              styles.text,
              isOpen ? styles.textVisible : styles.textHidden,
            )}
          >
            Settings
          </span>
        </button>

        <div
          className={cn(
            styles.theme,
            isOpen ? styles.themeVisible : styles.themeHidden,
          )}
        >
          <div className={styles.themeInner}>
            <div style={{ display: "flex", gap: 8 }}>
              <Moon size={16} />
              <span>Night mode</span>
            </div>
            <div>●</div>
          </div>
        </div>
      </div>
    </aside>
  );
}