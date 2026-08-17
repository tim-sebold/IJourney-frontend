import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Chatbot from '../components/Chatbot';
import RouteTransition from '../components/Loader/RouteTransition';
import LoadingSpinner from '../components/Loader';
import { Suspense, useEffect, useState } from 'react';
import useIsDesktop from '../hooks/useIsDesktop';

const SIDEBAR_STORAGE_KEY = 'ijourney:milestone-sidebar-collapsed';

function MilestoneLayout() {
    const isDesktop = useIsDesktop();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (window.innerWidth < 1024) return true;
        return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
    });

    useEffect(() => {
        if (!isDesktop) setSidebarCollapsed(true);
    }, [isDesktop]);

    const toggleSidebar = () => {
        setSidebarCollapsed((collapsed) => {
            const next = !collapsed;
            if (isDesktop) window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
            return next;
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 ">
            <Header />
            <div className="mt-[70px] lg:mx-auto lg:container font-ib-1 p-4">
                <div className={`lg:flex lg:justify-between gap-10`}>
                    <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
                    <main className={`relative w-full mt-10 pr-2 py-10 px-10 transition-[margin,padding] duration-300 ease-in-out ${sidebarCollapsed ? 'pl-18 lg:ml-16 lg:px-8' : 'pl-18 lg:ml-90 lg:px-8'}`}>
                        <Suspense fallback={<LoadingSpinner />}>
                            <RouteTransition />
                        </Suspense>
                    </main>
                </div>
            </div>
            <Chatbot />
        </div>
    );
};

export default MilestoneLayout;
