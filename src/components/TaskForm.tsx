import React, {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useCallback,
} from "react";
import styled from "@emotion/styled";
import { StoreContext } from "./StoreProvider";
import ErrorMessage from "./ErrorMessage";

const Input = styled.input`
  box-sizing: border-box;
  height: 30px;
  font-size: 0.875rem;
  flex-grow: 1;
  line-height: 1.5rem;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 8px;
`;

const Submit = styled.input`
  font-size: 1rem;
  background-color: #f08080;
  border:none;
  padding: 0 12px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const TaskForm = () => {
  const [formDescription, setFormDescription] = useState<string>("");
  const store = useContext(StoreContext) as TaskStore;

  const handleFormDescriptionChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(event => {
      setFormDescription(event.target.value);
    }, [setFormDescription]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setFormDescription("");
    store.createTask({ description: formDescription });
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="description"
        placeholder="Todo Description"
        value={formDescription}
        data-testid="description-input"
        onChange={handleFormDescriptionChange}
      />
      <Submit type="submit" value="Add" data-testid="submit-button" />
    </Form>
    { store.error && <ErrorMessage message={store.error} /> }
    </>
  );
};

export default TaskForm;
