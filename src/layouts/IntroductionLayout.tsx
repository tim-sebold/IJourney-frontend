
import { Outlet } from "react-router-dom";

import Header from '../components/Layout/Header';
import Chatbot from "../components/Chatbot";

import LogoImage from "../assets/image/milestones/logo.png";

function IntroductionLayout() {
    return (
        <div className="flex flex-col min-h-screen  bg-gray-50 ">
            <Header />
            <div className="mt-[70px] mx-auto container font-ib-1 p-4">
                <div className="w-full">
                    <div className="mt-[70px] max-w-4xl container m-auto flex flex-col relative font-ib-1 p-10 bg-white shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-start">
                                <img src={LogoImage} alt="Logo" className="" />
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Chatbot />
        </div>

    )
}

export default IntroductionLayout