import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from '@mui/material';
import MonteCarlo from '/MonteCarlo-Regular.ttf';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App.tsx";

const colors = {
  palette: {
    primary: {
      second: "#5E5E5E",
      main: "#000000",
    },
    secondary: {
      main: "#4CAF50",
      second: '#c8c849'
    },
    spacing: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'MonteCarlo';
          font-style: normal;
          font-display: swap;
          font-weight: 100;
          src: local('MonteCarlo'), local('MonteCarlo-Regular'), url(${MonteCarlo}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  typography: {
    h2: {
      fontWeight: 300,
      fontFamily: 'BlinkMacSystemFont',
    },
    h5: {
      fontWeight: 400,
      fontStyle: 'italic'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#555',
    },
  },
  
};

const theme = createTheme(colors);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
