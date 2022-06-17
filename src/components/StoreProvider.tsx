import { createContext, useEffect, useMemo, useState } from "react";
import update from "immutability-helper";
import { formatDate } from "../helpers";
import { TaskClient } from "../services/client";
export const StoreContext = createContext<TaskStore | undefined>(undefined);
StoreContext.displayName = "StateContext";

const StoreProvider = ({
  client,
  children,
}: {
  client: TaskClient;
  children: any;
}) => {
  const [tasks, setTasks] = useState<Tasks>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetchTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [client]);

  const store: TaskStore = {
    loading,
    tasks,
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
      setTasks([...tasks, task]);
      setLoading(true);
      const newTask = await client.createTask(task);
      this.fetchTasks();
    },
    async markTaskCompleted(tid: string, completed: boolean) {
      const oldTaskIndex = tasks.findIndex(t => t.tid === tid);
      const updatedTask = {
        ...tasks[oldTaskIndex],
        completed: completed ? formatDate(new Date()) : null,
      };
      const updatedTasks: Tasks = [
        ...tasks.slice(0, oldTaskIndex),
        updatedTask,
        ...tasks.slice(oldTaskIndex + 1),
      ];

      setTasks(updatedTasks);
      setLoading(true);
      await client.updateTask(tid, { completed });
      this.fetchTasks();
    },
    async destroyTask(tid: string) {
      setTasks(tasks.filter(task => task.tid !== tid));
      setLoading(true);
      await client.destroyTask(tid);
      this.fetchTasks();
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
