import React from "react";
import "./App.css";
import ClassBasedTimer from "./components/ClassBasedTimer";
import Timer from "./components/Timer";
import UseEffectSamples from "./UseEffectSamples";

function App() {
    return (
        <div className="container">
            <Timer />
            <ClassBasedTimer />
            <UseEffectSamples />
        </div>
    );
}

export default App;
