import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import LoadingSpinner from '../components/Loader';

/**
 * Keeps the admin pages out of reach of accounts without the admin claim. It is
 * a convenience, not the security boundary: `/api/admin/*` verifies the claim on
 * every request, so a forged client state gets an empty page and a 403.
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();

    if (loading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
}
