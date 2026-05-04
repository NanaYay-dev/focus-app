export type TaskStatus = "todo" | "progress" | "done";

export type TaskType =
  | "simple"
  | "quick-win"
  | "big-task"
  | "deadline"
  | "flight";

export type TaskPriority = "low" | "medium" | "high";

export type Subtask = {
  id: string;
  title: string;
  done: boolean;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  type: TaskType;

  priority?: TaskPriority;
  deadline?: string;
  focusMinutes?: number;
  subtasks?: Subtask[];
};