import React, { createContext, useState, useEffect } from "react";



const defaultValue = {
  token: "",
  user: null,
  userIsLoggedin: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }) {
const [token, setToken] = useState("");
const [user, setUser] = useState(null);

useEffect(() => {
const tokenLocalStorage = localStorage.getItem("token");
const userIdLocalStorage = localStorage.getItem("id");
if (tokenLocalStorage && userIdLocalStorage) {
setToken(tokenLocalStorage);
setUser(userIdLocalStorage);
}
}, []);

const loginHandler = (tok, id) => {
setToken(tok);
setUser(id);
localStorage.setItem("token", tok);
localStorage.setItem("id", id);
};

const logoutHandler = () => {
setToken("");
setUser(null);
localStorage.removeItem("token");
localStorage.removeItem("id");
};

const userIsLoggedin = !!token;

const contextValue = {
token,
// user,
isLoggedIn: userIsLoggedin,
login: loginHandler,
logout: logoutHandler,
};

return (
<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
);
}

export default AuthContext;

