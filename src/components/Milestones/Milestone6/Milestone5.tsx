
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { PenTool, Users, GraduationCap, Target, Star, Heart, Lightbulb } from 'lucide-react';

function CreateCareerProjectFair() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone7/1", prevMilestoneId: "milestone6/5" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone7/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone6/4');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M6.5: Create Your Career Project Fair</h3>
                <h6>Visualize Your Future Through a Creative Presentation</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Design Your Career Project Fair</h4>
                        <p className="mb-4">Now that you have your Journeyer's Statement, create a visual presentation that brings your future vision to life. This could be a digital poster, slideshow, video, or interactive webpage.</p>
                        <p className="mb-4">Your presentation should include:</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><Target className="w-4 h-4 text-green-600 mt-1" /> <strong>Your Future Self:</strong> A visual representation of who you'll become</li>
                            <li className="flex items-start gap-2"><Users className="w-4 h-4 text-green-600 mt-1" /> <strong>Your Ideal Job/Role:</strong> Description of your dream position with visuals</li>
                            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-green-600 mt-1" /> <strong>Your Educational Path:</strong> Timeline of your academic journey</li>
                            <li className="flex items-start gap-2"><Star className="w-4 h-4 text-green-600 mt-1" /> <strong>Your Personal Brand:</strong> Logo, colors, and key words that represent you</li>
                            <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-green-600 mt-1" /> <strong>Your Impact:</strong> How your work will make a difference in the world</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Creative Tools & Resources</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-700 mb-2">Digital Tools</h5>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><PenTool className="w-4 h-4 text-blue-600 mt-1" /> Canva - for designing posters and presentations</li>
                                    <li className="flex items-start gap-2"><PenTool className="w-4 h-4 text-blue-600 mt-1" /> Google Slides - for creating slideshows</li>
                                    <li className="flex items-start gap-2"><PenTool className="w-4 h-4 text-blue-600 mt-1" /> Adobe Spark - for social media graphics</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-700 mb-2">Content Ideas</h5>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> Include personal anecdotes and stories</li>
                                    <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> Use inspirational quotes that resonate with you</li>
                                    <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> Add images that represent your vision</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">AI-Powered Presentation Assistant</h4>
                        <p className="mb-4">Our AI chatbot can help you create your presentation by suggesting content, layout ideas, and design elements based on your Journeyer's Statement.</p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Ask for layout suggestions based on your content</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Get color scheme recommendations based on your personal brand</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Generate image ideas for your visual elements</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-yellow-600 mt-1" /> Help you write compelling captions and descriptions</div>
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

export default CreateCareerProjectFair;