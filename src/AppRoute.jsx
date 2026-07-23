// import { BrowserRouter, Routes, Route } from "react-router-dom";


// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Dashboard from "./pages/Dashboard/Dashboard";
// //  import UploadResume from "./pages/UploadResume/UploadResume";
// //  import Payment from "./pages/Payment/Payment";
// //  import Premium from "./pages/Premium/Premium";
// //  import Profile from "./pages/Profile/Profile";
// //  import Admin from "./pages/Admin/Admin";

// function AppRoute() {
//     return (
//         <BrowserRouter>
//             <Routes>

//                  <Route path="/" element={<Home />} /> 

//                 <Route path="/" element={<Home/>}/>

//                 <Route path="/login" element={<Login />} />

//                 <Route path="/dashboard" element={<Dashboard />} />
// {/* 
//                 <Route path="/upload" element={<UploadResume />} />

//                 <Route path="/payment" element={<Payment />} />

//                 <Route path="/premium" element={<Premium />} />

//                 <Route path="/profile" element={<Profile />} />

//                 <Route path="/admin" element={<Admin />} />  */}

//             </Routes>

        
           
//         </BrowserRouter>
//     );
// }

// export default AppRoute;












// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Dashboard from "./pages/Dashboard/Dashboard";

// // import UploadResume from "./pages/UploadResume/UploadResume";
// // import Payment from "./pages/Payment/Payment";
// // import Premium from "./pages/Premium/Premium";
// // import Profile from "./pages/Profile/Profile";
// // import Admin from "./pages/Admin/Admin";

// function AppRoute() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Future Routes */}

//         {/* <Route path="/upload" element={<UploadResume />} />

//         <Route path="/payment" element={<Payment />} />

//         <Route path="/premium" element={<Premium />} />

//         <Route path="/profile" element={<Profile />} />

//         <Route path="/admin" element={<Admin />} /> */}

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoute;
















import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import UploadResume from "./pages/UploadResume/UploadResume";
import History from "./pages/History/History";
// import UploadResume from "./pages/UploadResume/UploadResume";
import Payment from "./pages/Payment/Payment";
import Premium from "./pages/Premium/Premium";
import ImproveResume from "./pages/ImproveResume/ImproveResume";
import Admin from "./pages/Admin/Admin";
import Navbar from "./componants/comon/Navbar/Navbar";

// import Profile from "./pages/Profile/Profile";

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
         
         <Route path="/upload" element={<UploadResume/>}/>
         <Route path="/premium" element={<Premium />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History/>}/>
          <Route path="/improve" element={<ImproveResume/>}/>
          <Route path="/admin" element={<Admin/>}/>
          

        {/* Future Routes */}

        {/* <Route path="/upload" element={<UploadResume />} />

       

        

        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<Admin />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;