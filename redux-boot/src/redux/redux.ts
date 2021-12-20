import { combineReducers, createStore, Reducer } from "redux";

export interface StateType {
    count: number;
    color: string;
}

const initialState = {
    count: 0,
    color: "black",
};

const countReducer = (state: number = 0, action: any) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};

const colorReducer = (state: string = "black", action: any) => {
    switch (action.type) {
        case "CHANGE_COLOR":
            return action.payload;
        default:
            return state;
    }
};

const reducers: Reducer<StateType> = combineReducers({
    count: countReducer,
    color: colorReducer,
});

export const store = createStore(reducers, initialState);
