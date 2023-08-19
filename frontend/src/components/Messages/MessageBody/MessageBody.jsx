import React from "react";
import Styles from "./MessageBody.module.scss";


const MessageBody = ({ title, description }) => {
  return (
    <div className={Styles.container}>
    <div className={Styles.containerTitle}>
    <h5 className={Styles.cardTitle}>titre : </h5>
    <p className={Styles.title}>{title}</p>
  </div>
  <div className={Styles.containerDescription}>
    <h5 className={Styles.cardDescription}>description :</h5>
    <p className={Styles.description}>{description}</p>
  </div>
  </div>
)
}

export default MessageBody