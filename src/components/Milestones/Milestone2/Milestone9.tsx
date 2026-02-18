import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext, submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from "../../../elements/textarea";

import Image25 from "../../../assets/image/png/25.png";
import Image26 from "../../../assets/image/png/26.png";
import Image27 from "../../../assets/image/png/27.png";
import Image28 from "../../../assets/image/png/28.png";
import ImageBook from "../../../assets/image/milestones/open-book.png";

function IntroCharacter() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [reflection, setReflection] = useState<string>("")

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone2_9', { userId: user?.uid, responses: { reflection } });
                const result = await unlockNext({
                    userId: user.uid,
                    milestoneId: "milestone2/10",
                    prevMilestoneId: "milestone2/9"
                });
                toast.success(result.message);
                navigate('/milestones/milestone2/10');
            } catch (error: any) {
                toast.error(error.message);
            }
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    };

    const previous = () => {
        navigate('/milestones/milestone2/8');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-bold">M2.9: Intro to Character</h2>
                <h6>Bridging emotions to character strengths</h6>
            </div>

            <div className="flex flex-col gap-2">
                <h5 className='font-bold'>From Emotions to Character</h5>
                <p>
                    Now that you've explored your emotions through the Feelings Wheel and Emotional Intelligence concepts,
                    it's time to discover your inherent character strengths. Your character — the core traits that make you uniquely you —
                    plays a crucial role in how you navigate challenges, make decisions, and pursue your dreams.
                </p>
            </div>

            <div className="flex justify-center">
                <img src={Image25} className='w-1/4' />
                <img src={Image26} className='w-1/4' />
                <img src={Image28} className='w-1/4' />
                <img src={Image27} className='w-1/4' />
            </div>

            <div className="flex flex-col gap-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
                <div className="flex items-center gap-2">
                    <img src={ImageBook} className='w-30' />
                    <h3 className='font-extrabold italic'>
                        <span className='text-[#18E930]'>KAI</span> +
                        <span className='text-[#FA3131]'> TALIA’S</span>
                        <span className='text-[#F9AF46]'> STORY</span>
                    </h3>
                </div>

                <p>
                    Once upon a time in the bustling town of Greenville, there lived a group of teens navigating the rocky terrain
                    of middle school and their futures. Among them were Kai, a bright and ambitious boy who dreamed of becoming a doctor,
                    and Talia, a creative soul who loved drawing but often doubted her abilities.
                </p>

                <p>
                    Kai was known for his confidence. He excelled academically and was a star athlete on the track team.
                    He believed that if he set his mind to something, he could achieve it. This unwavering self-belief acted as a compass,
                    guiding him through the uncertainties of adolescence. His friends admired his determination and often sought his advice —
                    from study tips to project ideas for the upcoming iJOURNEY Career Project Fair.
                </p>

                <p>
                    The fair gave students a chance to create projects reflecting their future career goals after completing the iJOURNEY program.
                    Community leaders attended to encourage students and vote on projects, awarding “Envisioning the Future” honors
                    across career-related categories.
                </p>

                <p>
                    Talia was known for her contagious smile and her colorful, hand-painted backpack. Some students even offered to pay her
                    to customize their own backpacks, but she declined, fearing she wouldn’t meet their expectations.
                    Despite her impressive artistic talent, she often compared herself to others and felt she didn’t measure up.
                </p>

                <p>
                    Her heart longed to pursue an art-related career, but a nagging inner voice told her she wasn’t good enough.
                    Instead, she considered safer, more conventional paths — like becoming an office administrator —
                    choices that felt secure but uninspiring.
                </p>

                <div className="bg-red-400 text-white p-4 rounded">
                    <strong>Backstory:</strong>  
                    Talia’s older sister had recently been promoted at work. Watching her mother celebrate with joy,
                    Talia feared she might never achieve anything worthy of that same pride.
                    Anxious thoughts convinced her it was safer not to risk failure.
                </div>

                <p>
                    “I love art, but I don’t know if I could actually make a career out of it,” Talia admitted.
                    “What if I fail and let everyone down?”
                </p>

                <p>
                    Kai smiled gently. “Everyone has strengths and weaknesses. Your art is amazing.
                    Failure is part of discovering what you’re meant to do. Remember Jordan’s story?”
                </p>

                <p>
                    Talia struggled with mental filtering — focusing on what went wrong instead of how much she had grown.
                    With Kai’s encouragement, she decided to continue exploring her strengths before making a final decision.
                </p>
            </div>

            <div className='flex flex-col gap-2'>
                <h6 className='font-bold'>Reflection Time</h6>
                <p>
                    Think about a time when your character was tested — when you showed courage, faced fear,
                    stood up for your values, or persevered through difficulty.
                    What character traits did you demonstrate?
                </p>

                <Textarea
                    value={reflection}
                    rows={5}
                    placeholder="Write your reflection here..."
                    className="resize-none bg-white border-gray-400"
                    onChange={(e: any) => setReflection(e.target.value)}
                />
            </div>

            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!reflection}></CustomButton>
            </div>
        </div>
    );
}

export default IntroCharacter;