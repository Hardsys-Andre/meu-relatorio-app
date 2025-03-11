import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redireciona para o login se não estiver autenticado
    return <Navigate to="/pageLogin" replace />;
  }

  return children;
};

export default PrivateRoute;
