import { abort } from "process";

export const BASE_URL = "";


class JsonError extends Error {
  response: object;

  constructor(message: any, response: object) {
    super(message);
    this.response = response;
  }
}

export interface TaskClient {
  fetchTasks(): Promise<Tasks>;
  createTask(task: Task): Promise<Task>;
  updateTask(tid: TaskId, taskUpdate: TaskUpdate): Promise<void>;
  destroyTask(tid: TaskId): Promise<void>;
}

export default function createClient({
  userId,
  baseUrl = BASE_URL,
}: {
  userId: string;
  baseUrl?: string;
}): TaskClient {
  const userPath = () => `${baseUrl}/user/${userId}`;
  const tasksPath = () => `${userPath()}/task`;
  const taskPath = (tid: string) => `${tasksPath()}/${tid}`;

  let abortControllers: AbortController[] = [];

  function abortFetchTasks() {
    let controller: AbortController | undefined;
    while ((controller = abortControllers.pop())) {
      controller.abort();
    }
  }

  return {
    async fetchTasks() {
      abortFetchTasks();
      const controller = new AbortController();
      abortControllers.push(controller);

      return fetch(tasksPath(), { signal: controller.signal }).then(resp =>
        resp.json(),
      );
    },
    async createTask(task) {
      const response = await fetch(tasksPath(), {
        method: "POST",
        body: JSON.stringify(task),
      });

      if (response.ok) {
        return response.json();
      }

      throw new JsonError("Invalid Message", await response.json());
    },
    async updateTask(tid, taskUpdate) {
      await fetch(taskPath(tid), {
        method: "PUT",
        body: JSON.stringify(taskUpdate),
      });
    },
    async destroyTask(tid) {
      await fetch(taskPath(tid), {
        method: "DELETE",
      });
    },
  };
}
