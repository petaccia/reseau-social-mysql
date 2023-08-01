import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationContext from "../../contexts/NotificationContext/NotificationContext.jsx";
import Style from "./Notification.module.scss";
import CardNotification from "../../components/Cards/cardNotification/CardNotification.jsx";

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
          <CardNotification
            key={index}
            notification={notification}
            handleDelete={deleteNotification}
            index={index}
          />
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
