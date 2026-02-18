
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Clock, Target, Users, Star, Heart,GraduationCap, Flag } from 'lucide-react';

function EnvisioningFuture() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone6/2", prevMilestoneId: "milestone6/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone6/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone5/5');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M6.1: Envisioning Your Future</h3>
                <h6>Creating Your Personal Vision for a Purpose-Driven Life</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">Welcome to Milestone 6</h4>
                        <p className="mb-4">This milestone helps you define your future self by creating an "iJourney Career Project Fair" presentation. The goal is to synthesize all the self-discovery work from previous milestones into a cohesive vision of your ideal future.</p>
                        <div className="flex items-center gap-2 mt-4">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <span>Approximately 90 minutes to complete</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">The iJourney Career Project Fair</h4>
                        <p className="mb-4">You'll create a presentation (like a school project fair) that showcases your future career path and personal brand. Your presentation should include:</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><Target className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Future Self:</strong> Who you envision becoming professionally and personally</li>
                            <li className="flex items-start gap-2"><Users className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Ideal Job/Role:</strong> What specific position or type of work you aspire to</li>
                            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Educational Path:</strong> How you plan to get there (tying back to Milestone 5)</li>
                            <li className="flex items-start gap-2"><Star className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Personal Brand:</strong> What makes you unique and valuable in your chosen field</li>
                            <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Impact:</strong> What difference you want to make in the world through your work</li>
                        </ul>
                        <p className="mt-4">This isn't just about a job title; it's about creating a fulfilling life and career that aligns with your core values and passions.</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Key Principles</h4>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="bg-white px-4 py-2 rounded-full border border-green-300">
                                <span className="font-medium text-green-700">HUMBLE</span>
                            </div>
                            <div className="bg-white px-4 py-2 rounded-full border border-green-300">
                                <span className="font-medium text-green-700">CONFIDENT</span>
                            </div>
                            <div className="bg-white px-4 py-2 rounded-full border border-green-300">
                                <span className="font-medium text-green-700">CAPABLE</span>
                            </div>
                        </div>
                        <p className="mb-4">These are the core attributes we aim to cultivate throughout your journey.</p>
                        <div className="flex items-center gap-2">
                            <Flag className="w-6 h-6 text-green-600" />
                            <span className="font-bold text-green-800">I BELIEVE IN MYSELF</span>
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

export default EnvisioningFuture;