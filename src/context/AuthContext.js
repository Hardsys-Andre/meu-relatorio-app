import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${API_URL}/verify-token`, {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          Cookies.remove("token");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        Cookies.remove("token");
        setIsLoggedIn(false);
      }
    };

    validateToken();
  }, []);

  const login = (token) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
    });
    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    localStorage.removeItem("termsAccepted");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
