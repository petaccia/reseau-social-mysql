import React, { createContext, useState } from "react";

const defaultValue = {
  token: '',
  user : null,
  userIsLoggedin: false,
  login: (id) => {},
  logout : () => {},
  closeModal: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const loginHandler = (token, id) => {
    setToken(token);
    setUser(id)
  };

const logoutHandler = () => {
  setToken(null);
}

  const userIsLoggedin = !!token;
  
  
 
  
    const contextValue = {
      token: token,
      user: user,
      isLoggedIn: userIsLoggedin,
      login: loginHandler,
      logout: logoutHandler,
      closeModal: closeModal,
    };

    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
  };
// };
export default AuthContext;
