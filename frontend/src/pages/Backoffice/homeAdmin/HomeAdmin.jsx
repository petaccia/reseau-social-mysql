import React, { useEffect, useState } from "react";
import apiConnect from "../../../services/API/apiConnection.jsx";
import styles from "./HomeAdmin.module.scss";
import {
  toastSuccess,
  toastError,
} from "../../../services/Toastify/toastConfig.jsx";

const HomeAdmin = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  useEffect(() => {
    // récupérer les membres de la famille
    const getFamilyMembers = async () => {
      try {
        const response = await apiConnect.get("/adminfamily/user/pending/");
        setFamilyMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getFamilyMembers();
    changeStatus();
  }, []);

  // Changement de couleur en fonction du statut
  const changeColor = (status) => {
    switch (status) {
      case "pending":
        return styles.pending;
      case "accepted":
        return styles.accepted;
      case "refused":
        return styles.refused;
      default:
        return styles.pending;
    }
  };

  // Changement du statut de la l'inscription d'un membre de la famille pour validation ou refuse
  const changeStatus = async (userId, status) => {
    try {
      const response = await apiConnect.put("/adminfamily/user/accept", {
        userId,
        status,
      });
      console.log(response.data);
      if (response.status === 200) {
        toastSuccess("La demande a été traitée avec succès");
      } else {
        toastError("Erreur lors de la validation de la demande");
      }
      return response;
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
      return error;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home Admin</h1>
      <h2 className={styles.subtitle}>Membres de la famille</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.name}>Nom</th>
            <th className={styles.firstname}>Prenom</th>
            <th className={styles.phone}>Téléphone</th>
            <th className={styles.address}>Adresse</th>
            <th className={styles.city}>Ville</th>
            <th className={styles.postalCode}>Code postal</th>
            <th className={styles.country}>Pays</th>
            <th className={styles.status}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((members) => (
            <tr className={styles.tabMembers} key={members.id}>
              <td className={styles.name}>{members.name}</td>
              <td className={styles.firstname}>{members.firstname}</td>
              <td className={styles.phone}>{members.phone}</td>
              <td className={styles.address}>{members.address}</td>
              <td className={styles.city}>{members.city}</td>
              <td className={styles.postalCode}>{members.postalCode}</td>
              <td className={styles.country}>{members.country}</td>
              <td className={styles.status}>{members.status}</td>
              <td className={`${styles.status} ${changeColor(members.status)}`}>
                <button
                  onClick={() => changeStatus(members.id, "accepté")}
                  className={styles.button}
                >
                  Accepter
                </button>
                <button
                  onClick={() => changeStatus(members.id, "refusé")}
                  className={styles.button}
                >
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeAdmin;
