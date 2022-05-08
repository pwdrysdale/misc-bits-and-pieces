import { FC, useContext, useLayoutEffect, useRef, useState } from "react";
import { ToDoContext } from "../context/ToDoContext";
import { Todo } from "../types";

import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
  IoMdTrash,
} from "react-icons/io";

interface ToDoItemProps {
  todo: Todo;
}

const ToDoItem: FC<ToDoItemProps> = ({ todo }) => {
  const { dispatch } = useContext(ToDoContext);

  const [offset, setOffset] = useState(0);

  const textRef = useRef<any>();

  useLayoutEffect(() => {
    if (
      offset !== undefined &&
      textRef?.current &&
      textRef.current.childNodes
    ) {
      const newRange = document.createRange();
      const selection = document.getSelection();
      if (selection && textRef.current.childNodes.length > 0) {
        newRange.setStart(textRef.current.childNodes[0], offset);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [offset]);

  return (
    <tr key={todo.id} className="overflow-hidden border-gray-800 ">
      <td>
        <label htmlFor={`toDo-${todo.id}`}>
          {!todo.completed ? (
            <IoMdCloseCircleOutline className="text-red-600 cursor-pointer icon" />
          ) : (
            <IoMdCheckmarkCircleOutline className="text-green-600 cursor-pointer icon" />
          )}
        </label>
        <input
          id={`toDo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            dispatch({ type: "TOGGLE_COMPLETED", payload: todo.id })
          }
        />
      </td>
      <td>
        <div
          className="p-2 text-white rounded-md outline-none focus:bg-gray-800"
          ref={textRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={(e: any) => {
            const cursor = document.getSelection()?.getRangeAt(0).startOffset;
            setOffset(typeof cursor === "number" ? cursor : 0);

            dispatch({
              type: "UPDATE_TODO",
              payload: { id: todo.id, text: e.target.innerText },
            });
          }}
        >
          {todo.text}
        </div>
      </td>
      <td>
        <input
          type="date"
          value={todo.dueDate?.toISOString().split("T")[0]}
          onChange={(e) =>
            dispatch({
              type: "SET_DATE",
              payload: { id: todo.id, dueDate: new Date(e.target.value) },
            })
          }
        />
      </td>
      <td>
        <select
          className={`
          rounded-md  text-white outline-none opacity-80
          ${
            todo.priority === 1
              ? "bg-emerald-800"
              : todo.priority === 2
              ? "bg-lime-800"
              : todo.priority === 3
              ? "bg-yellow-800"
              : todo.priority === 4
              ? "bg-red-800"
              : todo.priority === 5
              ? "bg-purple-800"
              : ""
          }
        }
          `}
          value={todo.priority}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PRIORITY",
              payload: { id: todo.id, priority: parseInt(e.target.value) },
            })
          }
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </td>
      <td className="">
        <button
          onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}
          className="items-center block p-0 m-auto "
        >
          <IoMdTrash className="p-0 m-0 icon-button" />
        </button>
      </td>
    </tr>
  );
};

export default ToDoItem;
