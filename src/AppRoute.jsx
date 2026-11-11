import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import MockInterview from "./pages/MockInterview/MockInterview";
import UploadResume from "./pages/UploadResume/UploadResume";
import History from "./pages/History/History";
import Payment from "./pages/Payment/Payment";
import Premium from "./pages/Premium/Premium";
import ImproveResume from "./pages/ImproveResume/ImproveResume";
import Admin from "./pages/Admin/Admin";
import Navbar from "./componants/comon/Navbar/Navbar";

function AppRoute() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<History />} />
        <Route path="/improve" element={<ImproveResume />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
