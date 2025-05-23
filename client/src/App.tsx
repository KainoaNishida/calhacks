import { Admin } from "@/components/admin/Admin";
import { CatchAll } from "@/components/CatchAll";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Login } from "@/components/login/Login";
import { Signup } from "@/components/signup/Signup";
import Landing  from "@/components/landing/Landing";
import Navbar from "@/components/navbar/navbar";
import Search from "@/components/search/search";
import { BackendProvider } from "@/contexts/BackendContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import '@fontsource/roboto';

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const theme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#111827',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto"',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackendProvider>
        <Router>
          <Routes>
            <Route path="/search" element={
              <>
                <Navbar />
                <Search />
              </>
            } />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Navigate to="/landing" />} />
          </Routes>
        </Router>
      </BackendProvider>
    </ThemeProvider>
  );
};

export default App;
