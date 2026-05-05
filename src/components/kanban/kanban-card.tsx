import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "./types";
import styles from "./kanban.module.css";

type KanbanCardProps = {
  task: Task;
  isOverlay?: boolean;
};

const typeLabels: Record<Task["type"], string> = {
  simple: "Simple",
  "quick-win": "Quick win",
  "big-task": "Big task",
  deadline: "Deadline",
  flight: "Flight",
};

const priorityLabels: Record<NonNullable<Task["priority"]>, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function KanbanCard({ task, isOverlay = false }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const completedSubtasks =
    task.subtasks?.filter((subtask) => subtask.done).length ?? 0;

  const totalSubtasks = task.subtasks?.length ?? 0;

  const progress =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <article
      ref={isOverlay ? undefined : setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`${styles.card} ${isDragging ? styles.cardDragging : ""} ${
        isOverlay ? styles.cardOverlay : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <div className={styles.cardHeader}>
        <span className={styles.badge}>{typeLabels[task.type]}</span>

        {task.priority && (
          <span className={styles.badge}>
            {priorityLabels[task.priority]}
          </span>
        )}
      </div>

      <h3 className={styles.cardTitle}>{task.title}</h3>

      {task.description && (
        <p className={styles.cardDesc}>{task.description}</p>
      )}

{totalSubtasks > 0 && (
  <>
    <div className={styles.progressBlock}>
      <div className={styles.progressMeta}>
        <span>Subtasks</span>
        <span>
          {completedSubtasks}/{totalSubtasks}
        </span>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressValue}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

    <div className={styles.secondaryTasks}>
      {task.subtasks?.map((subtask) => (
        <div
          key={subtask.id}
          className={`${styles.secondaryCard} ${
            subtask.done ? styles.secondaryCardDone : ""
          }`}
        >
          <span className={styles.secondaryCheck}>
            {subtask.done ? "✓" : ""}
          </span>

          <span className={styles.secondaryTitle}>
            {subtask.title}
          </span>
        </div>
      ))}
    </div>
  </>
)}

      {task.focusMinutes && (
        <p className={styles.focusTime}>Focus time: {task.focusMinutes} min</p>
      )}
    </article>
  );
}