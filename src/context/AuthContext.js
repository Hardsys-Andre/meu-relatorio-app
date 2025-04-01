import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();  // Obtém a localização atual da navegação
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/verify-token", {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();
        console.log("Dados recebidos no Frontend:", data); // <-- Debug

        if (response.ok && data.userProfile) {
          setIsLoggedIn(true);
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
  }, [location]); // O efeito agora será chamado sempre que a localização mudar

  const login = (token, userData) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
    });
  
    setIsLoggedIn(true);
    setUser(userData);
  
    // Obtém a URL salva no localStorage ou usa '/' como fallback
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin"); // Remove após o redirecionamento
    navigate(redirectPath);
  };
  

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("termsAccepted");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
