import React, { FC } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../redux/redux";

const Container: FC = ({ children }) => {
    const color = useSelector((state: StateType) => state.color);

    return (
        <div
            style={{
                color: "white",
                backgroundColor: color,
            }}
        >
            {children}
        </div>
    );
};

export default Container;
