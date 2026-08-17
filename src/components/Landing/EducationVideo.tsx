function Video() {
    return (
        <section className="flex items-start gap-3 py-0 w-full" id="video">
            <div className="flex flex-col items-start gap-3 px-6 flex-1">
                <div className="flex flex-col items-start gap-10 w-full">
                    <div className="flex flex-col items-center gap-20 w-full bg-[#f0f0f0] py-20 relative">
                        <div className="w-full flex flex-col gap-6 justify-center items-center z-3">
                            <div className="relative items-center text-white">
                                <div className="flex items-center justify-center gap-3 px-[25px] py-5 relative bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                                    <div className="uppercase relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                        Purpose of iJourney
                                    </div>
                                </div>
                            </div>
                            <p className='text-center'>At <span className="font-bold text-red-500 uppercase">Rize</span>&nbsp;<span className="font-bold text-green-500">Prevention</span>, we want to inspire and equip you to make smart choices and have a strong purpose on
                                the path in lifee</p>
                        </div>
                        <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4 z-3">
                            <div className="flex flex-col relative w-full justify-center items-center">
                                <iframe
                                    src="https://viddler.com/embed/player?id=16541&color=default"
                                    width="100%"
                                    className="aspect-video w-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    title="iJOURNEY Educational Program: Enhancing Student Experience">
                                </iframe>
                            </div>
                        </div>
                        <div className="w-full bg-custom absolute bottom-0 left-0 h-2/5"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Video
