import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./Themes";

type GlobalThemeProps = {
  theme: ThemeProps;
};

const GlobalStyles: any = createGlobalStyle`
  body {
  background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  }
  
  `;

export default withTheme(GlobalStyles);
