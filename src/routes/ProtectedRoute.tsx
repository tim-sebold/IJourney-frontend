import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Loader';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    
    return children;
}

export default ProtectedRoute;