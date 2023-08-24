import React, { useEffect } from 'react'
import Styles from "./ReadStatusMessageReceiver.module.scss"
import { GoCheck } from "react-icons/go";

const ReadStatusMessageReceiver = ({ messageStatus }) => {

  useEffect(() => {
    // checkReadMessage();
  }, []);
    
  const checkReadMessage = () => {
    switch (messageStatus) {
      case "sent":
        return <GoCheck className={Styles.iconStatusSent} />;
        case "inProgress":
          return (
            <>
              <GoCheck className={Styles.iconStatusInProgress} />
              <GoCheck className={Styles.iconStatusInProgress} />
            </>
          )   

        case "delivered":
          return (
            <>
              <GoCheck className={Styles.iconStatusDelivered} />
              <GoCheck className={Styles.iconStatusDelivered} />
            </>
          );
          case "read":
            return (
              <>
                <GoCheck className={Styles.iconStatusRead} />
                <GoCheck className={Styles.iconStatusRead} />
                </>
            );
      default:
        return null;
    }
  }

 
    return (
    <div className={Styles.containerReadStatus}>
       {checkReadMessage()}</div>
  )
}

export default ReadStatusMessageReceiver