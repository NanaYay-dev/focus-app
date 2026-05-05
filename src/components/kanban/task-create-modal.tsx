"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Modal } from "@/components/ui/modal/modal";
import { Input } from "@/components/ui/input";
import type { Task, TaskPriority, TaskType, Subtask } from "./types";
import styles from "./kanban.module.css";

type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
};

const taskTypes: { value: TaskType; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "big-task", label: "Big task" },
  { value: "deadline", label: "Deadline" },
];

const priorities: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function TaskCreateModal({
  isOpen,
  onClose,
  onCreateTask,
}: TaskCreateModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TaskType>("simple");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const resetForm = () => {
    setTitle("");
    setType("simple");
    setPriority("medium");
    setDeadline(null);
    setSubtaskTitle("");
    setSubtasks([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAddSubtask = () => {
    if (!subtaskTitle.trim()) return;

    setSubtasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: subtaskTitle.trim(),
        done: false,
      },
    ]);

    setSubtaskTitle("");
  };

  const handleCreate = () => {
    if (!title.trim()) return;

    onCreateTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      status: "todo",
      type,
      priority,
      deadline:
        type === "deadline" && deadline ? deadline.toISOString() : undefined,
      subtasks: type === "big-task" ? subtasks : undefined,
    });

    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Create task"
      subtitle="Choose task type and add the details you need."
      onClose={handleClose}
    >
      <div className={styles.segmentedControl}>
        {taskTypes.map((taskType) => (
          <button
            key={taskType.value}
            type="button"
            className={`${styles.segmentButton} ${
              type === taskType.value ? styles.segmentButtonActive : ""
            }`}
            onClick={() => setType(taskType.value)}
          >
            {taskType.label}
          </button>
        ))}
      </div>

      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Task title..."
        autoFocus
      />

      <div className={styles.priorityRow}>
        {priorities.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`${styles.priorityButton} ${
              priority === item.value ? styles.priorityButtonActive : ""
            }`}
            onClick={() => setPriority(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {type === "deadline" && (
        <div className={styles.deadlineField}>
          <label className={styles.fieldLabel}>Deadline</label>

          <DatePicker
            selected={deadline}
            onChange={(date: Date | null) => setDeadline(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd MMM yyyy, HH:mm"
            placeholderText="Select date and time"
            className={styles.datePickerInput}
            popperClassName={styles.datePickerPopper}
            popperPlacement="top-start"
          />
        </div>
      )}

      {type === "big-task" && (
        <div className={styles.subtaskCreateBlock}>
          <div className={styles.subtaskInputRow}>
            <Input
              value={subtaskTitle}
              onChange={(event) => setSubtaskTitle(event.target.value)}
              placeholder="Secondary task..."
            />

            <button
              type="button"
              className={styles.addSubtaskButton}
              onClick={handleAddSubtask}
            >
              +
            </button>
          </div>

          {subtasks.length > 0 && (
            <div className={styles.secondaryTasks}>
              {subtasks.map((subtask) => (
                <div key={subtask.id} className={styles.secondaryCard}>
                  <span className={styles.secondaryCheck} />
                  <span className={styles.secondaryTitle}>{subtask.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.modalActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleClose}
        >
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
