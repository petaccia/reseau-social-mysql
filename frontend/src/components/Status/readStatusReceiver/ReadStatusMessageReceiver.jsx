import React, { Children, useContext, useEffect, useRef } from 'react'
import Styles from "./ReadStatusMessageReceiver.module.scss"
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import { GoCheck } from "react-icons/go";

const ReadStatusMessageReceiver = ({ children , messageId}) => {
  const {markReadMessage} = useContext(MessageContext);
  
  useEffect(() => {
    markReadMessage();
    },
  []);
    
  const checkReadMessage = () => {
    switch (markReadMessage(messageId)) {
      case "sent":
        return <GoCheck className={Styles.iconStatusSent} />;
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
    <div>{children} {checkReadMessage()}</div>
  )
}

export default ReadStatusMessageReceiver