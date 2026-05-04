"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { TaskCreateModal } from "./task-create-modal";
import type { Task, TaskStatus } from "./types";
import styles from "./kanban.module.css";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Create Kanban layout",
    description: "Basic board with columns and cards",
    status: "todo",
    type: "simple",
    priority: "medium",
  },
  {
    id: "2",
    title: "Design task card",
    description: "Prepare flexible card structure",
    status: "progress",
    type: "big-task",
    priority: "high",
    subtasks: [
      { id: "2-1", title: "Base card", done: true },
      { id: "2-2", title: "Priority state", done: false },
      { id: "2-3", title: "Future timer state", done: false },
    ],
  },
  {
    id: "3",
    title: "Deploy first version",
    status: "done",
    type: "quick-win",
    priority: "low",
    focusMinutes: 15,
  },
];

const columns: {
  id: TaskStatus;
  title: string;
  subtitle: string;
}[] = [
  { id: "todo", title: "To do", subtitle: "Tasks waiting for focus" },
  { id: "progress", title: "In progress", subtitle: "Active work zone" },
  { id: "done", title: "Done", subtitle: "Completed" },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((item) => item.id === event.active.id);
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeTaskId = String(active.id);
    const overId = String(over.id);

    if (activeTaskId === overId) return;

    const activeTask = tasks.find((task) => task.id === activeTaskId);
    const overTask = tasks.find((task) => task.id === overId);
    const overColumn = columns.find((column) => column.id === overId);

    if (!activeTask) return;

    const newStatus = overColumn?.id ?? overTask?.status;

    if (!newStatus) return;

    setTasks((prevTasks) => {
      const activeIndex = prevTasks.findIndex(
        (task) => task.id === activeTaskId,
      );
      const overIndex = prevTasks.findIndex((task) => task.id === overId);

      if (activeIndex === -1) return prevTasks;

      const updatedTasks = prevTasks.map((task) =>
        task.id === activeTaskId ? { ...task, status: newStatus } : task,
      );

      if (overTask && overIndex !== -1) {
        return arrayMove(updatedTasks, activeIndex, overIndex);
      }

      return updatedTasks;
    });
  };

  const handleCreateTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <section className={styles.board}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>Focus OS</span>
          <h1 className={styles.title}>Kanban board</h1>
          <p className={styles.subtitle}>Simple task flow for now...</p>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Add task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.columns}>
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.id,
            );

            return (
              <SortableContext
                key={column.id}
                items={columnTasks.map((task) => task.id)}
                strategy={rectSortingStrategy}
              >
                <KanbanColumn
                  title={column.title}
                  subtitle={column.subtitle}
                  status={column.id}
                  tasks={columnTasks}
                />
              </SortableContext>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? <KanbanCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      <TaskCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </section>
  );
}