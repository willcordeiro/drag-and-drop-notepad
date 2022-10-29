export interface ThemeProps {
  background: string;
  color: string;
  colorB: string;
  dragging: string;
}

export const darkTheme: ThemeProps = {
  background: "#1f1a24",
  color: "#ffffff",
  colorB: "#f2e7fe",
  dragging: "#b37bf7",
};

export const lightTheme: ThemeProps = {
  background: "",
  color: "#3f3d3d",
  colorB: "lightgrey",
  dragging: "#ece8e1",
};
