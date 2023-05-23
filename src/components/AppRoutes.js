import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import { App } from "./App";
import { Login } from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { Register } from "./Register";

function AppRoutes() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");

      api.me(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      });
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <App handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
    </Routes>
  );
}

export default AppRoutes;
