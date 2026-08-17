import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Loader';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { loading, user } = useAuth();
    const location = useLocation();
    if (loading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
    return children;
}

export default ProtectedRoute;
