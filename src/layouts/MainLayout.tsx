import { Suspense } from 'react';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import LoadingSpinner from '../components/Loader';
import RouteTransition from '../components/Loader/RouteTransition';

function Layout() {
    const { loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 ">
            {/* Chrome is for the screen only — printing the recap should yield the recap. */}
            <div className="recap-no-print">
                <Header />
            </div>
            <main className='relative'>
                <Suspense fallback={<LoadingSpinner />}>
                    <RouteTransition />
                </Suspense>
            </main>
            <div className="recap-no-print">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
