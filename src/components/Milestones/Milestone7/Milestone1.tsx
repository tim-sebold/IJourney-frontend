
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Clock } from 'lucide-react';

function YieldGrowth() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone7/2", prevMilestoneId: "milestone7/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone7/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone6/6');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M7.1: Yield to Growth"</h3>
                <h6>Setting SMART Goals for Your Purpose-Driven Journey</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Welcome to Milestone 7</h4>
                        <p className="mb-4">This final milestone helps you translate your vision into actionable goals using the SMART framework. You'll create specific, measurable, achievable, relevant, and time-bound goals that will help you turn your Journeyer's Statement into reality.</p>
                        <div className="flex items-center gap-2 mt-4">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span>Approximately 45 minutes to complete</span>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">What Are SMART Goals?</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Specific</h5>
                                <p className="text-sm">Be clear about exactly what the goal is and what will be accomplished. Consider giving details about who, what, when, where, why, and how.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Measurable</h5>
                                <p className="text-sm">Make sure you have a way to track your progress and whether you've achieved your goal.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Achievable</h5>
                                <p className="text-sm">Set goals that challenge you but are still realistic. They should fit within your power.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Relevant</h5>
                                <p className="text-sm">Your goals should connect to your interests, dreams, choices, and responsibilities.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Time-Bound</h5>
                                <p className="text-sm">Give yourself a deadline to create a sense of urgency.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">Examples of SMART Goals</h4>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm mb-2"><strong>Example:</strong> "I will journal Monday through Friday. Once per day, I will take my emotions and reflect in my journal. I will turn off electronics 30 minutes earlier each night to journal."</p>
                            <p className="text-sm">This will help me identify emotional triggers and become more self-aware over the next three months.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default YieldGrowth;