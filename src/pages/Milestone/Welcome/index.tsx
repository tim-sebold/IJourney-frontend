import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../elements/buttons";
import leftArrow from "../../../assets/image/icon-2.svg";
import Image from "../../../assets/image/landing.jpg";
import ImageMia from "../../../assets/image/mia.png";

function Welcome() {
    const navigate = useNavigate();

    const Start = () => {
        navigate("/introduction");
    };

    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <div className="flex justify-center items-center min-h-screen">
                <div className="max-w-7xl w-full p-10">
                    <section className="text-white bg-custom shadow-2xl font-ib-1 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-3 hidden md:block md:flex-1">
                                <img src={Image} alt="widget-trigger-button" className="h-full" />
                            </div>
                            <div className="rounded-[70px_0px_0px_60px] flex-4 md:flex-1">
                                <div className="mx-auto flex flex-col justify-center items-center h-full max-w-[600px] px-4 py-10 sm:px-6 lg:px-10">
                                    <div className="flex justify-start my-4 w-full">
                                        <a href="/" className="flex gap-3 cursor-pointer hover:opacity-80">
                                            <img src={leftArrow} alt="" className="w-3" />
                                            <h5 className="text-ib-2 font-bold">Back</h5>
                                        </a>
                                    </div>
                                    <div className="flex justify-center items-center w-full h-full">
                                        <form className="p-6 text-center flex flex-col gap-10 w-full text-white">
                                            <div className="flex flex-col gap-6 text-center">
                                                <div className="flex justify-center font-bold animate-fade-in [animation-delay:0ms] opacity-0 wrap-anywhere">
                                                    <h1>Welcome</h1>
                                                </div>
                                                <h5 className="animate-fade-in [animation-delay:200ms] opacity-0">"A Path to Purpose" explains how to cultivate a sense of purpose in young people, defining purpose as a specific, 
                                                    measurable action plan that extends beyond the self. This path is built through real-world engagement, reflection, 
                                                    and support, not mere advice.</h5>
                                            </div>
                                            <div className="flex flex-col jusify-center items-center animate-fade-in [animation-delay:400ms] opacity-0">
                                                <img src={ImageMia} alt="" />
                                            </div>
                                            <div className="flex flex-col gap-8 text-center">
                                                <CustomButton onClickFunc={Start} title="Start" className="animate-fade-in [animation-delay:600ms] opacity-0 rounded-full" type="red"></CustomButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Welcome