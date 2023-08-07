import React, { useEffect, useState } from "react";
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Styles from "./CardMessage.module.scss";
import apiConnect from "../../../services/API/apiConnection.jsx";

const CardMessage = ({ message }) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [date, setDate] = useState("");
  const [check, setCheck] = useState("");

  const formatDate = (inputDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(inputDate).toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiConnect.get(`user/${message.senderId}`);
        setSender(res.data);

        const res2 = await apiConnect.get(`user/${message.receiverId}`);
        setReceiver(res2.data);

        const res3 = await apiConnect.get(`message/${message.id}`);
        setDate(res3.data.createdAt);

        const res4 = await apiConnect.get(`message/${message.id}/`);
        setCheck(res4.data.status);
        // console.log(res4.data.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [message.senderId]);

  // Ouvrir les menu d'actions
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <div className={Styles.containerTitle}>
          <h5 className={Styles.cardTitle}>titre : </h5>
          <p className={Styles.title}>{message.title}</p>
        </div>
        <div className={Styles.containerDescription}>
          <h5 className={Styles.cardDescription}>description :</h5>
          <p className={Styles.description}>{message.description}</p>
        </div>
        <div className={Styles.containerContent}>
          <h6>Expéditeur:</h6>
          <p>
            {sender.firstname} {sender.lastname}
          </p>

          <h6>Destinataire:</h6>
          <p>
            {receiver.firstname} {receiver.lastname}
          </p>
          <h6>Date: </h6>
          <p>{formatDate(date)}</p>
        </div>
        <div className={Styles.containerStatus}>
          {check === true ? (
            <BsFillCheckCircleFill className={Styles.iconStatusValid} />
          ) : (
            <BsFillExclamationCircleFill className={Styles.iconStatusInvalid} />
          )}
        </div>
        <div className={Styles.containerToggle}>
          <BsThreeDotsVertical className={Styles.icon} onClick={toggleOpen} />
          {open && (
            <div className={Styles.containerButton}>
              <button className={Styles.button}>Répondre</button>
              <button className={Styles.button}>Modifier</button>
              <button className={Styles.button}>Supprimer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardMessage;
