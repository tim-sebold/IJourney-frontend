import { useNavigate } from 'react-router-dom';

import { Badge } from '../../elements/badge';
import { Card, CardContent } from '../../elements/card';

import { milestoneData } from '../../datas/landingData';

function Milestones() {
    const navigate = useNavigate();

    const goToMilestonePage = (milestoneId: number) => {
        navigate(`/milestones/${milestoneId}/1`);
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
                                    <div className="animate-fade-in opacity-0 [--animation-delay:200ms] flex justify-center items-center pt-10">
                                        <div className="w-[250px] h-[316px] relative">
                                            <div className="flex flex-col items-center justify-center absolute top-[calc(50.00%-105px)] left-[calc(50.00%-36px)]">
                                                <div className="flex items-start relative">
                                                    <div className="relative w-fit font-['Roboto',Helvetica] font-medium text-[62px] tracking-[0] leading-[normal] whitespace-nowrap">
                                                        00
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute w-[9.60%] h-[13.29%] top-[14.87%] left-[69.20%] flex items-center justify-center font-['Roboto',Helvetica] font-medium text-neutral-1 text-[32px] text-center tracking-[0] leading-[42.0px] whitespace-nowrap">
                                                %
                                            </div>

                                            <div className="absolute top-0 left-0 w-[250px] h-[250px]">
                                                <div className="absolute top-0 left-0 w-[250px] h-[250px]">
                                                    <div className="absolute top-[124px] left-[124px] w-px h-px bg-[#f6a200] rounded-[0.5px]" />

                                                    <div className="absolute top-[124px] left-[124px] w-px h-px bg-[#7b61ff] rounded-[0.5px]" />
                                                </div>

                                                <div className="absolute top-0 left-0 w-[250px] h-[250px]">
                                                    <div className="absolute top-[124px] left-[124px] w-px h-px bg-[#0080f6] rounded-[0.5px]" />

                                                    <div className="bg-[#fff50d] absolute top-[124px] left-[124px] w-px h-px rounded-[0.5px]" />
                                                </div>

                                                <div className="absolute top-0 left-0 w-[250px] h-[250px]">
                                                    <div className="absolute top-[124px] left-[124px] w-px h-px bg-[#c50606] rounded-[0.5px] rotate-[-90.77deg]" />

                                                    <div className="bg-[#8de300] rotate-[-90.77deg] absolute top-[124px] left-[124px] w-px h-px rounded-[0.5px]" />
                                                </div>
                                            </div>

                                            <div className="absolute top-0 left-0 w-[250px] h-[250px] flex bg-[url(https://c.animaapp.com/mhc1tscrMoE84t/img/ring-1.svg)] bg-position-[100%_100%]">
                                                <div className="mt-[133.0px] w-[197.94px] h-[37.99px] ml-[26.0px] font-['Roboto',Helvetica]  font-medium text-white text-base text-center tracking-[-0.32px] leading-[normal]">
                                                    In progress please wait a moment...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones;