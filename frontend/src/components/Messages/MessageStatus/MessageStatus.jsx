import React, { useEffect } from "react";
import { toastInfo, toastNonLu } from "../../../services/Toastify/toastConfig.jsx";
import { BsFillCheckCircleFill, BsFillExclamationCircleFill } from "react-icons/bs";
import Styles from "./MessageStatus.module.scss";

const MessageStatus = ({ showStoast, check }) => {


  useEffect(() => {
    if (!showStoast) {
      return;
    }
    if (check) {
      toastInfo("Le message a été lu");
    } else {
      toastNonLu("Le message n'a pas été lu");
  }
  }, [check]);
  
  return (
    <div className={Styles.containerIconStatus}>
      {check === true ? (
         <BsFillCheckCircleFill className={Styles.iconStatusValid} /> 
      ) : (
        <BsFillExclamationCircleFill className={Styles.iconStatusInvalid} />
      )}
    </div>
  );
};

export default MessageStatus