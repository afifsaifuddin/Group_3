import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import { Resetpassword } from "./pages/resetpassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/resetpassword/:token" element={<Resetpassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
