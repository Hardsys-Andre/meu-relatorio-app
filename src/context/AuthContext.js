import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../server/api"; // Importando a API

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const data = await api.post("verify-token"); // Agora usando a API
        console.log("Dados recebidos no Frontend:", data); // Debug

        if (data.userProfile) {
          setIsLoggedIn(true);
          console.log(data.userProfile)
          setUser(data.userProfile);
        } else {
          Cookies.remove("token");
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        Cookies.remove("token");
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [location]);

  const login = (token, userData) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
    });

    setIsLoggedIn(true);
    setUser(userData);

    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath);
  };

  const logout = async () => {
    try {
      await api.logout(); // Chama a API para remover o cookie no backend
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  
    Cookies.remove("token"); // Apenas por garantia, remove do frontend
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("termsAccepted");
    navigate("/");
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
