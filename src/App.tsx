import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Rcc } from "./pages/Rcc";
import { LosLogin } from "./pages/LosLogin";
import { Register } from "./pages/Register";
import { EditUser } from "./pages/EditUser";
import { ShowUser } from "./pages/ShowUser";
import { RoleUser } from "./pages/RoleUser";
import { UserDashBoard } from "./pages/UserDashBoard";
import { PostFileAsp } from "./pages/PostFileAsp";
import { SearchAndEditPage } from "./pages/SearchAndEditPage";
import { CreatePage } from "./pages/CreatePage";
import { ManageErrorMassage } from "./pages/ManageErrorMassage";
import { CreateErrorMassage } from "./pages/CreateErrorMassage";
import { Kmt2main } from "./pages/Kmt2main";
import { ManageMenuUser } from "./pages/ManageMenuUser";
import { Admin } from "./pages/Admin";
import { AdminLogin } from "./pages/AdminLogin";
import { TimeOut } from "./Function/TimeOut";
import { PostFileAspRPL } from "./pages/PostFileAspRPL";
import { UserDashBoardUser } from "./pages/UserDashBoardUser";
export default function App() {
  TimeOut();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/rcc" element={<Rcc />} />
      <Route path="/loslogin" element={<LosLogin />} />
      <Route path="/user/create" element={<Register />} />
      <Route path="/user/edit" element={<EditUser />} />
      <Route path="/user/delete" element={<ShowUser />} />
      <Route path="/role_user" element={<RoleUser />} />
      <Route path="/dashboard_user" element={<UserDashBoard />} />
      <Route path="/dashboard_user/:user" element={<UserDashBoardUser />} />
      <Route path="/page/asp" element={<PostFileAsp />} />
      <Route path="/page/asp/rpl" element={<PostFileAspRPL />} />
      <Route path="/page/search" element={<SearchAndEditPage />} />
      <Route path="/page/create" element={<CreatePage />} />
      <Route path="/massage/search" element={<ManageErrorMassage />} />
      <Route path="/massage/create" element={<CreateErrorMassage />} />
      <Route path="/menu/user" element={<ManageMenuUser />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/kmt2main" element={<Kmt2main />} />
    </Routes>
  );
}
