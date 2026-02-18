import { ArrowRightIcon } from 'lucide-react';
import { Avatar, AvatarImage } from '../../elements/avatar';
import { Button } from '../../elements/buttons/button';
import { Card, CardContent } from '../../elements/card';

import ImagePlayButton from '../../assets/image/play-btn.svg';
import ImageFrame from '../../assets/image/frame.svg';
import ImageAvatar from '../../assets/image/avatar/avatar3.jfif';

function Introduction() {
    return (
        <section className="flex flex-col gap-3 py-0 w-full">
            <div className="flex flex-col gap-3 px-12 py-16 w-full">
                <div className="flex flex-col justify-between gap-10">
                    <div className="flex flex-col items-center gap-3 relative w-full text-white">
                        <div className="flex items-center justify-center gap-3 px-6 py-3 relative bg-[#2ecc7199] rounded-tap-center border-2 border-solid border-[#5ee088]">
                            <div className="relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                Educational Service Video & Introduction
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 relative">
                        <div className="flex flex-col flex-1 gap-6">
                            <div className="flex flex-col relative w-full justify-center items-center">
                                <iframe className="aspect-video bg-[#D9D9D9] w-full h-auto rounded-2xl" src=""></iframe>
                                <img src={ImagePlayButton} alt="" className="absolute left-4 bottom-4 cursor-pointer hover:opacity-70" />
                            </div>
                        </div>
                        <div className="flex-col gap-6 flex-1 flex items-start">
                            <div className="flex-col items-start gap-6 w-full flex">
                                <div className="flex flex-col items-start gap-12 w-full">
                                    <div className="flex flex-col items-start gap-5 w-full">
                                        <h2 className="w-full whitespace-pre-wrap">
                                            <p className="text-[#fcb332] text-[40px] font-ib-4 font-bold w-full">
                                                &quot;IJourney: Path to Purpose&quot;&nbsp;
                                            </p>
                                            <p className="text-[#3498db] text-[40px] font-ib-4 font-bold w-full">
                                                will help you find the purpose.
                                            </p>
                                        </h2>
                                        <p className="">
                                            <span className="font-ib-3 font-normal text-[#313131] text-xl tracking-[0]">
                                                &quot;!Journey : A Path to Purpose&quot; is a workbook for
                                                a self-discovery course authored by&nbsp;
                                            </span>
                                            <span className="font-bold">
                                                Asha McMillian, LPC
                                            </span>
                                            <span className="font-ib-3 font-normal text-[#313131] text-xl tracking-[0]">
                                                . The course is designed to guide users on an
                                                introspective journey toward finding their purpose, framed
                                                as an explorer&#39;s journey.
                                            </span>
                                        </p>
                                    </div>

                                    <Card className="flex flex-col items-start relative w-full border border-solid border-[#e1e1e1] rounded-[0px_20px_20px_20px]">
                                        <CardContent className="flex flex-col items-start gap-5 pt-7 pb-10 px-7 w-full">
                                            <p className="self-stretch text-gray-700">
                                                <span className="font-bold">Asha Mcmillian</span>, a developmental psychologist, is professor
                                                of education and chairman of the Department of Education
                                                at Brown University. He is the author of The Moral Child.
                                            </p>
                                            <div className="flex items-center gap-5 w-full">
                                                <div className="flex flex-row items-start gap-4">
                                                    <img
                                                        className="flex-[0_0_auto]"
                                                        alt="Frame"
                                                        src={ImageFrame}
                                                    />
                                                    <div className="flex items-center justify-center flex-1 text-[#3498DB]">
                                                        Author - Asha McMillian
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <div className="inline-flex items-center absolute top-[-30px] left-[-5px]">
                                            <div className="inline-flex items-start gap-3 p-1 rounded-full overflow-hidden">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage
                                                        src={ImageAvatar}
                                                        alt="Author avatar"
                                                    />
                                                </Avatar>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="flex flex-col items-start gap-3 w-full">
                                    <Button className="flex w-full cursor-pointer gap-3.5 px-6 py-3 bg-[#ff6f61] items-center justify-center relative h-auto rounded-full hover:bg-[#ff6f61]/80 transition-colors">
                                        <span className="relative flex items-center justify-center font-ib-3 text-[16px] font-medium tracking-[1.2px] text-white">
                                            Introduce
                                        </span>
                                        <div className="inline-flex gap-3 p-2 items-center justify-center relative rounded-full bg-white">
                                            <ArrowRightIcon className="relative w-10 h-10 text-[#ff6f61]" />
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Introduction;