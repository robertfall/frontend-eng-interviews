import React from "react";
import StoreProvider from "./Store";
import TasksPage from "./components/TasksPage";
import Header from "./components/Header";
import { USER_ID } from "./constants";

function App() {
  return (
    <StoreProvider userId={USER_ID}>
      <Header />
      <TasksPage />
    </StoreProvider>
  );
}

export default App;
