"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal/modal";
import type { Task } from "./types";
import styles from "./kanban.module.css";

type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
};

export function TaskCreateModal({
  isOpen,
  onClose,
  onCreateTask,
}: TaskCreateModalProps) {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;

    onCreateTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      status: "todo",
      type: "simple",
    });

    setTitle("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Create task"
      subtitle="Start with a simple task. Details will come later."
      onClose={onClose}
    >
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={styles.input}
        placeholder="Task title..."
        autoFocus
      />

      <div className={styles.modalActions}>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>

        <button
          type="button"
          className={styles.createButton}
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </Modal>
  );
}