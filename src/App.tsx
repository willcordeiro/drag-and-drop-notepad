import "./App.css";
import { StyleGlobal } from "./styles/Global";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
      <StyleGlobal />
    </div>
  );
}

export default App;
