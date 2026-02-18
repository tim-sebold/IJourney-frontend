import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext, submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';

const EQMatters = [
    { title: "Humor" },
    { title: "Honesty" },
    { title: "Bravery" },
    { title: "Kindness" },
    { title: "Love" }
];

function DefiningStrength() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [answers, setAnswers] = useState<Record<string, string>>({
        Humor: "",
        Honesty: "",
        Bravery: "",
        Kindness: "",
        Love: ""
    });

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone2_11');
                if (response) {
                    setAnswers(response.responses.answers as Record<string, string>);
                }
            };
            getResponse();
        }
    }, [user]);

    const handleTextareaChange = (title: string, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [title]: value
        }));
    };

    const next = async () => {
        if (!user) {
            toast.error("You need to log in to unlock the next milestone.");
            return;
        }

        try {
            await submitMilestone('milestone2_11', {
                userId: user.uid,
                responses: { answers }
            });

            const result = await unlockNext({
                userId: user.uid,
                milestoneId: "milestone2/12",
                prevMilestoneId: "milestone2/11"
            });

            toast.success(result.message);
            navigate('/milestones/milestone2/12');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const previous = () => {
        navigate('/milestones/milestone2/10');
    };

    const allFilled = Object.values(answers).every(text => text.trim() !== "");

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.11: Defining Your Strengths</h3>
                <h6>
                    This milestone is about turning your strengths from ideas into evidence by connecting them
                    to real moments from your life.
                </h6>
            </div>

            {/* Luisa Introduction */}
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Meet Luisa</h4>
                <h6>
                    Earlier in the program, you met Luisa—a character on a journey to better understand herself.
                    As she traveled through the Valley of Strengths and Virtues, she discovered that her strengths
                    weren’t just labels. They showed up through her actions, choices, and responses to challenges.
                </h6>
            </div>

            {/* Inspiration Section */}
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Inspiration from Luisa’s Journey</h4>
                <h6>
                    Luisa collected gems that represented her character strengths—such as Humor, Honesty, Bravery,
                    Kindness, and Love. Each gem was earned by recognizing moments when she actively used those
                    strengths in her daily life.
                    <br /><br />
                    Now it’s your turn to do the same.
                </h6>
            </div>

            {/* EQ Explanation */}
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Why EQ Matters</h4>
                <h6>
                    Emotional Intelligence (EQ) matters because success in life, relationships, and careers often
                    depends more on how you understand and manage emotions—your own and others’—than on technical
                    skills alone.
                </h6>
            </div>

            {/* Reflection Inputs */}
            <div className="flex flex-col gap-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
                <ul className='flex flex-col gap-6'>
                    {EQMatters.map((item, index) => (
                        <li key={index} className='flex flex-col gap-2'>
                            <h5 className='font-bold'>{`${index + 1}. ${item.title}`}</h5>
                            <h6>
                                Think about the past week. How did you demonstrate <strong>{item.title}</strong>
                                through your actions, words, or decisions?
                            </h6>
                            <Textarea
                                value={answers[item.title]}
                                onChange={(e) => handleTextareaChange(item.title, e.target.value)}
                                placeholder={`Describe a specific situation where you showed ${item.title}...`}
                                rows={5}
                                className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                            />
                            <p className='font-bold text-center'>
                                Be specific — include what happened, what you did, and the impact it had.
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Navigation */}
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton
                    onClickFunc={previous}
                    title='previous'
                    className='rounded-none justify-end'
                    type='move'
                />
                <CustomButton
                    onClickFunc={next}
                    title='next'
                    className='rounded-none justify-end'
                    type='move'
                    disabled={!allFilled}
                />
            </div>
        </div>
    );
}

export default DefiningStrength;
