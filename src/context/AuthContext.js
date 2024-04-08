import React, { createContext, useContext, useState } from "react";
import { Login } from "../apis/apis";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const login = async (user) => {
    const response = await Login(user);
    console.log(response);
    if (!response?.data?.error) {
      localStorage.setItem("AccessToken", response?.data?.token);
      setUser(true);
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    localStorage.clear();
    setUser(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
