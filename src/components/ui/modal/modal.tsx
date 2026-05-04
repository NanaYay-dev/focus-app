"use client";

import styles from "./modal.module.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({
  isOpen,
  title,
  subtitle,
  children,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}