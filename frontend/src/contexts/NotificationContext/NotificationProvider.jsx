import React, { useState } from "react";
import NotificationContext from "./NotificationContext.jsx";

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(null);

  // Ajouter les notifications
  const addNotification = (notification) => {
    setNotifications(notification);
    setTimeout(() => {
      setNotifications(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
