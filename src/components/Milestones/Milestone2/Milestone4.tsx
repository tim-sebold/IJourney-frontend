
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';
import { CircleAlert } from "lucide-react";

import Image14 from "../../../assets/image/png/14.png";
import Image13 from "../../../assets/image/png/13.png";
import Image15 from "../../../assets/image/png/15.png";
import Image16 from "../../../assets/image/png/16.png";

const guidePosts: any = [
    {
        title: "Self-Awareness",
        text: "Jordan learned to recognize emotions like frustration and embarrassment instead of hiding them.",
    },
    {
        title: "Effective Problem Solving",
        text: "When faced with difficulties, you don't panic or give up. You pause, break the problem down into smaller parts, and identify the aspects you can control. Instead of reacting impulsively, you choose deliberate steps that allow you to move forward.",
    },
    {
        title: "Managing Emotions",
        text: "Serves as your emotional steering wheel, When the road gets rough with stress, you'll be able to pull over, breathe, and steer clear of impulsive wrong turns",
    },
]

function JordanStory() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [feeling, setFeeling] = useState<string>("");
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone2_4');

                if (response) {
                    setFeeling(response.responses.feeling as string);
                    setnextButtonDisabledState(false);
                }
            }
            getResponse();
        }
    }, [user])
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/5", prevMilestoneId: "milestone2/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/3');
    };

    const save = async () => {
        if (!user) {
            toast.error("You need to login to post a comment.");
        } else {
            try {
                const result = await submitMilestone('milestone2_4', { userId: user?.uid, responses: { feeling } });
                setnextButtonDisabledState(false);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6 text-[#5C5C5C] text-[14px]">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.4: Jordan's Story</h3>
                <h6></h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={Image13} alt="" className='w-20' />
                        <h3 className='font-["Mogra"] text-[#3DDA16] text-[30px] font-bold uppercase'>Jordan's Story</h3>
                    </div>
                    <img src={Image14} alt="" className='w-20' />
                </div>
                <h5>Once upon a time in a bustling middle school, there was a boy named Jordon. He was an average student with a passion for music,
                    but when it came to science, he found himself struggling. The concepts felt foreign, and the numbers danced around in his mind,
                    leaving him lost and frustrated.

                    One fateful day, the results of his science exam were handed back to the class. As Jordan stared at the red ink glaring at him from
                    the paper-an unforgiving "F"-his heart sank without thinking, he ripped the paper in half, his anger boiling over. "This is why I don't try in this class. I hate science,
                    and I'm never going to pass!" he yelled, his voice echoing through the room. The humiliation mixed with rage fueled his rebellion.
                    In the weeks that followed, Jordan stopped attending science class altogether. On the rare occasions he did show up, he would sit in the back, hoodie
                    pulled over his head, trying to disappear into the fabric. When the teacher droned on about chemical reactions, he buried his head on the desk
                    opting for a nap over the struggle.</h5>
                <div className="flex flex-row justify-center">
                    <img src={Image15} alt="" className='w-1/4' />
                </div>
                <h5>As the next test date approached, Jordan's apathy deepened. He sat with a dark cloud looming over him, convinced that there was no point in
                    even glancing at the material. When his teacher asked to meet with him after class, she expressed her concern. "I've noticed you haven't
                    been putting in much effort lately. If you want to pass, you need to start showing that you care about your work" she said, her voice firm but concerned.

                    "Nah, what's the use.....I'm cool", he replied, dismissing her words. Inside, he thought, "I can handle failing without effort, but I can't
                    withstand putting in effort and not passing." This mindset became his shield, a wall he fortified with each negative thought.
                    Slowly he found himself withdrawing from all aspects of school, and even his friends began to fade away. Unable to reach the boy who had become a
                    ghost of his former self.

                    As time passed, Jordan's grades in other subjects slipped as well, falling to a point where he was at risk of not moving into the ninth grade.
                    He reasoned that if he couldn't succeed in science, then why bother trying in any class? He hid behind his headphones whenever conversations
                    turned positive, retreating into a bubble of emotional safety. By the time his peers were gearing up for their senior year, Jordan had
                    dropped out of school, stuck in a dead-end job that drained him, yet offered a false sense of stability.</h5>
                <div className="">
                    <h4 className='font-bold'>The Problem: Failure & Frustration</h4>
                    <p>Jordan failed not because he lacked interest, but because he felt lost.
                        Science was too difficult for him. The numbers seemed jumbled, the classes moved too quickly, and every failure felt like a personal problem. 
                        Every time he struggled, frustration overwhelmed him. He closed off, avoided asking for help, and began to believe he wasn't "good enough."
                        Over time, Jordan became disconnected from both school and himself.
                    </p>
                </div>
                <div className="">
                    <h4 className='font-bold'>The Discovery: Auditory Learning</h4>
                    <p>Through self-awareness and support from those around him, Jordan realized that he learned best by listening. This realization changed his learning style and how he viewed himself.</p>
                </div>
                <div className="">
                    <h4 className='font-bold'>The Transformation: New Strategy</h4>
                    <p>Jordan recorded his lectures, listened to them instead of rereading them, and even made short songs from his notes. Learning became easier, his confidence grew, and his grades gradually improved.
                        This demonstrates that Jordan is actively participating in his own growth..</p>
                </div>
            </div>
            <div className="flex flex-col mt-10">
                <h4 className='text-center font-bold'>The Resolution — Practicing Emotional Intelligence</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {guidePosts.map((item: any, index: number) => (
                        <div key={index} className="flex flex-row items-start justify-start gap-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-6">
                            <div className="w-[30px]">
                                <CircleAlert size={30} className='h-fit' />
                            </div>
                            <div className="flex flex-col gap-2 wrap-anywhere">
                                <h4 className='font-bold'>{`${index + 1}. ${item.title}`}</h4>
                                <h6>{item.text}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <img src={Image16} alt="" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="">
                    <h5 className='font-bold'>Try a short EQ practice</h5>
                    <h6>Name the emotion you feel right now and write one sentence about why.</h6>
                </div>
                <Textarea
                    value={feeling}
                    placeholder="Describe the Your Feeling..."
                    rows={5}
                    onChange={(e: any) => setFeeling(e.target.value)}
                    className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                />
                <div className="flex justify-center">
                    <CustomButton onClickFunc={save} title='save' className='rounded-full justify-end' type='red' disabled={!feeling}></CustomButton>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={nextButtonDisabledState}></CustomButton>
            </div>
        </div>
    )
}

export default JordanStory