import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/login/Login.jsx";
import Navbar from "./components/Navbar";
import LeftBar from "./components/LeftBar.jsx";
import RightBar from "./components/RightBar.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import NewPassword from "./pages/newPassword/NewPassword.jsx";
import VerifyAccount from "./pages/verifiyAccount/VerifyAccount.jsx";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "./context/authentification/AuthContext";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  //if user did not logout redirect to home no need to log again
  const { user } = useContext(AuthContext);
  console.log("app", user);
  const Layout = () => {
    return (
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Box sx={{ display: "flex" }}>
          <LeftBar setMode={setMode} mode={mode} />
          <Outlet />
          <RightBar />
        </Box>
      </Box>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Login />;
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/profile/:id",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verifyAccount/:id",
      element: <VerifyAccount />,
    },
    {
      path: "/newPassword/:id",
      element: <NewPassword />,
    },
  ]);
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Box>
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
