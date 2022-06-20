export { };

declare global {
  interface TaskCompletion {
    completed: null | string
  }
  interface Task extends TaskCompletion {
    tid: TaskId;
    description: string;
    due: null | string;
    clientId: null | string;
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

  interface TaskState {
    loading: boolean,
    tasks: Tasks,
    error: null | string,
  }

  interface TaskStore extends TaskState {
    fetchTasks: Function<void>,
    createTask: Function<NewTask, void>,
    markTaskCompleted: Function<string, void>,
    destroyTask: Function<string, void>
  }

  type TaskAction = CreateAction;

  interface CreateAction {
    type: 'CREATE',
    task: Task
  }
  interface Crypto {
    randomUUID: () => string;
  }
}
