import "./App.css";
import Header from "./components/Header/Header";
import Notepad from "./components/Notepad/Notepad";

const App: React.FC = () => {
  return (
    <>
      <Header /> <Notepad />
    </>
  );
};

export default App;
