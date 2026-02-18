import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <div className="flex justify-center items-center min-h-screen">
                <div className="max-w-7xl w-full p-10">
                    <section className="text-white bg-custom shadow-2xl font-ib-1 overflow-hidden">
                        <Outlet />
                    </section>
                </div>
            </div>
        </main>
    )
}

export default AuthLayout;
