import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./Themes";

type GlobalThemeProps = {
  theme: ThemeProps;
};

const GlobalStyles: any = createGlobalStyle`
  body {
  background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Charlie Display", sans-serif;
  }

  
  `;

export default withTheme(GlobalStyles);
