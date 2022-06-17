import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { TaskClient } from "./services/client";

const mockClient: TaskClient = {
  fetchTasks: async () => [],
  createTask: async task => task,
  updateTask: async (tid, taskUpdate) => undefined,
  destroyTask: async tid => undefined,
};

test("renders learn react link", () => {
  render(<App client={mockClient} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
