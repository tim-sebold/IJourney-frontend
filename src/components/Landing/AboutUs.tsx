function AboutUs() {
    return (
        <section className="flex items-start gap-3 py-0 w-full" id="introduce">
            <div className="flex flex-col items-start gap-3 px-6 py-20 flex-1">
                <div className="flex flex-col items-start gap-10 w-full">
                    <div className="flex flex-col items-center gap-[50px] w-full">
                        <div className="relative items-center text-white">
                            <div className="flex items-center justify-center gap-3 px-7 py-5 relative bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                                <div className="uppercase relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                    About Us
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex flex-1 relative cursor-pointer hover:scale-105 transition-all">
                                <img src="https://i.postimg.cc/Gmbcfd55/Untitled-design.png" alt="" className='rounded-none' />
                                <div className="absolute right-0 items-center justify-center gap-3 px-7 py-2 text-white">
                                    <div className="uppercase relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                        The Office
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="py-2 flex-1 text-black flex flex-col gap-6">
                                    <h5 className="font-medium">
                                        At iJourney, we believe everyone deserves the chance to understand themselves and move toward a future filled with purpose.
                                        Our program was created to offer thoughtful guidance, emotional support, and practical tools that help individuals of all ages connect with their values,
                                        strengths, and goals.
                                        From our home in Simpsonville, South Carolina, we're proud to serve people seeking growth, healing, or direction. <br />
                                        We are incredibly grateful to the Rotary Club of the Reedy River Greenville for their generous support of our iJourney program and the broader RIZE Prevention mission. Their commitment to community service empowers us to provide vital resources and mentorship to youth, helping them navigate life's challenges with resilience.
                                    </h5>
                                    <p>
                                        <span className="font-bold text-ib-1">You'll find our team at:</span>
                                        <span>218 New Neely Ferry Rd</span>
                                        <span>Mauldin, SC 29662</span>
                                    </p>
                                    <h5 className="font-bold italic">Together, let's discover the purpose that's been within you all along.</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs