import React, { useEffect, useState } from "react";
import apiConnect from "../../../services/API/apiConnection.jsx";
import styles from "./HomeAdmin.module.scss";

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
  }, []);

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
            <tr className={styles.tabMembers}>
              <td className={styles.name}>{members.name}</td>
              <td className={styles.firstname}>{members.firstname}</td>
              <td className={styles.phone}>{members.phone}</td>
              <td className={styles.address}>{members.address}</td>
              <td className={styles.city}>{members.city}</td>
              <td className={styles.postalCode}>{members.postalCode}</td>
              <td className={styles.country}>{members.country}</td>
              <td className={styles.status}>{members.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeAdmin;
