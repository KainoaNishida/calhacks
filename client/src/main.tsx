import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App.tsx";

const colors = {
  palette: {
    primary: {
      main: "#245F3E",
      second: "#AED2A7",
    },
    secondary: {
      main: "#FFFFFF",
    },
    spacing: 8,
  },
};

const theme = createTheme(colors);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
