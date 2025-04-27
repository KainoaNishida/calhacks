import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App.tsx";

const themeOptions = {
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#F9FCF6",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF"
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none' as const,
    },
  },
  spacing: 8,
};

const theme = createTheme(themeOptions);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);