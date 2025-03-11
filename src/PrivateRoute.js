import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null para indicar carregamento
  const location = useLocation(); // Para obter a rota atual

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.setItem("redirectAfterLogin", location.pathname); // Salva a rota que o usuário tentou acessar
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Para ver a resposta do servidor
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
  }, [location.pathname]); // Dependência adicionada para verificar ao trocar de rota

  if (isAuthenticated === null) {
    return <div>Carregando...</div>; // Ou coloque um spinner se preferir
  }

  if (!isAuthenticated) {
    return <Navigate to="/pageLogin" replace />;
  }

  return children;
};

export default PrivateRoute;
