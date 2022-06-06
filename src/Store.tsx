import React, { createContext, useEffect, useMemo, useState } from "react";
import createClient from "./client";

export const StoreContext = createContext<TaskStore | undefined>(undefined);
StoreContext.displayName = "StateContext";

const StoreProvider = ({
  userId,
  children,
}: {
  userId: string;
  children: any;
}) => {
  const client = useMemo(() => createClient({ userId }), [userId]);
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
      try {
        const tasks = await client.fetchTasks();
        setTasks(tasks);
      } finally {
        setLoading(false);
      }
    },
    async createTask(task: Task) {
      setLoading(true);

      try {
        const newTask = await client.createTask(task);
        setTasks([...tasks, newTask]);
      } finally {
        setLoading(false);
      }
    },
    async markTaskCompleted(tid: string, completed: boolean) {
      setLoading(true);

      try {
        await client.updateTask(tid, { completed });
        const tasks = await client.fetchTasks();
        setTasks(tasks);
      } finally {
        setLoading(false);
      }
    },
    async destroyTask(tid: string) {
      setLoading(true);

      try {
        await client.destroyTask(tid);
        const tasks = await client.fetchTasks();
        setTasks(tasks);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
