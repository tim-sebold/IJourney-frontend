
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';
import { CircleAlert } from "lucide-react";

import Image12 from "../../../assets/image/png/12.png";
import Image13 from "../../../assets/image/png/13.png";
import { useEffect, useState } from 'react';

const guidePosts: any = [
    {
        title: "Self-Awareness",
        text: "Instead of ignoring feelings like frustration or loneliness, Mia learned to recognize and name her emotions.",
    },
    {
        title: "Effective Problem Solving",
        text: "Instead of giving up, Mia practiced pausing, thinking through the problem, and trying again.",
    },
    {
        title: "Managing Emotions",
        text: "When Mia felt overwhelmed by her emotions, she used to suppress them or give up. But through emotional intelligence, she learned to pause instead of reacting immediately. When she felt frustrated, she took a deep breath, accurately identified her emotions, and chose how to respond. By learning to manage her emotions, Mia was able to stay present even in difficult situations.",
    },
]

function MiaStory() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [feeling, setFeeling] = useState<string>("");
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);


    useEffect(() => {
        if (user) { 
            const getResponse = async () => {
                const response = await getMilestone('milestone2_3');

                if(response) {
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
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/4", prevMilestoneId: "milestone2/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/2');
    };

    const save = async () => {
        if (!user) {
            toast.error("You need to login to post a comment.");
        } else {
            try {
                const result = await submitMilestone('milestone2_3', { userId: user?.uid, responses: { feeling } });
                setnextButtonDisabledState(false);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.3: Mia's Story</h3>
                <h6></h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={Image13} alt="" className='w-20' />
                        <h3 className='font-["Mogra"] text-yellow-500 text-[30px] font-bold uppercase'>Mia's Story</h3>
                    </div>
                    <img src={Image12} alt="" className='w-20' />
                </div>
                <p className="">
                    In a small middle school where everyone knew each other. there lived a teenager named Mia.
                    She was smart, no doubt about it. With an IQ that placed her at the top of her class, she was Known for acing tests and grasping complex concepts
                    faster than most of her peers. But Mia often felt like something was missing.
                    Despite her academic achievements, she struggled to connect with her classmates and often found herself feeling lonely.

                    One day, Mia stumbled upon an old, dusty workbook in the back of her school library. The cover read "Unlocking Your Emotional Intelligence:
                    A Guide to Success: lntrigued, she decided to take it home. As she flipped through the pages, she discovered that EQ was just as important as
                    IQ It was like having a map to navigate the sometimes tricky terrain of feelings-both her own and those of others.
                    Mia learned that while IQ helped her understand math and science, EQ would help her build friendships and understand the emotions swirling around her.
                    She read about exercises that encouraged self-reflection and as"Ked her to consider how she reacted in different social situations. Each chapter
                    made her realize how important it was to empathize with others and communicate effectively.
                    'Why were these important concepts not included in our curriculum?, she murmured, as she rolled her eyes, feeling educationally slighted by not receiving
                    this information sooner.
                    The more she worked on her emotional intelligence, the more fulfilled she felt. She started to notice the little things: the way her friends lit up
                    when she praised them, the comfort they found in her listening ear during tough times, and the
                    joy of shared laughter Mia learned that true success wasn't just about grades; it was about building relationships and navigating
                    life's ups and downs with grace Mia knew she had woven the threads of her IQ and EQ into a beautiful tapestry. She was ready to take on the world-not
                    just as a smart student but as a compassionate friend, a confident communicator, and a resilient young woman And that she realized,
                    was the key to a rich and fulfilling life.
                </p>
                <div className="">
                    <h4 className='font-bold'>The Problem</h4>
                    <h6>Mia was academically gifted, but she felt lonely and disconnected. When setbacks happened, she quickly became frustrated and often
                        gave up — and she struggled to relate naturally with her classmates.</h6>
                </div>
            </div>
            <div className="flex flex-col">
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

export default MiaStory