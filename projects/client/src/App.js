import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import { Resetpassword } from "./pages/resetpassword";
import CekLogin from "./middleware/cekLogin";
function App() {
  
  return (
    <>
      <CekLogin>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/resetpassword/:token"
            element={<Resetpassword />}
          ></Route>
        </Routes>
      </CekLogin>
    </>
  );
}

export default App;
