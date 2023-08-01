import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import { Resetpassword } from "./pages/resetpassword";
<<<<<<< Updated upstream
=======
import CekLogin from "./middleware/cekLogin";
import Admin from "./component/admin";
import Produk from "./component/produk";
>>>>>>> Stashed changes

function App() {
  return (
    <>
<<<<<<< Updated upstream
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/resetpassword/:token" element={<Resetpassword />}></Route>
      </Routes>
=======
      <CekLogin>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/resetpassword/:token"
            element={<Resetpassword />}
          ></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/produk" element={<Produk />}></Route>
        </Routes>
      </CekLogin>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
