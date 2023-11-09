import React, { useContext } from "react";
import Styles from "./SelectUser.module.scss";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const SelectUser = ({ onChange, value }) => {
  const { users } = useContext(UserContext);
  return (
    <select
      value={value}
      onChange={onChange}
      className={Styles.selectReceiverId} // Vous pouvez ajouter des styles spécifiques pour ce className dans votre SCSS
    >
      <option value="" disabled>
        Choisir un destinataire
      </option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.firstname} {user.lastname}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;
