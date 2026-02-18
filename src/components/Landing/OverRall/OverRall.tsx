import { useState } from 'react';
import { useProgress } from '../../../context/ProgressContext';

import MilestoneStepper from './MilestoneMotion';
import { TITLES } from './MilestoneMotion';

import { Progress } from '../../../elements/progress';

function OverRall() {
    const [current, setCurrent] = useState<number>(0);
    const { progress } = useProgress();
    const completed = Array.from({ length: current }, (_, i) => i + 1)
    

    return (
        <section className="flex items-start gap-3 py-10 w-full" id="overRallProgress">
            <div className="flex flex-col items-start gap-3 px-6 py-20 flex-1">
                <div className="flex flex-col items-start gap-10 w-full">
                    <div className="flex flex-col items-center gap-[50px] w-full">
                        <div className="relative items-center text-white">
                            <div className="flex items-center justify-center gap-3 px-[25px] py-5 relative bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                                <div className="uppercase relative flex items-center font-bold justify-center flex-1 -mt-0.5 font-ib-3 text-[14px] tracking-[1.2px] leading-[normal]">
                                    OverRall Progress
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 w-full animate-fade-in">
                            <MilestoneStepper
                                current={0}
                                completedIds={completed}
                                onSelect={(id) => setCurrent(id)}
                            />
                            <div className="mt-6 text-md text-gray-600">
                                <p className="font-bold">
                                    Current Milestone: <span className="font-semibold">{!current ? "" : `${current}. ${TITLES[current]}`}</span>
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6 w-full">
                            <div className="relative w-full h-5 bg-[#385581] rounded-full overflow-hidden">
                                <Progress
                                    value={progress?.summary.percent}
                                    className="h-full bg-[#385581] [&>div]:bg-[#5197ff]"
                                />
                            </div>
                            <p className="text-center font-extrabold text-[#252b42] text-xl sm:text-2xl">
                                {progress?.summary.percent ? Math.floor(progress?.summary.percent) : 0}% completed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OverRall;