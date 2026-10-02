
import { useProgress } from '../../context/ProgressContext';
import { continueRouteFor, useContinueJourney } from '../../hooks/useContinueJourney';
import { milestoneTitle } from '../../datas/milestoneTitles';

import { Button } from '../../elements/buttons/button';
import { Card, CardContent } from '../../elements/card';

function Continue() {
    const { progress } = useProgress();
    const handleContinue = useContinueJourney();
    const summary = progress?.summary;
    const route = continueRouteFor(summary);
    const isComplete = route === "/milestones/complete";


    return (
        <section className="flex items-start gap-3 py-0 w-full px-8">
            <Card className="flex flex-col w-full items-start bg-white rounded-none overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-col items-start gap-3 p-6 relative w-full">
                    <div className="flex justify-between items-center gap-5 relative w-full flex-col md:flex-row">
                        <div className="flex-col items-start gap-6 w-full flex relative">
                            <div className="flex flex-col items-start relative w-full">
                                <h2 className="relative w-full font-ib-3 font-extrabold text-[#252b42] text-[40px] tracking-[0] leading-16">
                                    Ready To Continue?
                                </h2>
                                <p className="relative w-full font-ib-3 font-bold text-[#252b42] text-base tracking-[0] leading-8">
                                    {isComplete ? "You have completed the course" : route ? milestoneTitle(summary.currentMilestone) : "You have not started the course yet."}
                                </p>
                            </div>
                        </div>
                        <Button onClick={handleContinue} className="inline-flex cursor-pointer gap-3 px-6 py-3 bg-[#ff6f61] items-center justify-center relative h-auto rounded-full hover:bg-[#ff6f61]/90 transition-colors">
                            <span className="relative flex items-center justify-center text-white">
                                {isComplete ? "View Your Certificate" : route ? "Continue Your Course" : "Start Your Course"}
                            </span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default Continue