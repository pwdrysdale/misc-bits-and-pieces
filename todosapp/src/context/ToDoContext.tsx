import React, { createContext, FC, useReducer } from "react";
import { Todo } from "../types";
import { v4 as uuid } from "uuid";

const reducerFn = (state: { todos: Todo[]; dispatch: any }, action: any) => {
  switch (action.type) {
    case "GET_TODOS":
      console.log("trying to set us up");
      console.log(action.payload);
      return { ...state, todos: action.payload };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case "SET_DATE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, dueDate: action.payload.dueDate }
            : todo
        ),
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuid(),
            text: "",
            completed: false,
            dueDate: new Date(),
            createdDate: new Date(),
            priority: 3,
          },
        ],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "UPDATE_PRIORITY":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, priority: action.payload.priority }
            : todo
        ),
      };

    case "CLEAR_COMPLETED":
      return { ...state, todos: state.todos.filter((todo) => !todo.completed) };
    case "CLEAR_ALL":
      return { ...state, todos: [] };
    default:
      return state;
  }
};

interface ContextInterface {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
}

const initialState: ContextInterface = {
  todos: [],
  dispatch: () => {},
};

export const ToDoContext: React.Context<ContextInterface> = createContext({
  ...initialState,
});

export const ToDosProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  return (
    <ToDoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
};
