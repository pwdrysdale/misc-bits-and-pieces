import React from "react";

const Timer = () => {
    const [timer, setTimer] = React.useState(0);
    const [running, setRunning] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                setTimer(Math.round(timer + 1));
            }
        }, 100);
        return () => clearInterval(interval);
    }, [timer, running]);

    return (
        <div className="timer-container">
            <h1>{timer / 10}</h1>

            <button onClick={() => setRunning(!running)}>
                {running ? "Stop" : "Start"}
            </button>

            <button onClick={() => setTimer(0)}>Reset</button>
        </div>
    );
};

export default Timer;
