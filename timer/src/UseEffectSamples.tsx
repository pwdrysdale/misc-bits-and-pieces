import React, { useEffect, useState } from "react";

const UseEffectSamples = () => {
    const [counter, setCounter] = useState(0);
    const [altCounter, setAltCounter] = useState(0);

    // updates on all state re-renderings
    useEffect(() => {
        console.log("No Props");
    });

    // only updates on initial render
    useEffect(() => {
        console.log("Empty array");
    }, []);

    // only updates on initial render
    useEffect(() => {
        console.log("Generic types");
    }, ["Generic"]);

    // only updates on initial render
    useEffect(() => {
        console.log("Counter 1 Re-rendered");
    }, [counter]);

    // updates on all re-renders
    useEffect(() => {
        console.log("Object");
    }, [{ foo: "Generic" }]);

    return (
        <div>
            <h1>This is for the useEffect samples</h1>
            {counter}
            <button onClick={() => setCounter(counter + 1)}>
                Update Counter 1{" "}
            </button>
            <button onClick={() => setAltCounter(altCounter + 1)}>
                Update Counter 2{" "}
            </button>
        </div>
    );
};

export default UseEffectSamples;
