import "./App.css";
import { Provider } from "./context/appContext";
import ColorSet from "./components/ColorSet";

function App() {
    return (
        <Provider>
            <h1>Just to see if we're up</h1>
            <ColorSet />
        </Provider>
    );
}

export default App;
