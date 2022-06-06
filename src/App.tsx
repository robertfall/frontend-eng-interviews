import React, { useState, useEffect, useMemo } from "react";
import { USER_ID } from "./constants";
import TaskFrom from "./components/TaskForm";
import Task from "./components/Task";
import Header from "./components/Header";
import createClient from "./client";

function App() {
  const [tasks, setTasks] = useState<Tasks>([]);
  const [loading, setLoading] = useState(true);
  const client = useMemo(() => createClient({ userId: USER_ID }), []);

  useEffect(() => {
    client
      .fetchTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [client]);

  const createTask = async (task: Task) => {
    setLoading(true);

    try {
      const newTask = await client.createTask(task);
      setTasks([...tasks, newTask]);
    } finally {
      setLoading(false);
    }
  };

  const markTaskCompleted = async (tid: string) => {
    setLoading(true);

    try {
      await client.updateTask(tid, { completed: true });
      const tasks = await client.fetchTasks();
      setTasks(tasks);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      <Header />
      <TaskFrom onSubmit={createTask} />
      {tasks.map(task => (
        <Task key={task.tid} {...task} onComplete={markTaskCompleted} />
      ))}
    </div>
  );
}

export default App;
