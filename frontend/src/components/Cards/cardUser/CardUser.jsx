import React from "react";
import styles from "./cardUser.module.scss";

import oceane from "../../../assets/users/oceane.jpg";
const CardUser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={oceane} alt="avatar" className={styles.img} />
          <p className={styles.textConnect}>
            connecté
            {/* {connected ? "connecté" : "non connecté>"} */}
          </p>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.name}>Oceane</p>
          <div
            className={styles.indicator}
            // style={{ backgroundColor: online ? "green" : "red" }}
          >
            test
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
