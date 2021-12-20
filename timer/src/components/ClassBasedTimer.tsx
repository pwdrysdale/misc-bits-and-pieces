import { Component } from "react";

interface StateProps {
    timer: number;
    running: boolean;
}

class ClassBasedTimer extends Component<{}, StateProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            timer: 0,
            running: false,
        } as StateProps;
    }

    private interval: any;

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.running) {
                this.setState({ timer: this.state.timer + 1 });
            }
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="timer-container">
                <h1>{this.state.timer / 10}</h1>

                <button
                    onClick={() =>
                        this.setState({ running: !this.state.running })
                    }
                >
                    {this.state.running ? "Stop" : "Start"}
                </button>

                <button onClick={() => this.setState({ timer: 0 })}>
                    Reset
                </button>
            </div>
        );
    }
}

export default ClassBasedTimer;
