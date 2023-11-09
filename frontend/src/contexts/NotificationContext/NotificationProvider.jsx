import React, { useState } from "react";
import NotificationContext from "./NotificationContext.jsx";

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Ajouter les notifications
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  //   Supprimer une notification
  const deleteNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, deleteNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
