import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

import CircularProgress from './components/Progress';
import { Badge } from '../../elements/badge';
import { Card, CardContent } from '../../elements/card';

import { milestoneData } from '../../datas/landingData';
import RotaryLogoImage from "../../assets/image/rotary-logo.png";

function Milestones() {
    const navigate = useNavigate();
    const { currentMilestoneChild } = useProgress();

    console.log(currentMilestoneChild);


    const goToMilestonePage = (milestoneId: number) => {
        navigate(`/milestones/milestone${milestoneId}/1`);
    }

    return (
        <section className="w-full bg-linear-to-br from-green-50 to-white py-12 lg:py-20" id='milestones'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col items-center">
                    <div className="relative items-center text-white">
                        <div className="flex items-center justify-center gap-3 px-[25px] py-5 relative bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                            <div className="uppercase relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                Milestones
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-ib-4">
                    {
                        milestoneData.milestones.map((milestone, index) => (
                            <Card
                                key={index}
                                onClick={() => goToMilestonePage(milestone.id)}
                                className="shadow-lg border-none hover:shadow-2xl transition-shadow p-2 bg-white cursor-pointer"
                            >
                                <CardContent className="p-6 space-y-2 flex flex-col justify-between h-full">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-[#5197ff] text-[16px] tracking-normal font-blod">
                                            {milestone.time}
                                        </span>
                                        <Badge
                                            className={`px-4 py-1 rounded-lg ${milestone.statusColor} border-0`}
                                        >
                                            <span className="font-black text-white text-base">
                                                {milestone.statusBadge}
                                            </span>
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <span className="font-bold text-[#4f556b] text-3xl text-center">
                                            {milestone.title}
                                        </span>
                                        <p className="font-bold text-[#4f556b] text-base leading-5">
                                            {milestone.description}
                                        </p>
                                    </div>
                                    <CircularProgress value={70} />
                                </CardContent>
                            </Card>
                        ))}
                    <div className="md:col-span-2 flex items-end">
                        <div className="px-4 py-6 flex flex-col justify-center items-end border-2 bg-ib-1 border-ib-1 rounded-2xl">
                            <div className="flex justify-end items-center p-6">
                                <p className='text-white text-xl'>We are incredibly grateful to the Rotary Club of the Reedy River Greenville for their generous support of our
                                    iJourney program and the broader RIZE Prevention mission. Their commitment to community service empowers us
                                    to provide vital resources and mentorship to youth, helping them navigate life's challenges with resilience.</p>
                            </div>
                            <div className="flex justify-end items-end">
                                <div className="md:w-1/2 bg-white rounded-3xl">
                                    <img src={RotaryLogoImage} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Milestones;