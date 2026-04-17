import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const TeacherLayout = () => {
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

  const teacherMenuItems = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "My Students", icon: "👨‍🎓", path: "/my-students" },
    { name: "Mark Attendance", icon: "📝", path: "/attendance" },
    { name: "Enter Grades", icon: "📊", path: "/grades" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user?.name}
        role="Teacher"
        onLogout={handleLogout}
        onMenuClick={toggleSidebar}
      />

      <Sidebar
        role="teacher"
        menuItems={teacherMenuItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="md:ml-64 pt-16">
        <div className="p-4 bg-blue-50 border-b border-blue-200 text-sm text-blue-700">
          📅 Today's Classes: Mathematics (10A) at 9:00 AM | Science (10B) at
          11:00 AM
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
