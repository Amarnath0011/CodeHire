import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Jobs from "../pages/Jobs";
import Profiles from "../pages/Profiles";
import Dashboard from "../pages/Dashboard";
import PostJob from "../pages/PostJob";
import MyJobs from "../pages/MyJobs";
import Applicants from "../pages/Applicants";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import Admin from "../pages/Admin";
import ProtectedRoutes from "../Components/ProtectedRoutes";
import ApplyJob from "../pages/ApplyJob";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/profile" element={<Profiles />} />
      <Route path="/post-job" element={<ProtectedRoutes><PostJob /></ProtectedRoutes>} />
      <Route path="/job-posted" element={<ProtectedRoutes><MyJobs /></ProtectedRoutes>} />
      <Route path="/my-jobs" element={<ProtectedRoutes><MyJobs /></ProtectedRoutes>} />
      <Route path="/applicants/:jobId" element={<ProtectedRoutes><Applicants /></ProtectedRoutes>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
      <Route path="/recruiter" element={<ProtectedRoutes><RecruiterDashboard /></ProtectedRoutes>} />
    </Routes>
  );
}

export default AppRoutes;
