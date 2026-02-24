
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import { unlockNext } from '../../../controllers/courseController';

import { MilestonePageShell } from '../MilestonePageShell';
import { CustomButton } from "../../../elements/buttons";
import { Star, Heart, Target, Users, Lightbulb } from 'lucide-react';

function RoadAhead() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const previous = () => {
        navigate('/milestones/milestone7/4');
    };

    const handleLogout = () => {
        if (user) {
            logout();
            navigate('/');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const handleStartAI = () => {

    }

    const complete = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "completed", prevMilestoneId: "milestone7/5" });
                toast.success(result.message);
                navigate('/');
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error("You need to log in to finish all milestone.");
        }
    }

    return (
        <MilestonePageShell
            title="M7.5: The Road Ahead"
            subtitle="Your Continued Journey of Purpose and Growth"
            onPrevious={previous}
            onNext={complete}
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

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">AI Companion for Your Future</h4>
                        <p className="mb-4">Even after completing the program, our AI chatbot remains available to support you:</p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Check in on your SMART goals and adjust them as needed</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Get personalized recommendations for learning resources</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Help you navigate new challenges and opportunities</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Provide encouragement and celebrate your successes</div>
                        </div>
                        <CustomButton title='Start AI Companion' onClickFunc={handleStartAI} className='rounded-full mt-4 justify-end' type='red'></CustomButton>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Your Final Message</h4>
                        <div className="bg-white p-6 rounded-lg shadow mb-4">
                            <div className="text-center">
                                <p className="text-lg font-semibold text-purple-800 mb-4">"Your journey will be guided by your commitment to yourself."</p>
                                <p className="text-sm text-purple-600">— Asha McMillan, LPC</p>
                            </div>
                        </div>
                        <p className="mb-4">Thank you for embarking on this transformative journey with us. We believe in your potential and look forward to seeing the incredible impact you'll make in the world.</p>
                        <div className="flex justify-center space-x-4">
                            <CustomButton title='Log Out' onClickFunc={handleLogout} className='rounded-full justify-end' type='red'></CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </MilestonePageShell>

    )
}

export default RoadAhead;