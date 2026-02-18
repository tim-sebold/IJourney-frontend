import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext, submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';

import ImageJowel1 from "../../../assets/image/milestones/jowel1.png";
import ImageJowel2 from "../../../assets/image/milestones/jowel2.png";
import ImageJowel3 from "../../../assets/image/milestones/jowel3.png";
import ImageJowel4 from "../../../assets/image/milestones/jowel4.png";
import Imagel9 from "../../../assets/image/png/19.png";

const EQTreasuredSecrets = [
    {
        image: ImageJowel1,
        text: "Increase Awareness Of Your Emotions",
        description:
            "As we've practiced earlier in the workbook, increasing awareness of our emotions and feelings is the first step toward emotional intelligence. However, when we are able to do this successfully, we gain the power to pause, reflect, and respond instead of reacting on impulse."
    },
    {
        image: ImageJowel2,
        text: "Develop A Mindful Understanding Of Others' Feelings",
        description:
            "Imagine being able to sense what someone else might be feeling, even if they haven’t said a word. This ability is called empathy, and it helps strengthen relationships and build trust."
    },
    {
        image: ImageJowel3,
        text: "Manage Your Emotional Reactions",
        description:
            "It’s important to acknowledge your feelings instead of ignoring them. Emotional reactions give us valuable information, but learning how to manage them helps us respond in healthy and constructive ways."
    },
    {
        image: ImageJowel4,
        text: "Choosing Your Mood",
        description:
            "Managing emotions can be an adventure. Think of it like choosing the right song for the moment — each mood is a different track, and you get to decide which one plays next."
    }
];

function EQTreasuredSecret() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [emotion, setEmotion] = useState<string>("");
    const [nextButtonDisabledState, setNextButtonDisabledState] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone2_6');
                if (response) {
                    setEmotion(response.responses.emotion as string);
                }
            };
            getResponse();
        }
    }, [user]);

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({
                    userId: user.uid,
                    milestoneId: "milestone2/7",
                    prevMilestoneId: "milestone2/6"
                });
                toast.success(result.message);
                navigate('/milestones/milestone2/7');
            } catch (error: any) {
                toast.error(error.message);
            }
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    };

    const previous = () => {
        navigate('/milestones/milestone2/5');
    };

    const save = async () => {
        if (!user) {
            toast.error("You need to login to post a response.");
            return;
        }

        try {
            const result = await submitMilestone('milestone2_6', {
                userId: user.uid,
                responses: { emotion }
            });
            setNextButtonDisabledState(false);
            toast.success(result.message);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.6: EQ Treasured Secrets</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {EQTreasuredSecrets.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col h-full w-full justify-center gap-3 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-6"
                    >
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <img src={item.image} alt="" className="w-10 h-10" />
                            <h5 className="font-bold uppercase text-center">{item.text}</h5>
                            <img src={item.image} alt="" className="w-10 h-10" />
                        </div>
                        <h6 className="text-center">{item.description}</h6>
                    </div>
                ))}
            </div>

            {/* Mia's Problem */}
            <div>
                <h4 className="font-bold">The Problem</h4>
                <p>
                    Mia was academically gifted, but she felt lonely and disconnected. When setbacks happened,
                    she quickly became frustrated and often gave up — and she struggled to relate naturally with her classmates.
                </p>
            </div>

            {/* Reflection Activity */}
            <div className="bg-white px-6 py-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-4">
                <h4 className="font-bold">Reflection — Connecting to Mia</h4>
                <p>
                    Mia’s struggle wasn’t about intelligence — it was about emotional awareness and connection.
                    When frustration took over, she withdrew instead of reaching out.
                </p>
                <p>
                    Take a moment to reflect:
                </p>
                <ul className="list-disc list-inside">
                    <li>Have you ever felt overwhelmed and pulled away like Mia?</li>
                    <li>What emotion usually shows up first when things don’t go as planned?</li>
                </ul>
                <p>
                    Recognizing these patterns is the first step toward choosing a different response.
                </p>
            </div>

            {/* Quick Practice */}
            <div className="flex flex-col gap-2 mt-6">
                <h6 className="font-bold">Quick Practice — 90 Seconds</h6>
                <h6>Try this short practice to lock the lesson in:</h6>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <ul className="list-decimal list-inside">
                        <li>Pause and take 3 slow breaths.</li>
                        <li>Name one emotion you notice right now.</li>
                    </ul>
                    <img src={Imagel9} alt="" className="w-32" />
                </div>
            </div>

            {/* Input */}
            <div className="flex flex-col justify-center items-center gap-4">
                <Textarea
                    value={emotion}
                    placeholder="Describe one emotion you notice right now and what may have triggered it..."
                    rows={5}
                    onChange={(e: any) => setEmotion(e.target.value)}
                    className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                />
                <CustomButton
                    onClickFunc={save}
                    title="Save"
                    className="rounded-none w-auto"
                    type="red"
                    disabled={!emotion}
                />
            </div>

            {/* Navigation */}
            <div className="flex justify-between w-full gap-2">
                <CustomButton onClickFunc={previous} title="Previous" className="rounded-none" type="move" />
                <CustomButton
                    onClickFunc={next}
                    title="Next"
                    className="rounded-none"
                    type="move"
                    disabled={nextButtonDisabledState}
                />
            </div>
        </div>
    );
}

export default EQTreasuredSecret;
