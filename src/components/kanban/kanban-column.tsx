import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanban-card";
import type { Task, TaskStatus } from "./types";
import styles from "./kanban.module.css";

type KanbanColumnProps = {
  title: string;
  subtitle: string;
  status: TaskStatus;
  tasks: Task[];
};

export function KanbanColumn({
  title,
  subtitle,
  status,
  tasks,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.column} ${isOver ? styles.columnOver : ""}`}
    >
      <div className={styles.columnHeader}>
        <div>
          <h2 className={styles.columnTitle}>{title}</h2>
          <p className={styles.columnSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.count}>{tasks.length}</div>
      </div>

      <div className={styles.cards}>
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className={styles.emptyColumn}>Drop task here</div>
        )}
      </div>
    </div>
  );
}