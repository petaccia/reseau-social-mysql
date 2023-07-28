import React, { useEffect } from "react";
import AuthContext from "./AuthContext";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { isAuthenticated: true };
    case LOGOUT:
      return { isAuthenticated: false };
    default:
      return state;
  }
}

const initialState = {
  isAuthenticated: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () =>
    dispatch({ type: LOGIN });
  const logout = () => 
    dispatch({ type: LOGOUT });

    useEffect(() => {
      const storedAuth = localStorage.getItem("Pas authentifié");
      if (storedAuth) {
        dispatch({ type: LOGIN });
      }
      localStorage.removeItem("Pas authentifié", state.isAuthenticated);
    }, [state.isAuthenticated]);

    return (
     <AuthContext.Provider value={{...state, login, logout}}> 
      {children}
     </AuthContext.Provider>
    );
  };



  export default AuthProvider;