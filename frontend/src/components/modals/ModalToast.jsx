// Toast.jsx

import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import {BiErrorCircle, BiCheckCircle} from 'react-icons/bi';
import styles from './modalToast.module.scss';

export default function Toast({ message, type }) {

  const [isShown, setIsShown] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setIsShown(true);
    setAnimationKey(prevKey => prevKey + 1);

    const timer = setTimeout(() => {
      setIsShown(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className={`${styles.toast} ${isShown ? styles.show : ''} ${type === 'success' ? styles.success : styles.error}`}>
      <div className={styles.toastIcon}>
        {type === 'success' ? <BiCheckCircle /> : <BiErrorCircle />}
      </div>
      
      <p className={styles.toastMessage}>{message}</p>
      
      <MdClose 
        className={styles.closeButton}
        onClick={() => setIsShown(false)}  
      />

      <div key={animationKey} className={`${styles.progressBar} ${type === 'success' ? styles.successBar : styles.errorBar}`}></div> 
    </div>
  )
}
