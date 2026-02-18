import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { BookOpen, Target, Lightbulb } from 'lucide-react';
import { CustomButton } from "../../../elements/buttons";

function ONetAssessment() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/3", prevMilestoneId: "milestone3/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/3');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/1');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M3.2: What is O*NET?</h3>
                <h6></h6>
            </div>
            <h6>Since the beginning of the iJOURNEY, a group of adventurous students would meet every day after school, at their favorite spot, Careerbucks Cafe,
                discussing the highlights and dreaming about what career they wanted to pursue after high school.
                One sunny afternoon a wise mentor happened to walk by and overheard their conversations. He decided to help them out.
                "Haven't you taken the career assessments?" he stated, smiling warmly. He described career assessments as fun tools that help you discover your unique
                skills and interests. "Think of it as a practical tool on your career journey that guides you closer to what makes you happy," he said.</h6>
            <div className="flex flex-col bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
                <div className="flex flex-col gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                <BookOpen className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">What is O*NET?</h3>
                        </div>
                        <p className="text-gray-700">
                            The U.S. Department of Labor's official career exploration tool that helps you discover careers based on your natural interests and preferences.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center mb-4">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                                <Target className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Why It's Important</h3>
                        </div>
                        <p className="text-gray-700">
                            It identifies careers based on your natural interests, not just what you think you should do. This helps you find paths that truly align with who you are.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center mb-4">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                                <Lightbulb className="text-purple-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Assessment Goal</h3>
                        </div>
                        <p className="text-gray-700">
                            To give you 3-5 potential career fields that match your interests and help guide your next steps in your career journey.
                        </p>
                    </div>
                </div>
            </div>
            <h4 className='font-bold text-center hover:underline hover:cursor-pointer hover:text-ib-1'>
                <a href='https://www.mynextmove.org/' target='_blank' rel='noreferrer' className='text-ib-2 underline'>https://onetinterestprofiler.org/</a>
            </h4>
            <h5 className='text-center font-bold'>This will open in a new tab so you won't lose your place in iJOURNEY</h5>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default ONetAssessment;