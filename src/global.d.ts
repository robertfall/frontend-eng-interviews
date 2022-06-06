export {};

declare global {
  interface Task {
    tid: string;
    description: string;
    due: null | string;
    completed: null | string;
  }

  type Tasks = Task[];

  interface NewTask {
    description: string;
    completed: boolean;
  }

  interface TaskUpdate {
    completed: boolean;
  }
}
