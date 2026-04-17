import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const StudentLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null;
  const studentMenuItems = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "My Grades", icon: "📊", path: "/my-grades" },
    { name: "My Attendance", icon: "📅", path: "/my-attendance" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user?.name}
        role="Student"
        onLogout={handleLogout}
        onMenuClick={toggleSidebar}
      />

      <Sidebar
        role="student"
        menuItems={studentMenuItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="md:ml-64 pt-16">
        <div className="p-4 bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-700">
          📢 Upcoming: Mathematics Exam on March 25, 2025 | Science Project Due
          March 28, 2025
        </div>
        <Outlet />
      </main>
    </div>
  );
};
export default StudentLayout;
