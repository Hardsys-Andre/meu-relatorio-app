import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/verify-token", {
          method: "POST",
          credentials: "include", // Envia os cookies automaticamente
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar o token:", error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    localStorage.setItem("redirectAfterLogin", location.pathname); // Salvar a URL para redirecionar após o login
    return <Navigate to="/pageLogin" replace />;
  }

  return children;
};

export default PrivateRoute;
