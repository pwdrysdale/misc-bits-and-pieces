import { Provider } from "react-redux";
import Colors from "./components/Colors";
import Counter from "./components/Counter";
import Container from "./components/Container";
import { store } from "./redux/redux";

function App() {
    return (
        <Provider store={store}>
            <Container>
                <h1>Redux Sample App</h1>
                <Counter />
                <Colors />
            </Container>
        </Provider>
    );
}

export default App;
