import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboardadmin from "./pages/dashboardadmin";
import Dashboardkasir from "./pages/dashboardkasir";
import { Resetpassword } from "./pages/resetpassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashbordadmin" element={<Dashboardadmin />}></Route>
        <Route path="/dashbordkasir" element={<Dashboardkasir />}></Route>
        <Route path="/resetpassword" element={<Resetpassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
