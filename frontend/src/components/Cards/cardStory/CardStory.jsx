import React from "react";
import styles from "./cardStory.module.scss";
import oceane from "../../../assets/users/oceane.jpg";

// Fonction pour ecrire la 1ère lettre d'un nom en majuscule
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const CardStory = ({ image, date, author }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={image} alt="avatar" className={styles.img} />
        </div>
        <div className={styles.containerContent}>
          <div className={styles.cardContent}>
            <img src={oceane} alt="avatar" className={styles.imgUser} />
            <p className={styles.author}>{capitalizeFirstLetter(author)}</p>
          </div>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default CardStory;
