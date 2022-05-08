import { useContext } from "react";
import { ToDoContext } from "../context/ToDoContext";

const ToDoButtons = () => {
  const { dispatch } = useContext(ToDoContext);

  return (
    <div className="buttonGroup">
      <button
        onClick={() => {
          dispatch({
            type: "ADD_TODO",
          });
        }}
      >
        Add Todo
      </button>
      <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
        Clear Completed
      </button>
      <button onClick={() => dispatch({ type: "CLEAR_ALL" })}>Clear All</button>
    </div>
  );
};

export default ToDoButtons;
