import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import toast from 'react-hot-toast';

import CircularProgress from './components/Progress';
import { Badge } from '../../elements/badge';
import { Card, CardContent } from '../../elements/card';

import { milestoneData } from '../../datas/landingData';
import { sidebarData } from '../../datas/layoutData';
import RotaryLogoImage from "../../assets/image/rotary-logo.png";

function Milestones() {
    const navigate = useNavigate();
    const { progress, loadingProgress } = useProgress();

    const progressEntries = Array.isArray(progress?.milestones) ? progress.milestones : [];

    const getCardState = (milestoneId: number) => {
        const total = sidebarData.milestoneMenus[milestoneId - 1]?.length ?? 0;
        const groupEntries = progressEntries.filter((entry: any) => {
            const match = String(entry?.milestoneId ?? '').match(/^milestone(\d+)[/_](\d+)$/);
            return Number(match?.[1]) === milestoneId;
        });
        const completedCount = groupEntries.filter((entry: any) => entry?.completed).length;
        const unlockedEntries = groupEntries.filter((entry: any) => entry?.unlocked || entry?.completed);
        const completed = total > 0 && completedCount >= total;
        const unlocked = milestoneId === 1 || unlockedEntries.length > 0;
        const activeEntry = unlockedEntries
            .filter((entry: any) => !entry?.completed)
            .sort((a: any, b: any) => {
                const child = (entry: any) => Number(String(entry?.milestoneId).match(/^milestone\d+[/_](\d+)$/)?.[1] ?? 1);
                return child(a) - child(b);
            })[0];
        const targetChild = Number(String(activeEntry?.milestoneId ?? '').match(/^milestone\d+[/_](\d+)$/)?.[1] ?? 1);

        return {
            progressValue: total ? Math.round((completedCount / total) * 100) : 0,
            unlocked,
            targetChild,
            badge: completed ? 'Completed' : unlocked ? 'Continue' : 'Locked',
            badgeColor: completed
                ? 'bg-linear-to-r from-[#6ab04c] to-[#badc58]'
                : unlocked ? 'bg-linear-to-r from-[#ffa502] to-[#ff6348]' : 'bg-black',
        };
    };

    const goToMilestonePage = (milestoneId: number) => {
        const state = getCardState(milestoneId);
        if (!state.unlocked) {
            toast.error('Complete the previous milestone to unlock this activity.');
            return;
        }
        navigate(`/milestones/milestone${milestoneId}/${state.targetChild}`);
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
                        milestoneData.milestones.map((milestone) => {
                            const state = getCardState(milestone.id);
                            return (
                            <Card
                                key={milestone.id}
                                onClick={() => goToMilestonePage(milestone.id)}
                                aria-disabled={!state.unlocked}
                                className={`shadow-lg border-none transition-all p-2 bg-white ${state.unlocked ? 'cursor-pointer hover:-translate-y-1 hover:shadow-2xl' : 'cursor-not-allowed opacity-80'}`}
                            >
                                <CardContent className="p-6 space-y-2 flex flex-col justify-between h-full">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-[#5197ff] text-[16px] tracking-normal font-blod">
                                            {loadingProgress ? '--:--' : milestone.time}
                                        </span>
                                        <Badge
                                            className={`px-4 py-1 rounded-lg ${state.badgeColor} border-0`}
                                        >
                                            <span className="font-black text-white text-base">
                                                {loadingProgress ? 'Loading' : state.badge}
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
                                    <CircularProgress
                                        value={loadingProgress ? 0 : state.progressValue}
                                        label={state.progressValue === 100 ? 'Milestone completed!' : state.unlocked ? 'Keep going—you are making progress.' : 'Complete the previous milestone to unlock.'}
                                    />
                                </CardContent>
                            </Card>
                        )})}
                    <div className="md:col-span-2 flex items-end justify-center">
                        <div className="w-full max-w-2xl px-4 py-6 flex flex-col justify-center items-end border-2 bg-ib-1 border-ib-1 rounded-2xl">
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
