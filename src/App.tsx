import StoreProvider from "./components/StoreProvider";
import TasksPage from "./components/TasksPage";
import Header from "./components/Header";
import { TaskClient } from "./services/client";

function App({ client }: { client: TaskClient}) {
  return (
    <StoreProvider client={client}>
      <Header />
      <TasksPage />
    </StoreProvider>
  );
}

export default App;
