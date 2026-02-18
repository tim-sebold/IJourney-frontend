
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

function RefineFinalize() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const journeyerStatement = {
        iAm: '',
        iBelieve: '',
        iWill: '',
        iAmConfident: '',
        iAmCapable: ''
    };

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone6/5", prevMilestoneId: "milestone6/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone6/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone6/3');
    };

    const handleGetAIFeedback = () => {
        // Implement AI feedback logic here

    }

    const handleFinalizeStatement = () => {
        
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M6.4: Refine & Finalize Your Statement</h3>
                <h6>Polish Your Vision with AI Feedback</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Get AI Feedback</h4>
                        <p className="mb-4">After submitting your draft, our AI chatbot will provide constructive feedback to help you refine your statement.</p>
                        <div className="bg-white p-4 rounded-lg mb-4">
                            <h5 className="font-semibold text-blue-700 mb-2">Sample AI Feedback:</h5>
                            <p className="text-sm mb-2">"Your statement shows strong values around compassion and education. Consider adding more specific examples of how you've demonstrated these values in the past."</p>
                            <p className="text-sm mb-2">"The 'I WILL' section could be strengthened by including measurable goals or timelines."</p>
                            <p className="text-sm">"Your confidence affirmations are powerful! Consider connecting them to specific skills or experiences."</p>
                        </div>
                        <CustomButton title="Get AI Feedback" onClickFunc={handleGetAIFeedback} type='green' className=' rounded-full'></CustomButton>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">Personalization Features</h4>
                        <p className="mb-4">Based on your responses from previous milestones, the AI can suggest personalized elements for your statement:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-yellow-700 mb-2">Career Path Suggestions</h5>
                                <p className="text-sm">"Based on your interest in helping others and your strengths in communication, you might consider roles in educational leadership or nonprofit management."</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-yellow-700 mb-2">Values Alignment</h5>
                                <p className="text-sm">"Your emphasis on creativity and innovation suggests you'd thrive in environments that value original thinking and problem-solving."</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Finalize Your Statement</h4>
                        <p className="mb-4">Once you're satisfied with your statement, save it as your final version. You can always come back and revise it as you grow and evolve.</p>
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-700 mb-2">Final Statement Preview:</h5>
                            <div className="space-y-3 text-sm">
                                <p><strong>I AM...</strong> {journeyerStatement.iAm || "A compassionate problem-solver who values integrity and continuous learning."}</p>
                                <p><strong>I BELIEVE...</strong> {journeyerStatement.iBelieve || "Everyone deserves access to quality education and that small actions can create big change."}</p>
                                <p><strong>I WILL...</strong> {journeyerStatement.iWill || "Pursue a career in educational technology to empower underserved communities."}</p>
                                <p><strong>I AM CONFIDENT...</strong> {journeyerStatement.iAmConfident || "In my ability to overcome challenges and adapt to new situations."}</p>
                                <p><strong>I AM CAPABLE...</strong> {journeyerStatement.iAmCapable || "Of achieving my goals through dedication, resilience, and collaboration."}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <CustomButton title="Finalize Statement" onClickFunc={handleFinalizeStatement} type='red' className='rounded-full'></CustomButton>
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

export default RefineFinalize;