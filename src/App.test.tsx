import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { TaskClient } from "./services/client";
import { act } from "react-dom/test-utils";

const tasks: Tasks = [];

const mockClient: TaskClient = {
  fetchTasks: async () => tasks,
  createTask: async task => {
    tasks.push(task);
    return task;
  },
  updateTask: async (tid, taskUpdate) => undefined,
  destroyTask: async tid => undefined,
};

test("renders learn react link", async () => {
  render(<App client={mockClient} />);

  fireEvent.change(screen.getByTestId("description-input"), {
    target: { value: "Hello" },
  });

  fireEvent.click(screen.getByTestId("submit-button"));

  await waitFor(() => screen.getByTestId("task-description"));
  expect(screen.getByTestId("task-description")).toHaveTextContent("Hello");
});
