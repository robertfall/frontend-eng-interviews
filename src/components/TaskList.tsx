import styled from "@emotion/styled";
import React, { useContext } from "react";
import { StoreContext } from "./StoreProvider";
import Task from "./Task";

const Container = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;
const TaskList = () => {
  const { tasks } = useContext(StoreContext) as TaskStore;
  return (
    <Container>
      {tasks.map((task, i) => (
        <Task key={i} {...task} />
      ))}
    </Container>
  );
};

export default TaskList;
