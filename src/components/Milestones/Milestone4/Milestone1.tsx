import { useState } from 'react';
import { Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import ImageResource from '../../../assets/image/milestones/resource.png'

function IntroGuides() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showStory, setShowStory] = useState(false);

    const toggleStory = () => {
        setShowStory(!showStory);
    };

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone4/2", prevMilestoneId: "milestone4/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone4/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/7');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M4.1: Intro Guides</h3>
                <h6>Create your personal "A Team" the people who will guide and cheer you on your journey to success.</h6>
            </div>
            <div className="p-8 flex flex-col gap-4">
                <div className="mb-8">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                        You Don't Have to Journey Alone
                    </h4>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Embarking on an epic adventure requires tools, knowledge, and support. Your school and
                            community resources act as a compass guiding you toward your dreams.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            If tempted by negative influences like substance abuse, envision a toolkit filled with
                            healthy alternatives and wisdom from community allies, such as substance abuse prevention
                            programs like iRIZE. With this positive support, you can confidently steer your life toward greatness.
                        </p>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="w-6 h-6 text-indigo-600" />
                        <h3 className="text-xl font-semibold text-gray-800">The Need for Guides</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Even the most successful people rely on mentors, friends, and experts—your "guides."
                        Asking for help isn't a weakness; it's a strategic strength that helps you navigate
                        your journey to purpose and success.
                    </p>
                </div>
                <div className="mb-8">
                    <button
                        onClick={toggleStory}
                        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        <BookOpen className="w-5 h-5" />
                        {showStory ? 'Hide Story' : 'Read Success Story'}
                    </button>

                    {showStory && (
                        <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg animate-fadeIn">
                            <h4 className="text-lg font-semibold text-green-800 mb-3">Maria's Journey</h4>
                            <p className="text-gray-700 leading-relaxed">
                                Maria was struggling with peer pressure to try substances at school. She felt overwhelmed
                                and alone until she reached out to her school counselor through the iRIZE program.
                                Her counselor connected her with a peer mentor who had faced similar challenges.
                                Together, they developed healthy coping strategies and Maria discovered her passion
                                for community service. Today, Maria is a youth advocate helping other students
                                navigate their own journeys with confidence and support.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-3">
                                "Asking for help was the best decision I ever made. My guides showed me that I wasn't
                                alone and helped me find my purpose."
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <img src={ImageResource} alt="resource" className='w-2/3' />
                </div>
                <div className="text-center">
                    <p className="text-gray-600 mb-6">
                        Ready to build your own Resources Roadway? Let's get started!
                    </p>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default IntroGuides;
