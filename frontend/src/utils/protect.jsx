import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedAdminRoute;
