import React from 'react'
import Styles from './SelectMessage.module.scss';
import OptionMessageDate from "../../OPTIONSELECT/OptionMessageDate/OptionMessageDate.jsx";

const SelectMessage = ({ onSort, messages}) => {
  const sortByDate = (order) => {
    let sorted = [...messages];
    switch (order) {
    case "desc_createdAt":
      sorted.sort((a, b) => 
         new Date(b.createdAt) - new Date(a.createdAt));
        break;
        case "asc_createdAt":
      sorted.sort((a, b) => 
        
        new Date(a.createdAt) - new Date(b.createdAt));
        break;
      };
      onSort(sorted);
    }

  return (
    <div className={Styles.selectMessage}>
    <select 
    name="message"
    onChange={(e) => sortByDate (e.target.value)}
    className={Styles.selectMessage}>
      <option value="">Trier par</option>
      <option value="all">Tous les messages</option>
      <option value="messages">Messages en cours</option>
      <option value="sent">Messages envoyés</option>
      <option value="received">Messages reçus</option>
      <option value="read">Messages lus</option>
      <option value="unread">Messages non lus</option>
     <OptionMessageDate  />
      <option value="destination">Destinataire</option>
      <option value="expéditeur">Expéditeur</option>
    </select>
  </div>
  )
}

export default SelectMessage