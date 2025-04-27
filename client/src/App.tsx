import { Admin } from "@/components/admin/Admin";
import { CatchAll } from "@/components/CatchAll";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Login } from "@/components/login/Login";
import { Landing } from "@/components/landing/Landing";

import Navbar from "@/components/navbar/navbar";
import Search from "@/components/search/search";

// import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Signup } from "@/components/signup/Signup";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { BackendProvider } from "@/contexts/BackendContext";
// import { RoleProvider } from "@/contexts/RoleContext";
// import { CookiesProvider } from "react-cookie";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const App = () => {
  return (

            <Router>
              <Navbar />
              <Routes>

                <Route
                  path="/search"
                  element={<Search />}
                />
                <Route
                  path="/landing"
                  element={<Landing />}
                />
                {/* <Route
                  path="/signup"
                  element={<Signup />}
                /> */}
                {/* <Route
                  path="/dashboard"
                  element={<ProtectedRoute element={<Dashboard />} />}
                /> */}
                {/* <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      element={<Admin />}
                      allowedRoles={["admin"]}
                    />
                  }
                /> */}
                <Route
                  path="/"
                  element={
                    <Navigate
                      to="/login"
                      replace
                    />
                  }
                />
                {/* <Route
                  path="*"
                  element={<ProtectedRoute element={<CatchAll />} />}
                />*/}
              </Routes>
            </Router>

  );
};

export default App;
