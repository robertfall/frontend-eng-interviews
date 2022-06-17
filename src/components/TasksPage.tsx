import React from "react";
import styled from "@emotion/styled";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import LoadingMessage from "./LoadingMessage";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 16px 0;
`;

const TasksPage = () => {
  return (
    <Container>
      <TaskForm />
      <TaskList />
      <LoadingMessage />
    </Container>
  );
};

export default TasksPage;
