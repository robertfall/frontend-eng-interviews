export { };

declare global {
  interface Task {
    tid: TaskId;
    description: string;
    due: null | string;
    completed: null | string;
  }

  type Tasks = Task[];
  type TaskId = string;

  interface NewTask {
    description: string;
    completed: boolean;
  }

  interface TaskUpdate {
    completed: boolean;
  }

  interface TaskStore {
    loading: boolean,
    tasks: Tasks,
    error: string,
    fetchTasks: Function<void>,
    createTask: Function<NewTask, void>,
    markTaskCompleted: Function<string, void>,
    destroyTask: Function<string, void>
  }
}
