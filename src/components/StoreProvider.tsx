import { createContext, useEffect, useState } from "react";
import { formatDate } from "../helpers";
import { TaskClient } from "../services/client";
export const StoreContext = createContext<TaskStore | undefined>(undefined);
StoreContext.displayName = "StateContext";

function generateId(): string {
  return globalThis.crypto.randomUUID();
}

function replaceTaskByTid(tid: string, task: TaskCompletion) {
  return replaceTask({ key: "tid", value: tid, task });
}

function replaceTaskByClientId(clientId: string, task: Task) {
  return replaceTask({ key: "clientId", value: clientId, task });
}

function replaceTask({
  key,
  value,
  task,
}: {
  key: keyof Task;
  value: string;
  task: Task | TaskCompletion;
}) {
  return (tasks: Tasks) => {
    const oldTaskIndex = tasks.findIndex(t => t[key] === value);
    return [
      ...tasks.slice(0, oldTaskIndex),
      { ...tasks[oldTaskIndex], ...task },
      ...tasks.slice(oldTaskIndex + 1),
    ];
  };
}

const StoreProvider = ({
  client,
  children,
}: {
  client: TaskClient;
  children: any;
}) => {
  const [tasks, setTasks] = useState<Tasks>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    client
      .fetchTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [client]);

  const store: TaskStore = {
    loading,
    tasks,
    error,
    async fetchTasks() {
      setLoading(true);
      try {
        const tasks = await client.fetchTasks();
        setTasks(tasks);
        setLoading(false);
      } catch (e: any) {
        if (e.name === "") {
          console.log("Fetch Tasks was aborted");
        } else {
          throw e;
        }
      }
    },
    async createTask(task: Task) {
      const clientId = generateId();
      setTasks([...tasks, { ...task, clientId }]);
      setLoading(true);

      try {
        const newTask = await client.createTask(task);
        setTasks(replaceTaskByClientId(clientId, newTask));
        setLoading(false);
      } catch (err) {
        setError("Failed to create contact.");
      }
    },
    async markTaskCompleted(tid: string, completed: boolean) {
      setTasks(
        replaceTaskByTid(tid, {
          completed: completed ? formatDate(new Date()) : null,
        }),
      );
      setLoading(true);
      await client.updateTask(tid, { completed });
      setLoading(false);
    },
    async destroyTask(tid: string) {
      setLoading(true);
      setTasks(tasks.filter(task => task.tid !== tid));
      await client.destroyTask(tid);
      setLoading(false);
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
