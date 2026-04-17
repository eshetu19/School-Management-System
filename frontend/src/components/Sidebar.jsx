const Sidebar = ({ role, isOpen, onClose, menuItems }) => {
  const getMenuItems = () => {
    const commonItems = [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Profile", path: "/profile" },
    ];
    const roleMenus = {
      admin: [
        { name: "Manage Students", path: "/students" },
        { name: "Manage Teachers", path: "/teachers" },
        { name: "Class Management", path: "/classes" },
        { name: "Attendance Reports", path: "/attendance-reports" },
        { name: "Registration Approvals", path: "/registrations" },
      ],
      teacher: [
        { name: "My Students", path: "/my-students" },
        { name: "Mark Attendance", path: "/attendance" },
        { name: "Enter Grades", path: "/grades" },
      ],
      student: [
        { name: "My Grades", path: "/my-grades" },
        { name: "My Attendance", path: "/my-attendance" },
      ],
    };
    return [...commonItems, ...(roleMenus[role?.toLowerCase()] || [])];
  };
  const items = menuItems || getMenuItems();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-16 left-0 z-50 h-[calc(100%-4rem)] w-72 transform overflow-y-auto rounded-r-[2rem] border-r border-slate-200/10 bg-slate-950/95 px-5 py-6 shadow-2xl shadow-slate-950/20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="mb-6 px-2">
          <h2 className="text-lg font-semibold text-slate-100">Navigation</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quick access to your tools
          </p>
        </div>
        <nav className="space-y-2">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className="flex items-center rounded-3xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900/80 hover:text-white"
            >
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;
