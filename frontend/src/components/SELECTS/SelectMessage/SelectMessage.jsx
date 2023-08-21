import React from 'react'
import Styles from './SelectMessage.module.scss';

const SelectMessage = () => {
  return (
    <div className={Styles.selectMessage}>
    <select name="message" className={Styles.selectMessage}>
      <option value="">Trier par</option>
      <option value="all">Tous les messages</option>
      <option value="messages">Messages en cours</option>
      <option value="sent">Messages envoyés</option>
      <option value="received">Messages reçus</option>
      <option value="date">Date plus récente</option>
      <option value="date">Date plus ancienne</option>
      <option value="destination">Destinataire</option>
      <option value="expéditeur">Expéditeur</option>
    </select>
  </div>
  )
}

export default SelectMessage