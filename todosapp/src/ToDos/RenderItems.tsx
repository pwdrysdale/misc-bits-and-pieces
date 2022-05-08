import ToDoItem from "./ToDoItem";
import { Todo } from "../types";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ToDoContext } from "../context/ToDoContext";

type SortOptions =
  | "Date Added"
  | "Due Date"
  | "Completed"
  | "Alphabetical"
  | "Priority";

const RenderItems: FC = () => {
  const [sortCriteria, setSortCriteria] = useState<SortOptions>("Date Added");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { todos, dispatch } = useContext(ToDoContext);

  // Load up todos from local storage
  useEffect(() => {
    const raw = localStorage.getItem("todos");

    if (raw) {
      const todosStringDates = JSON.parse(raw);
      const todos: Todo[] = todosStringDates.map((t: any) => ({
        ...t,
        dueDate: new Date(t.dueDate),
      }));

      dispatch({
        type: "GET_TODOS",
        payload: todos,
      });
    }
  }, [dispatch]);

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // function to cycle through the sort options
  const cycleSortCriteria = useCallback((): void => {
    console.log("Cycling sort criteria");
    const sortOptions: SortOptions[] = [
      "Date Added",
      "Due Date",
      "Completed",
      "Alphabetical",
      "Priority",
    ];

    const currentIndex = sortOptions.indexOf(sortCriteria);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortCriteria(sortOptions[nextIndex]);
  }, [sortCriteria]);

  const sortedToDos = useMemo(() => {
    return todos
      .sort((a, b) => {
        if (order === "asc") {
          switch (sortCriteria) {
            case "Date Added":
              return a.createdDate > b.createdDate ? 1 : -1;
            case "Due Date":
              return a.dueDate > b.dueDate ? 1 : -1;
            case "Completed":
              return a.completed === b.completed ? 1 : -1;
            case "Alphabetical":
              return a.text.localeCompare(b.text);
            case "Priority":
              return a.priority > b.priority ? 1 : -1;
            default:
              return 0;
          }
        } else {
          switch (sortCriteria) {
            case "Date Added":
              return a.createdDate < b.createdDate ? 1 : -1;
            case "Due Date":
              return a.dueDate < b.dueDate ? 1 : -1;
            case "Completed":
              return a.completed === b.completed ? -1 : 1;
            case "Alphabetical":
              return a.text.localeCompare(b.text) * -1;
            case "Priority":
              return a.priority < b.priority ? 1 : -1;
            default:
              return 0;
          }
        }
      })
      .map((todo) => <ToDoItem key={todo.id} todo={todo} />);
  }, [todos, order, sortCriteria]);

  return (
    <>
      <div className="buttonGroup">
        <button onClick={cycleSortCriteria}>{sortCriteria}</button>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <table>
        <tbody className="divide-y">{sortedToDos}</tbody>
      </table>
    </>
  );
};

export default RenderItems;
