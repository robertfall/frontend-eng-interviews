import React, {
  useState,
  useEffect,
} from "react";
import TaskFrom from "./TaskForm";
import Task from "./Task";
import { USER_ID, BASE_URL } from "./constants";
import logo from "./logo.svg";
import "./App.css";
import { formatDate } from './helpers';

const TASK_URL = `${BASE_URL}user/${USER_ID}/task`;

function App() {
  const [tasks, setTasks] = useState<Tasks>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(TASK_URL)
      .then(resp => resp.json())
      .then(tasks => {
        setTasks(tasks);
      });
  }, []);

  const createTask = (task: Task) => {
    setLoading(true);

    fetch(TASK_URL, {
      method: "POST",
      body: JSON.stringify(task),
    })
      .then(resp => resp.json())
      .then(task => {
        setTasks([...tasks, task]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const markTaskCompleted: Function = (tid: string) => {
    setLoading(true);

    const completionDate = formatDate(new Date());

    fetch(`${TASK_URL}/${tid}`, {
      method: "PUT",
      body: JSON.stringify({ completed: true }),
    })
      .then(resp => resp.json())
      .then(() => {
        const taskIndex = tasks.findIndex(task => task.tid === tid);
        const updatedTask: Task = {
          ...tasks[taskIndex],
          completed: completionDate,
        };
        setTasks([
          ...tasks.slice(0, taskIndex),
          updatedTask,
          ...tasks.slice(taskIndex + 1),
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div>TodoCat</div>
      {loading && <div>Loading...</div>}
      <TaskFrom onSubmit={createTask} />
      {tasks.map(task => (
        <Task {...task} onComplete={markTaskCompleted} />
      ))}
    </div>
  );
}

export default App;
