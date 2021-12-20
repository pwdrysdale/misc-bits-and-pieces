import { useContext } from "react";
import { MyContext } from "../context/appContext";

const ColorSet = () => {
    const { colorMode, dispatch } = useContext(MyContext);

    const handleColorChange = () => {
        dispatch({
            type: "CHANGE_COLOR_MODE",
            payload: colorMode === "purple" ? "blue" : "purple",
        });
    };

    return (
        <div style={{ backgroundColor: colorMode, color: "white" }}>
            <h1>{colorMode}</h1>
            <button onClick={handleColorChange}>Change Color!</button>
        </div>
    );
};

export default ColorSet;
