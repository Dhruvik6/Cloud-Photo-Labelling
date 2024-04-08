import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import VerifyLogin from "./components/Verify/VerifyLogin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyLogin />} />
      </Routes>
    </>
  );
}

export default App;
