// frontend/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Biblioteca para manipulação de cookies

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!Cookies.get("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Função de login
  const login = (token) => {
    console.log("Token recebido e salvo:", token);
    // Armazena o token no cookie (pode ser httpOnly no backend)
    Cookies.set("token", token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
    setIsLoggedIn(true);
  };

  // Função de logout
  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
