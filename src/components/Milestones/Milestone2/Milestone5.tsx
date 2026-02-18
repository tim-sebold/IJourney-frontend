import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';

import ImageEQ from "../../../assets/image/milestones/EQ.png";

function EQ() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [reflection, setReflection] = useState<string>("");

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone2_5');

                if (response) {
                    console.log("response:", response);
                    
                    setReflection(response.responses.reflection as string);
                }
            }
            getResponse();
        }
    }, [user])
    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone2_5', { userId: user?.uid, responses: { reflection } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/6", prevMilestoneId: "milestone2/5" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/6');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/4');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.5: EQ: Emotional Intelligence</h3>
                <h6>Understanding your emotions and their impact on your journey</h6>
            </div>
            <div className="">
                <h4 className='font-bold'>What is Emotional Intelligence (EQ)?</h4>
                <h6>Think of EQ as your "People Smart" and "Self Smart" skill set. While IQ measures how well you can learn and process information
                    (like solving math problems), EQ measures how well you understand and manage your own feelings and how you understand and react to the feelings of others.</h6>
            </div>
            <div className="">
                <h4 className='font-bold'>Why EQ matters?</h4>
                <h6>EQ is extremely important because success in life, career, and relationships often depends more on how you handle yourself and others than on just being
                    technically smart.</h6>
            </div>
            <div className="flex flex-col gap-1">
                <h6 className='font-bold'>Personal Reflection</h6>
                <Textarea
                    value={reflection}
                    placeholder="Share your thoughts about how your identified emotions influenced your actions, decisions, or interactions today......"
                    rows={5}
                    onChange={(e: any) => setReflection(e.target.value)}
                    className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                />
                <h6 className='font-bold'>This reflection connects your emotion identification work from Milestone 1 to understanding how emotions influence your actions.</h6>
            </div>
            <div className="flex flex-col gap-6">
                <h5 className=''>As anxiety and depression cast a growing shadow over teenagers, the need for emotional intelligence has never felt more urgent. 
                    It’s like equipping yourself with an emotional raincoat before the storm hits — so overwhelming feelings don’t leave you stuck, unable to move forward.
                    Next, we’ll explore six guideposts that help strengthen emotional intelligence. 
                    Through the stories of Mia and Jordan, you’ll see how emotional intelligence acts like a trusted copilot on the roller coaster of emotions — helping you navigate the highs and lows with clarity and confidence.
                    High EQ becomes a wisdom compass from the heart, guiding you to understand and respond to your emotions in ways that build bridges, not walls.</h5>
            </div>
            <div className="flex justify-center">
                <img src={ImageEQ} alt="" />
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!reflection}></CustomButton>
            </div>
        </div>
    )
}

export default EQ