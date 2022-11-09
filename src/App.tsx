import Header from "./components/Header/Header";
import Notepad from "./components/Notepad/Notepad";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Global";
import ThemeContext from "./context/ThemeContext";
import useThemeMode from "./hooks/useThemeMode";
import { lightTheme, darkTheme } from "./styles/Themes";
import Audio from "./components/Audio/Audio";
import Cat from "./components/Cat/Cat";
import styled from "styled-components";
import Footer from "./components/Footer/Footer";

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
          /> <Notepad />{" "}
          <AudioSection>
            <Audio />
            <Cat />
          </AudioSection>
          <Footer />
        </ThemeProvider>
      </ThemeContext>
    </>
  );
};

export default App;

const AudioSection = styled.div`
  @media only screen and (min-width: 368px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    padding: 20px;
  }

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1fr);
    grid-template-rows: 2fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
  }

  @media only screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
  }
`;
