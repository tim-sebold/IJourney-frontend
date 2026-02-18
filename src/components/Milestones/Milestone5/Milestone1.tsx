
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext, submitMilestone, getMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';
import { BookOpen, Clock } from "lucide-react";
import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';

import ImageOpenBook from "../../../assets/image/milestones/open-book.png";
import { useEffect, useState } from 'react';

function NavigatingEducation() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [goal, setGoal] = useState<string>("");

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone5_1');
                if(response) {
                    setGoal(response.responses.goal as string);
                }
            }
            getResponse();
        }
    }, [user])
    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone5_1', { userId: user?.uid, responses: { goal } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone5/2", prevMilestoneId: "milestone5/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone5/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone4/5');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M5.1: Navigating Education</h3>
                <h6>Your Path to Purpose Through Learning</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-2">Career Education Requirements</h4>
                        <p className="mb-4">After high school, you'll need to make many decisions about your future. Some choices are based on what's different from high school and some are similar.</p>
                        <p className="mb-4">Before entering the workforce, you've learned a lot about yourself. You've determined how you want to live your life. Now you're ready to explore your options for education after high school.</p>
                        <p className="mb-4">If you want to be a teacher, you'll need to go to college to get a degree. If you want to be a mechanic, you might need to attend a trade school or get certified through an apprenticeship program. There are many different paths you can take!</p>
                        <div className="flex items-center gap-2 mt-4">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="text-sm">Early College High School (grades 9–12)</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="text-sm">Dual Enrollment (college classes while in high school)</span>
                        </div>
                        <a href="https://sc.gov/residents/learning-sc/colleges-and-universities-list" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline">
                            Learn more about South Carolina's "Earn a Degree in High School" program
                        </a>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-2">Milestone Information</h4>
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-green-600" />
                            <span>Approximately 1.5 hours to complete</span>
                        </div>
                        <p>This milestone will help you explore different types and lengths of educational journeys and encourage you to think about how education aligns with your purpose and passions.</p>
                    </div>

                    <div className="flex flex-col">

                    </div>
                </div>
                <div className="flex flex-col gap-4 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
                    <div className="flex flex-row gap-2 items-center">
                        <img src={ImageOpenBook} alt="" className='w-10' />
                        <h4 className='font-bold uppercase'>My Educational Goals</h4>
                    </div>
                    <div className="relative w-full">
                        <Textarea
                            value={goal}
                            onChange={(e: any) => setGoal(e.target.value)}
                            placeholder="Describe the goal..."
                            rows={5}
                            className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!goal}></CustomButton>
            </div>
        </div>
    )
}

export default  NavigatingEducation;