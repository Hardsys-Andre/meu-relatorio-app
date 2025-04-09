import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Ajuste o caminho conforme necessário

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">Verificando autenticação...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
