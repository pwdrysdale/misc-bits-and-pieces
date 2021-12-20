import React, { createContext, FC, useReducer } from "react";

const appReducer = (state: any, action: any) => {
    switch (action.type) {
        case "CHANGE_COLOR_MODE":
            return {
                ...state,
                colorMode: action.payload,
            };
        default:
            return state;
    }
};

interface InitialState {
    colorMode: string;
    dispatch: React.Dispatch<any>;
}

const initialState: InitialState = {
    colorMode: "purple",
    dispatch: () => {},
};

export const MyContext: React.Context<InitialState> =
    createContext(initialState);

export const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <MyContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};
