import React, { ChangeEventHandler, useContext } from "react";
import styled from "@emotion/styled";
import { StoreContext } from "./StoreProvider";

const Row = styled.div`
  background-color: #f0f0f0;
  box-sizing: border-box;
  height: 50px;
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

const DeleteButton = styled.input`
  border: 1px solid black;
  color: black;
  border-radius: 4px;
  font-size: 0.875rem;
  padding: 2px 8px;
  background: none;
  margin-right: 8px;
  cursor: pointer;
`;

const CompleteCheckbox = styled.input`
  margin: 16px;
  border: 1px solid #404040;
  border-radius: 4px;
  cursor: pointer;
`;

const Description = styled.span<DescriptionProps>`
  flex-grow: 1;
  color: ${props => props.completed ? '#ccc' : 'black' }
`;

type DescriptionProps = { completed: boolean };

const Task = ({ tid, description, completed }: Task) => {
  const store = useContext(StoreContext) as TaskStore;

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    store.markTaskCompleted(tid, !completed);
  }

  return (
    <Row key={tid}>
      <CompleteCheckbox type="checkbox" checked={!!completed} onChange={handleCheckboxChange}/>
      <Description completed={!!completed}>{description}</Description>
      {!completed && (
        <DeleteButton
          type="button"
          value="Remove"
          onClick={() => store.destroyTask(tid)}
        />
      )}
    </Row>
  );
};

export default Task;
