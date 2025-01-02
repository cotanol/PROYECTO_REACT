import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading/Loading";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        // Si se está cargando la información del usuario, mostrar un spinner
        return <Loading/>
    }

    if (!user) {
        // Si no hay usuario, redirigir a /login
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;