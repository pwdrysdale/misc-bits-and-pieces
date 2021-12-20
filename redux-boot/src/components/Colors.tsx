import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../redux/redux";

const Colors = () => {
    // get colors from the store
    const color = useSelector((state: StateType) => state.color);

    // get dispatch from the store
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Colors App</h1>
            {color}
            {/* Button to change the color */}
            <button
                onClick={() => {
                    // dispatch an action to change the color
                    dispatch({
                        type: "CHANGE_COLOR",
                        payload: color === "black" ? "blue" : "black",
                    });
                }}
            >
                Change Color
            </button>
        </div>
    );
};

export default Colors;
