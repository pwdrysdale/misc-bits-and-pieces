import logo from "./logo.svg";
import "./App.css";
import useGetData from "./hooks/useGetData";
import { useArray } from "./hooks/useArray";
import { useCallback, useState } from "react";

function App() {
  const initial = {
    id: 1,
    name: "React Hooks",
  };

  const { value, addItem, removeItem } = useArray<{ id: number; name: string }>(
    [initial]
  );

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
          <button onClick={() => removeItem(item)}>Remove</button>
        </div>
      ))}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
