import logo from "./logo.svg";
import "./App.css";
import { useArray } from "./hooks/useArray";
import UseMemoExample from "./useMemoExample";
import SortMessages from "./SortMessages";

const messages = [
  {
    id: 1,
    text: "Hello",
    createdDate: new Date(),
  },
  {
    id: 2,
    text: "World",
    createdDate: new Date(),
  },
  {
    id: 3,
    text: "How",
    createdDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2),
  },
];

function App() {
  const initial = {
    id: 1,
    name: "React Hooks",
  };

  const { value, addItem, removeItem } = useArray<{ id: number; name: string }>(
    [initial]
  );

  const handleRemoveItem = (item: { id: number; name: string }) => {
    removeItem(item);
  };

  return (
    <div className="App">
      <button
        onClick={() =>
          addItem({ id: Math.random(), name: `Item ${value.length}` })
        }
      >
        Add Item
      </button>
      {value.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => handleRemoveItem(item)}>Remove</button>
        </div>
      ))}
      <UseMemoExample />
      <SortMessages messages={messages} />
    </div>
  );
}

export default App;
