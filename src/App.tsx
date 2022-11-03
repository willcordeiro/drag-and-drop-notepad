import Header from "./components/Header/Header";
import Notepad from "./components/Notepad/Notepad";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Global";
import ThemeContext from "./context/ThemeContext";
import useThemeMode from "./hooks/useThemeMode";
import { lightTheme, darkTheme } from "./styles/Themes";
import Audio from "./components/Audio/Audio";

const App: React.FC = () => {
  const { theme, themeToggler } = useThemeMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <ThemeContext>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Header
            themeMode={theme}
            themeToggler={themeToggler}
          /> <Notepad /> <Audio />
        </ThemeProvider>
      </ThemeContext>
    </>
  );
};

export default App;
