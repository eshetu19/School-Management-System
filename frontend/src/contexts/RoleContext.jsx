import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const rolePermissions = {
    admin: ["view_all", "create_student", "edit_student", "delete_student", "create_teacher", "edit_teacher", "delete_teacher", "manage_classes", "view_reports", "approve_registrations"],
    teacher: ["view_my_students", "mark_attendance", "enter_grades", "view_reports"],
    student: ["view_my_grades", "view_my_attendance", "edit_my_profile"]
  };

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setPermissions(rolePermissions[user.role] || []);
    } else {
      setRole(null);
      setPermissions([]);
    }
  }, [user]);

  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  const isAdmin = () => role === "admin";
  const isTeacher = () => role === "teacher";
  const isStudent = () => role === "student";

  return (
    <RoleContext.Provider value={{ role, permissions, hasPermission, isAdmin, isTeacher, isStudent }}>
      {children}
    </RoleContext.Provider>
  );
};