import RouteTransition from "../components/Loader/RouteTransition";

function AuthLayout() {
    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <div className="flex justify-center items-center min-h-screen">
                <div className="max-w-7xl w-full p-10">
                    <section className="text-white bg-custom shadow-2xl font-ib-1 overflow-hidden">
                        <RouteTransition />
                    </section>
                </div>
            </div>
        </main>
    )
}

export default AuthLayout;
