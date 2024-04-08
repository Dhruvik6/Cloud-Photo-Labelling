import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import VerifyLogin from "./components/Verify/VerifyLogin";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <ToastContainer />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyLogin />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
