import React, { useEffect, useState } from "react";
import styles from "./HomeAdmin.module.scss";
import apiConnect from "@services/API/apiConnection"; 

const HomeAdmin = () => {
const [familyMembers, setFamilyMembers] = useState([]);
const [recentPosts, setRecentPosts] = useState([]);
const [upcomingEvents, setUpcomingEvents] = useState([]);

useEffect(() => {
  // récupérer les membres de la famille
  const getFamilyMembers = async () => {
    try {
      const response = await apiConnect.get("/familymembers");
      setFamilyMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  // récupérer les publications récentes
  const getRecentPosts = async () => {
    try {
      const response = await apiConnect.get("/posts");
      setRecentPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // récupérer les événements à venir
  const getUpcomingEvents = async () => {
    try {
      const response = await apiConnect.get("/events");
      setUpcomingEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  getFamilyMembers();
  getRecentPosts();
  getUpcomingEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home Admin</h1>
      <h2 className={styles.subtitle}>Membres de la famille</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.name}>Nom</th>
            <th className={styles.email}>Email</th>
            <th className={styles.phone}>Téléphone</th>
            <th className={styles.address}>Adresse</th>
            <th className={styles.city}>Ville</th>
            <th className={styles.postalCode}>Code postal</th>
            <th className={styles.country}>Pays</th>
            <th className={styles.role}>Rôle</th>
            <th className={styles.status}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((members) => (
            <tr className={styles.tabMembers}>
              <td className={styles.name}>{members.name}</td>
              <td className={styles.email}>{members.email}</td>
              <td className={styles.phone}>{members.phone}</td>
              <td className={styles.address}>{members.address}</td>
              <td className={styles.city}>{members.city}</td>
              <td className={styles.postalCode}>{members.postalCode}</td>
              <td className={styles.country}>{members.country}</td>
              <td className={styles.role}>{members.role}</td>
              <td className={styles.status}>{members.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.subtitle}>Publications récentes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.titlePost}>Titre</th>
            <th className={styles.content}>Contenu</th>
            <th className={styles.date}>Date</th>
            <th className={styles.author}>Auteur</th>
          </tr>
        </thead>
        <tbody>
          {recentPosts.map((post) => (
            <tr className={styles.tabPublish}>
              <td className={styles.titlePost}>{post.title}</td>
              <td className={styles.content}>{post.content}</td>
              <td className={styles.date}>{post.date}</td>
              <td className={styles.author}>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.subtitle}>Événements à venir</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.titleEvent}>Titre</th>
            <th className={styles.date}>Date</th>
            <th className={styles.time}>Heure</th>
            <th className={styles.address}>Adresse</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event) => (
            <tr className={styles.tabEvent}>
              <td className={styles.titleEvent}>{event.title}</td>
              <td className={styles.date}>{event.date}</td>
              <td className={styles.time}>{event.time}</td>
              <td className={styles.address}>{event.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeAdmin;
