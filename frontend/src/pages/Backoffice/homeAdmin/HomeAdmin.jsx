import React, { useEffect, useState } from "react";
import apiConnect from "../../../services/API/apiConnection.jsx";
import styles from "./HomeAdmin.module.scss";
import {
  toastSuccess,
  toastError,
} from "../../../services/Toastify/toastConfig.jsx";
import { faItalic } from "@fortawesome/free-solid-svg-icons";

const HomeAdmin = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [acceptedFamilyMembers, setAcceptedFamilyMembers] = useState([]);
  const [refusedFamilyMembers, setRefusedFamilyMembers] = useState([]);

  // récupérer  membres de la famille en attente de validation
  const getAllMemberFamily = async () => {
    try {
      const response = await apiConnect.get("/adminfamily/user/pending");
      setFamilyMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
    }
  };

  // récupérer  membres de la famille acceptés
  const getAllMemberFamilyAccepted = async () => {
    try {
      const response = await apiConnect.get("/adminfamily/user/accepted");
      setAcceptedFamilyMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
    }
  };

  // récupérer  membres de la famille refusés
  const getAllMemberFamilyRefused = async () => {
    try {
      const response = await apiConnect.get("/adminfamily/user/refused");
      setRefusedFamilyMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
    }
  };

  useEffect(() => {
    getAllMemberFamily();
    getAllMemberFamilyAccepted();
    getAllMemberFamilyRefused();
  }, []);

  // Changement du statut de la l'inscription d'un membre de la famille pour validation ou refuse
  const changeStatus = async (userId, status) => {
    try {
      const response = await apiConnect.put(`/adminfamily/user/${userId}`, {
        status,
      });
      console.log(response.data);
      if (response.status === 200) {
        toastSuccess("La demande a été traitée avec succès");
      } else {
        toastError("Erreur lors de la validation de la demande");
      }
      return response.data;
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
      return error;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home Admin</h1>
      <h2 className={styles.subtitle}>Membres en attentes</h2>
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
              <td className={`${styles.name} ${styles.pending}`}>
                {members.name}
              </td>
              <td className={`${styles.firstname}  ${styles.pending}`}>
                {members.firstname}
              </td>
              <td className={`${styles.phone}  ${styles.pending}`}>
                {members.phone}
              </td>
              <td className={`${styles.address}  ${styles.pending}`}>
                {members.address}
              </td>
              <td className={`${styles.city}  ${styles.pending}`}>
                {members.city}
              </td>
              <td className={`${styles.postalCode}  ${styles.pending}`}>
                {members.postalCode}
              </td>
              <td className={`${styles.country}  ${styles.pending}`}>
                {members.country}
              </td>
              <td
                className={`${styles.status} ${
                  members.status === "accepté"
                    ? styles.refused
                    : styles.accepted
                }`}
              >
                {members.status === "en attente" &&
                  !acceptedFamilyMembers.includes(members.familyMembers) && (
                    <div className={styles.buttonContainer}>
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
                    </div>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.subtitle}>Membres acceptés</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.name}>Nom</th>
            <th className={styles.firstname}>Prénom</th>
            <th className={styles.phone}>Téléphone</th>
            <th className={styles.address}>Adresse</th>
            <th className={styles.city}>Ville</th>
            <th className={styles.postalCode}>Code Postal</th>
            <th className={styles.country}>Pays</th>
            <th className={styles.status}>Status</th>
          </tr>
        </thead>
        <tbody>
          {acceptedFamilyMembers.map((members) => (
            <tr className={styles.tabMembers} key={members.id}>
              <td className={`${styles.name} ${styles.pending}`}>
                {members.name}
              </td>
              <td className={`${styles.firstname}  ${styles.pending}`}>
                {members.firstname}
              </td>
              <td className={`${styles.phone}  ${styles.pending}`}>
                {members.phone}
              </td>
              <td className={`${styles.address}  ${styles.pending}`}>
                {members.address}
              </td>
              <td className={`${styles.city}  ${styles.pending}`}>
                {members.city}
              </td>
              <td className={`${styles.postalCode}  ${styles.pending}`}>
                {members.postalCode}
              </td>
              <td className={`${styles.country}  ${styles.pending}`}>
                {members.country}
              </td>
              <td
                className={`${styles.status} ${
                  members.status === "accepté"
                    ? styles.refused
                    : styles.accepted
                }`}
              >
                {members.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.subtitle}>Membres refusés</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.name}>Nom</th>
            <th className={styles.firstname}>Prénom</th>
            <th className={styles.phone}>Téléphone</th>
            <th className={styles.address}>Adresse</th>
            <th className={styles.city}>Ville</th>
            <th className={styles.postalCode}>Code Postal</th>
            <th className={styles.country}>Pays</th>
            <th className={styles.status}>Status</th>
          </tr>
        </thead>
        <tbody>
          {refusedFamilyMembers.map((members) => (
            <tr className={styles.tabMembers} key={members.id}>
              <td className={`${styles.name} ${styles.pending}`}>
                {members.name}
              </td>
              <td className={`${styles.firstname}  ${styles.pending}`}>
                {members.firstname}
              </td>
              <td className={`${styles.phone}  ${styles.pending}`}>
                {members.phone}
              </td>
              <td className={`${styles.address}  ${styles.pending}`}>
                {members.address}
              </td>
              <td className={`${styles.city}  ${styles.pending}`}>
                {members.city}
              </td>
              <td className={`${styles.postalCode}  ${styles.pending}`}>
                {members.postalCode}
              </td>
              <td className={`${styles.country}  ${styles.pending}`}>
                {members.country}
              </td>
              <td
                className={`${styles.status} ${
                  members.status === "refusé" ? styles.accepted : styles.refused
                }`}
              >
                {members.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeAdmin;
