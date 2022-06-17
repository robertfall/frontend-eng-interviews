import styled from "@emotion/styled";
import { useContext } from "react";
import { StoreContext } from "./StoreProvider";

const Message = styled.div`
  text-align: center;
  font-style: italic;
  color: #c1c1c1;
  margin: 8px;
`;

const LoadingMessage = () => {
  const { loading } = useContext(StoreContext) as TaskStore;

  return loading ? (
    <Message>Saving...</Message>
  ) : null;
};

export default LoadingMessage;
