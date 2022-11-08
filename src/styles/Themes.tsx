export interface ThemeProps {
  background: string;
  color: string;
  colorB: string;
  dragging: string;
  card: string;
}

export const darkTheme: ThemeProps = {
  background: "#1f1a24",
  color: "#d3cbcb",
  colorB: "none",
  dragging: "#b7a7f3",
  card: "#120a16",
};

export const lightTheme: ThemeProps = {
  background: "#e6e1da",
  color: "#3f3d3d",
  colorB: "gray",
  dragging: "#8a8781",
  card: "#fafadc",
};
