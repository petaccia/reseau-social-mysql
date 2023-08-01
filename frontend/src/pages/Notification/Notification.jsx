import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationContext from "../../contexts/NotificationContext/NotificationContext.jsx";
import Style from "./Notification.module.scss";

const Notification = () => {
  const { notifications, addNotification, deleteNotification } =
    useContext(NotificationContext);

  useEffect(() => {
    addNotification({
      title: "test",
      Description: "Ceci est un test",
      date: new Date().toLocaleString(),
    });

    deleteNotification();
  }, []);

  const handleDelete = (index) => {
    deleteNotification(index);
  };

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Notification</h1>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className={Style.notificationCard}>
            <h2 className={Style.notificationTitle}>{notification.title}</h2>
            <p className={Style.notificationDescription}>
              {notification.Description}
            </p>
            <p className={Style.notificationDate}>{notification.date}</p>
            <div className={Style.buttonContainer}>
              <button
                className={Style.buttonDelete}
                onClick={() => handleDelete(index)}
              >
                supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={Style.noNotification}>Aucune notification</p>
      )}

      <Link to="/home" className={Style.button}>
        Retour
      </Link>
    </div>
  );
};
export default Notification;
