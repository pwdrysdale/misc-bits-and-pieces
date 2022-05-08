import { useState, useEffect } from "react";
import "./App.css";
import { useArray } from "./hooks/useArray";
import UseMemoExample from "./useMemoExample";
import SortMessages from "./SortMessages";
import { useToggle } from "./hooks/useToggle";
import { useKey } from "./hooks/useKey";
import { useHover } from "./hooks/useHover";
import { useCounter } from "./hooks/useCounter";
import { useDebounce } from "./hooks/useDebounce";

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
  const [predebounce, setPredebounce] = useState("");

  const [toggleVal, toggle] = useToggle(true);

  const bounced = useDebounce(predebounce, 1000);
  useEffect(() => {
    console.log(bounced);
  }, [bounced]);

  useKey(
    "a",
    () => {
      alert("a key pressed");
    },
    toggleVal
  );

  const [hoveringRef, hovering] = useHover<HTMLDivElement>();

  const { increment, decrement, value: counterValue } = useCounter(0, 4, 0, 10);

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
      <h1>useHover</h1>
      <div ref={hoveringRef}>{hovering ? "👍 Yes please" : "No love 💔"}</div>
      <h1>useKey</h1>
      <p>Press a!</p>
      <h1>useToggle</h1>
      <p>{toggleVal ? "The mood is 🔥" : "😢"}</p>
      <button onClick={toggle}>Straight toggle</button>
      <button onClick={() => toggle(true)}>Set true</button>
      <button onClick={() => toggle(false)}>Set false</button>
      <h1>useCounter</h1>
      <h3>{counterValue}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <h1>useArray</h1>
      <button
        onClick={() =>
          addItem({ id: Math.random(), name: `Item ${value.length}` })
        }
      >
        Add Item
      </button>
      <h1>useDebounce</h1>
      <input
        value={predebounce}
        onChange={(e) => setPredebounce(e.target.value)}
      />
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
