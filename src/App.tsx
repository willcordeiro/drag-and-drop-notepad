import "./App.css";
import Notepad from "./components/Notepad/Notepad";
import { useStateContext } from "./context/DragDropContextProvider";

const App: React.FC = () => {
  return <Notepad />;
};

export default App;
