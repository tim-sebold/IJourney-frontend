
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Target, Users, Calendar, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SmartGoal {
    goal: string;
    accountabilityPartner: string;
    deadline: string;
}

function TemplateReflection() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [smartGoals, setSmartGoals] = useState<SmartGoal[]>([]);

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone7_2');
                
                if (response) {
                    setSmartGoals(response.responses.smartGoals as SmartGoal[]);
                }
            }
            getResponse();
        }
    }, [user])

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone7/4", prevMilestoneId: "milestone7/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone7/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone7/2');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M7.3: Template & Reflection</h3>
                <h6>Finalizing Your Growth Plan</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Your Growth Plan Template</h4>
                        <p className="mb-4">Here's a clean template to organize your SMART goals. Use this as a reference document you can return to throughout your journey.</p>

                        {smartGoals.map((smartGoal, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="font-semibold text-green-700">SMART Goal #1</h5>
                                    <div className="flex items-center gap-2">
                                        <Target className="w-5 h-5 text-green-600" />
                                        <span className="text-sm">Specific</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm">{smartGoal.goal || "Your goal description will appear here..."}</p>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="font-semibold text-green-700">Accountability Partner</h5>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-600" />
                                        <span className="text-sm">Relevant</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm">{smartGoals[0].accountabilityPartner || "Your accountability partner name will appear here..."}</p>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="font-semibold text-green-700">Check-in Method</h5>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                        <span className="text-sm">Time-Bound</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm">{smartGoals[0].deadline || "Your check-in method will appear here..."}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Reflection Questions</h4>
                        <p className="mb-4">Take a moment to reflect on your growth journey:</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> How has your understanding of yourself changed throughout this journey?</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> What are you most proud of accomplishing in this program?</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> What challenges did you overcome, and what did you learn from them?</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> How will you continue to grow and develop after completing this program?</li>
                        </ul>
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

export default TemplateReflection;