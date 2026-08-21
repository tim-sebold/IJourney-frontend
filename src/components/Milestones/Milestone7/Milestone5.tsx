
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import { unlockNext } from '../../../controllers/courseController';
import { useCertificateDownload } from '../../../hooks/useCertificateDownload';

import { MilestonePageShell } from '../MilestonePageShell';
import { CustomButton } from "../../../elements/buttons";
import { Star, Heart, Target, Users, Lightbulb, Award } from 'lucide-react';

function RoadAhead() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { download, loading } = useCertificateDownload();

    const previous = () => {
        navigate('/milestones/milestone7/4');
    };

    const complete = async () => {
        if (!user) {
            toast.error("You need to log in to finish all milestone.");
            return;
        }

        try {
            const result = await unlockNext({ userId: user.uid, milestoneId: "completed", prevMilestoneId: "milestone7/5" });
            toast.success(result.message);
            // The completion page is the single final state, and it carries the
            // certificate download so nobody has to re-enter the module for it.
            navigate('/milestones/complete');
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Could not complete your journey.");
        }
    }

    return (
        <MilestonePageShell
            title="M7.5: The Road Ahead"
            subtitle="Your Continued Journey of Purpose and Growth"
            onPrevious={previous}
            onNext={complete}
            nextLabel="finish my journey"
            isNextLoading={false}
        >
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Your Journey Continues</h4>
                        <p className="mb-4">As you move forward, remember that growth is a lifelong journey. The tools and insights you've gained through this program will serve you well in all areas of your life.</p>
                        <div className="bg-white p-4 rounded-lg mb-4">
                            <h5 className="font-semibold text-blue-700 mb-2">Key Takeaways:</h5>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2"><Star className="w-4 h-4 text-blue-600 mt-1" /> You have the power to shape your future through intentional action</li>
                                <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-blue-600 mt-1" /> Your values and passions are your compass for decision-making</li>
                                <li className="flex items-start gap-2"><Target className="w-4 h-4 text-blue-600 mt-1" /> Setting SMART goals transforms dreams into reality</li>
                                <li className="flex items-start gap-2"><Users className="w-4 h-4 text-blue-600 mt-1" /> Building supportive relationships enhances your success</li>
                                <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> Continuous reflection leads to continuous growth</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                        <div className="flex items-start gap-4">
                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-400 text-white ring-4 ring-white">
                                <Award className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-bold text-emerald-900 mb-2">Your Certificate</h4>
                                <p className="mb-4">Your certificate of completion is ready. You can download it here, and again from your completion page any time — you never need to come back into the module for it.</p>
                                <CustomButton
                                    title='Download Certificate'
                                    onClickFunc={download}
                                    className='rounded-full justify-end'
                                    type='green'
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Your Final Message</h4>
                        <div className="bg-white p-6 rounded-lg shadow mb-4">
                            <div className="text-center">
                                <p className="text-lg font-semibold text-purple-800 mb-4">"Your journey will be guided by your commitment to yourself."</p>
                                <p className="text-sm text-purple-600">— Asha McMillan, LPC</p>
                            </div>
                        </div>
                        <p>Thank you for embarking on this transformative journey with us. We believe in your potential and look forward to seeing the incredible impact you'll make in the world.</p>
                    </div>
                </div>
            </div>
        </MilestonePageShell>

    )
}

export default RoadAhead;
