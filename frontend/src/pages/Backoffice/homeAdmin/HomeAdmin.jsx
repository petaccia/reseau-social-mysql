import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiConnect from "../../../services/API/apiConnection.jsx";
import styles from "./HomeAdmin.module.scss";
import {
  toastSuccess,
  toastError,
} from "../../../services/Toastify/toastConfig.jsx";

const HomeAdmin = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [acceptedFamilyMembers, setAcceptedFamilyMembers] = useState([]);
  const [refusedFamilyMembers, setRefusedFamilyMembers] = useState([]);
  const userConnectedId = Cookies.get("userId");
  console.info(`userId in HomeAdmin in cookie: ${userConnectedId}`);

  // récupérer membres de la famille en attente de validation
  const getAllMemberFamily = async () => {
    try {
      const response = await apiConnect.get(
        `/adminfamily/user/pending/${userConnectedId}`
      );
      setFamilyMembers(response.data);
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
    }
  };

  // récupérer membres de la famille acceptés
  const getAllMemberFamilyAccepted = async () => {
    try {
      const response = await apiConnect.get(
        `/adminfamily/user/accepted/${userConnectedId}`
      );
      setAcceptedFamilyMembers(response.data);
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
    }
  };

  // récupérer membres de la famille refusés
  const getAllMemberFamilyRefused = async () => {
    try {
      const response = await apiConnect.get(
        `/adminfamily/user/refused/${userConnectedId}`
      );
      setRefusedFamilyMembers(response.data);
    } catch (error) {
      console.error(error);
      toastError("Une erreur est survenue");
    }
  };

  // Changement du statut de l'inscription d'un membre de la famille pour validation ou refus
  const changeStatus = async (userId, status) => {
    try {
      const response = await apiConnect.put(
        `/adminfamily/user/accept/${userId}`,
        {
          status,
        }
      );
      if (response.status === 200) {
        toastSuccess("La demande a été traitée avec succès");
        // Mettre à jour l'état des membres en attente
        const updatedFamilyMembers = familyMembers.filter(
          (member) => member.id !== userId
        );
        setFamilyMembers(updatedFamilyMembers);
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

  useEffect(() => {
    console.info(`userId in HomeAdmin in useEffect: ${userConnectedId}`);
    if (userConnectedId) {
      getAllMemberFamily();
      getAllMemberFamilyAccepted();
      getAllMemberFamilyRefused();
      // Rafraichir les données de la page toutes les 5 secondes sur le serveur
      const refresh = setInterval(() => {
        getAllMemberFamily();
        getAllMemberFamilyAccepted();
        getAllMemberFamilyRefused();
      }, 1000);
      // Arrêter le rafraichissement de la page quand l'utilisateur quitte l'écran
      return () => {
        clearInterval(refresh);
      };
    }
    toastError("Une erreur est survenue");
    return null;
  }, [userConnectedId]);
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
