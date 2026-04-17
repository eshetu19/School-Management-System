import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "./RoleBasedRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import StudentLayout from "../layouts/StudentLayout";

// Auth Pages
import Login from "../pages/Login";
import RegistrationPortal from "../pages/RegistrationPortal";

// Admin Pages
import Dashboard from "../pages/Dashboard";
import ManageStudents from "../pages/ManageStudents";
import StudentDetails from "../pages/StudentDetails";
import TeacherManagement from "../pages/TeacherManagement";
import ClassManagement from "../pages/ClassManagement";
import AttendanceReports from "../pages/AttendanceReports";
import RegistrationApprovals from "../pages/RegistrationApprovals";
import Profile from "../pages/Profile";

// Teacher Pages
import MyStudents from "../pages/MyStudents";
import Attendance from "../pages/Attendance";
import Grades from "../pages/Grades";

// Student Pages
import MyGrades from "../pages/MyGrades";
import MyAttendance from "../pages/MyAttendance";

// Error Page
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPortal />
              </PublicRoute>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["admin", "teacher", "student"]}>
                <Dashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageStudents />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/student-details/:id"
            element={
              <RoleBasedRoute allowedRoles={["admin", "teacher"]}>
                <StudentDetails />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/teachers"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <TeacherManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ClassManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/attendance-reports"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AttendanceReports />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/registrations"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <RegistrationApprovals />
              </RoleBasedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Teacher Routes */}
        <Route
          element={
            <PrivateRoute>
              <TeacherLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/my-students"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <MyStudents />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <Attendance />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <Grades />
              </RoleBasedRoute>
            }
          />
        </Route>

        {/* Student Routes */}
        <Route
          element={
            <PrivateRoute>
              <StudentLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/my-grades"
            element={
              <RoleBasedRoute allowedRoles={["student"]}>
                <MyGrades />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/my-attendance"
            element={
              <RoleBasedRoute allowedRoles={["student"]}>
                <MyAttendance />
              </RoleBasedRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
