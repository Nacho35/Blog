"use client";
import "@fontsource/roboto";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Colors } from "./colors";

export default function Theme({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
      },
      tertiary: {
        main: Colors.tertiary,
      },
      alternative: {
        main: Colors.alternative,
      },
      info: {
        main: Colors.info,
      },
      danger: {
        main: Colors.danger,
      },
      warning: {
        main: Colors.warning,
      },
      dark: {
        main: Colors.dark,
      },
      light: {
        main: Colors.light,
      },
      muted: {
        main: Colors.muted,
      },
      border: {
        main: Colors.border,
      },
      inverse: {
        main: Colors.inverse,
      },
      shaft: {
        main: Colors.shaft,
      },
      white: {
        main: Colors.white,
      },
      black: {
        main: Colors.black,
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
