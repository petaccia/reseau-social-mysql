import React from "react";
import Style from "./CardNotification.module.scss";

const CardNotification = ({ notification, handleDelete, index }) => {
  return (
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
  );
};

export default CardNotification;
