import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [userType, setUserType] = useState(() => localStorage.getItem("userType") || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setUserType(localStorage.getItem("userType")); // Atualiza o userType quando muda no localStorage
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token, userTypeFromBackend) => {
    console.log("Token recebido:", token);
    console.log("userType recebido:", userTypeFromBackend);
  
    localStorage.setItem("token", token);
    if (userTypeFromBackend) {
      localStorage.setItem("userType", userTypeFromBackend);
    } else {
      console.error("O userType é undefined! Verifique se está sendo retornado corretamente do backend.");
    }
    setIsLoggedIn(true);
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
