// context/Authcontext.jsx
import React, { createContext, useState, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("clean-campus")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => useContext(AuthContext);
