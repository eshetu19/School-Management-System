const RoleBasedMenu = ({ role, activePath, onNavigate }) => {
  const menuConfig = {
    admin: [
      { name: "Dashboard", icon: "📊", path: "/dashboard" },
      { name: "Manage Students", icon: "👨‍🎓", path: "/students" },
      { name: "Manage Teachers", icon: "👩‍🏫", path: "/teachers" },
      { name: "Class Management", icon: "📚", path: "/classes" },
      { name: "Attendance Reports", icon: "📅", path: "/attendance-reports" },
      { name: "Registration Approvals", icon: "✅", path: "/registrations" },
      { name: "Profile", icon: "👤", path: "/profile" }
    ],
    teacher: [
      { name: "Dashboard", icon: "📊", path: "/dashboard" },
      { name: "My Students", icon: "👨‍🎓", path: "/my-students" },
      { name: "Mark Attendance", icon: "📝", path: "/attendance" },
      { name: "Enter Grades", icon: "📊", path: "/grades" },
      { name: "Profile", icon: "👤", path: "/profile" }
    ],
    student: [
      { name: "Dashboard", icon: "📊", path: "/dashboard" },
      { name: "My Grades", icon: "📊", path: "/my-grades" },
      { name: "My Attendance", icon: "📅", path: "/my-attendance" },
      { name: "Profile", icon: "👤", path: "/profile" }
    ]
  };
  
  const menuItems = menuConfig[role] || menuConfig.student;
  
  return (
    <nav className="flex flex-col gap-1">
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => onNavigate(item.path)}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg transition w-full text-left
            ${activePath === item.path 
              ? "bg-blue-600 text-white" 
              : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default RoleBasedMenu;