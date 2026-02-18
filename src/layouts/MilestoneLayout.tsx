import { Outlet } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Chatbot from '../components/Chatbot';

function MilestoneLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 ">
            <Header />
            <div className="mt-[70px] lg:mx-auto lg:container font-ib-1 p-4">
                <div className={`lg:flex lg:justify-between gap-10`}>
                    <Sidebar />
                    <main className='relative w-full lg:ml-90 mt-10 pr-2 pl-18 lg:px-8 py-10 px-10'>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Chatbot />
        </div>
    );
};

export default MilestoneLayout;