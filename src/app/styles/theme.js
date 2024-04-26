"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Colors } from "./colors";
import "@fontsource/roboto";

export default function Theme({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
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
