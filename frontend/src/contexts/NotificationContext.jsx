import { createContext, useState, useContext, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newNotification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, newNotification]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const showSuccess = (message, duration = 3000) => {
    return addNotification(message, "success", duration);
  };

  const showError = (message, duration = 3000) => {
    return addNotification(message, "error", duration);
  };

  const showWarning = (message, duration = 3000) => {
    return addNotification(message, "warning", duration);
  };

  const showInfo = (message, duration = 3000) => {
    return addNotification(message, "info", duration);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};