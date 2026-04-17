import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Alert from "../components/Alert";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        const pendingCount = 3; // This would come from API
        if (pendingCount > 0) {
          setNotification({
            message: `You have ${pendingCount} pending registration approvals`,
            type: "warning",
          });
        }
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null;

  const adminMenuItems = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "Manage Students", icon: "👨‍🎓", path: "/students" },
    { name: "Manage Teachers", icon: "👩‍🏫", path: "/teachers" },
    { name: "Class Management", icon: "📚", path: "/classes" },
    { name: "Attendance Reports", icon: "📅", path: "/attendance-reports" },
    { name: "Registration Approvals", icon: "✅", path: "/registrations" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  const teacherMenuItems = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "My Students", icon: "👨‍🎓", path: "/my-students" },
    { name: "Mark Attendance", icon: "📝", path: "/attendance" },
    { name: "Enter Grades", icon: "📊", path: "/grades" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  const studentMenuItems = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "My Grades", icon: "📊", path: "/my-grades" },
    { name: "My Attendance", icon: "📅", path: "/my-attendance" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  const roleLabel =
    user.role === "admin"
      ? "Admin"
      : user.role === "teacher"
        ? "Teacher"
        : "Student";

  const menuItems =
    user.role === "admin"
      ? adminMenuItems
      : user.role === "teacher"
        ? teacherMenuItems
        : studentMenuItems;

  return (
    <div className="min-h-screen bg-slate-100">
      {notification && user.role === "admin" && (
        <Alert
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Navbar
        user={user?.name}
        role={roleLabel}
        onLogout={handleLogout}
        onMenuClick={toggleSidebar}
      />

      <Sidebar
        role={user.role}
        menuItems={menuItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="md:ml-64 pt-20 pb-10 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
