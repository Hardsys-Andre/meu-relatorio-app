import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Ajuste o caminho conforme necessário

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isLoggedIn) {
    localStorage.setItem("redirectAfterLogin", location.pathname); // Salva a URL para redirecionamento pós-login
    return <Navigate to="/pageLogin" replace />;
  }

  return children;
};

export default PrivateRoute;
