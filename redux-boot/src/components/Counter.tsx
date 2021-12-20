import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../redux/redux";

const Counter = () => {
    // get the count from the store
    const count = useSelector((state: StateType) => state.count);

    const dispatch = useDispatch();

    const increment = useCallback(() => {
        dispatch({ type: "INCREMENT" });
    }, [dispatch]);

    const decrement = useCallback(() => {
        dispatch({ type: "DECREMENT" });
    }, [dispatch]);

    return (
        <div>
            <h1>Counter App</h1>
            {count}
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;
