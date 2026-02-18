
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { unlockNext } from '../../controllers/courseController';
import toast from 'react-hot-toast';

import { Button } from '../../elements/buttons/button';
import { Card, CardContent } from '../../elements/card';
import { sidebarData } from '../../datas/layoutData';

function Continue() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { currentMilestone, currentMilestoneChild, refreshProgress, progress } = useProgress();

    const handleContinue = async () => {
        if (user) {
            if (currentMilestone) {
                navigate(`/milestones/milestone${currentMilestone}/${currentMilestoneChild}`);
            } else {
                try {
                    const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone0/1", prevMilestoneId: "start" });
                    console.log(result)
                    toast.success(result.message);
                    await refreshProgress();
                    navigate('/milestones/milestone0/1');
                } catch (error: any) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
    }

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
                                    {currentMilestone && currentMilestoneChild ? sidebarData.milestoneMenus[currentMilestone - 1][currentMilestoneChild - 1].title : Math.floor(progress?.summary.percent) === 100 ? "You have completed the course" : "You have not started the course yet."}
                                </p>
                            </div>
                        </div>
                        <Button onClick={handleContinue} className="inline-flex cursor-pointer gap-3 px-6 py-3 bg-[#ff6f61] items-center justify-center relative h-auto rounded-full hover:bg-[#ff6f61]/90 transition-colors">
                            <span className="relative flex items-center justify-center text-white">
                                {currentMilestone ? "Continue Your Course" : Math.floor(progress?.summary.percent) === 100 ? "Continue Your Course" : "Start Your Course"}
                            </span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default Continue