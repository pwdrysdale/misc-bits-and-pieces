import RenderItems from "./ToDos/RenderItems";
import { ToDosProvider } from "./context/ToDoContext";
import ToDoButtons from "./ToDos/ToDoButtons";

function App() {
  return (
    <ToDosProvider>
      <div className="main">
        <h1>Todos</h1>
        <RenderItems />
        <ToDoButtons />
      </div>
    </ToDosProvider>
  );
}

export default App;
