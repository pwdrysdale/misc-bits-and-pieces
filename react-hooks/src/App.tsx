import logo from "./logo.svg";
import "./App.css";
import useGetData from "./hooks/getData";

function App() {
    useGetData("https://jsonplaceholder.typicode.com/tos/1", {
        onCompleted: (data): void => console.log("In the onCompleted!: ", data),
        onError: (error): void =>
            console.error("In the onError!: ", error.message),
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
