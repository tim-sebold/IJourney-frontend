import { Card, CardContent } from '../../elements/card';

import { featureData } from '../../datas/landingData';
import ImageBook from '../../assets/image/book.png';
function Features() {
    return (
        <section className="flex items-start gap-3 py-0 w-full" id="introduce">
            <div className="flex flex-col items-start gap-3 px-6 pt-20 flex-1">
                <div className="flex flex-col items-start gap-10 w-full">
                    <div className="flex flex-col items-center gap-[50px] w-full">
                        <div className="relative items-center text-white">
                            <div className="flex items-center justify-center gap-3 px-[25px] py-5 relative bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                                <div className="uppercase relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                    Introduction
                                </div>
                            </div>
                        </div>
                        <p className="flex-1 font-ib-3 font-normal text-gray-700 text-xl text-center tracking-[0] leading-6 md:w-2/3">
                            <span className="font-bold">
                                &quot;iJourney : A Path To Purpose&quot;
                            </span>
                            <span className="font-ib-3 font-normal text-md tracking-[0]">
                                &nbsp;is a self-discovery course authored by <span className='font-bold'>Asha McMillan, LPC.</span> The course is designed to guide students on an introspective journey toward finding their purpose, framed as an explorer's journey.
                            </span>
                        </p>
                        <div className="flex-col items-start gap-6 w-full flex">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-10 p-5 w-full">
                                {
                                    featureData.featureCards.map((card, index) => (
                                        <Card
                                            key={index}
                                            className="bg-light-background rounded-none flex flex-col h-full bg-white shadow-[1px_4px_4px_1px_rgba(0,0,0,0.25)] border-none hover:shadow-lg transition-shadow"
                                        >
                                            <CardContent className="p-6 flex flex-col items-center justify-center sm:p-8 space-y-5 h-full">
                                                <img
                                                    className="w-20"
                                                    alt={card.title}
                                                    src={card.image}
                                                />

                                                <div className="gap-3 flex flex-col items-center w-full">
                                                    <p className="self-stretch font-ib-4 font-bold text-gray-800 text-lg text-center text-[18px] sm:text-[24px] md:text-[28px] tracking-[0]">
                                                        {card.title}
                                                    </p>

                                                    <h5 className="self-stretch font-ib-4 font-normal text-gray-600 text-sm text-center tracking-[0] leading-[normal]">
                                                        {card.description}
                                                    </h5>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                        <div className="">
                            <img src={ImageBook} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
