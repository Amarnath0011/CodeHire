import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Jobs from "../pages/Jobs";
import Profile from "../pages/Profiles";
import Dashboard from "../pages/Dashboard";
import PostJob from "../pages/PostJob";
import MyJobs from "../pages/MyJobs";
import Applicants from "../pages/Applicants";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import Admin from "../pages/Admin";

import ProtectedRoute from "../components/ProtectedRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/my-jobs" element={<MyJobs />} />
      <Route path="/applicants/:jobId" element={<Applicants />} />
      <Route path="/admin" element={<Admin />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter"
        element={
          <ProtectedRoute>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;