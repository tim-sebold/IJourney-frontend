
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import ImageHeader from '../../../assets/image/guide-posts/title.png';

import { heroSectionData } from '../../../datas/landingData';

const guidePosts: any = [
    {
        title: "Self-Awareness",
        text: "You begin to notice what's actually happening within yourself. You become aware of your emotions, your behavioral patterns, your strengths, and the areas where you are ready to grow. Self-awareness becomes your compass.",
    },
    {
        title: "Effective Problem Solving",
        text: "Instead of reacting impulsively, take a step back. Clearly assess the situation, think things through, and choose a solution that is actually effective, without being swayed by momentary emotions.",
    },
    {
        title: "Managing Emotions",
        text: "Emotions can surge in an instant. But you'll learn to pause before your emotions take over. Take a breath, compose yourself, and respond calmly instead of reacting impulsively.",
    },
    {
        title: "Smart Decision Making",
        text: "Balance what you feel with what you know. Emotions inform you, but they don't control you. This is where clear judgment leads to confident choices.",
    },
    {
        title: "Using Empathy in Relationships",
        text: "Learn to listen genuinely. Understand others without losing yourself. Empathy becomes a bridge that deepens trust and connection.",
    }, {
        title: "Taking Responsibility for Actions",
        text: "Take responsibility for your choices, even the difficult ones. Admitting mistakes helps build trust. Taking action to correct wrongs makes you stronger.",
    },
]

function GuidePost6() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/3", prevMilestoneId: "milestone2/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/3');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }
    const previous = () => {
        navigate('/milestones/milestone2/1');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.2: The 6 Guideposts to EQ</h3>
                <h6></h6>
            </div>
            <div className="flex flex-col gap-4">
                <h4 className='font-bold text-center'>Compass Points for Emotional Wisdom</h4>
                <h6 className='text-center'>Here are six core skills to guide you through emotions and choices.</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
                    {
                        guidePosts.map((item: any, index: number) => (
                            <div key={index} className="flex flex-col md:flex-row items-start justify-start gap-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-6">
                                <div className="p-2 border-2 border-ib-1 rounded-full">
                                    <img src={heroSectionData.guidePosts[index].image} alt="" className="rounded-full w-10 h-10 min-h-10 min-w-10" />
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
                <div className="flex flex-col gap-4 relative" id="guide">
                        <div className="border-2 border-ib-2 border-dashed h-full absolute left-[50%] z-1"></div>
                        <div className="flex flex-col justify-center items-center z-2">
                            <img src={ImageHeader} alt="" className="w-[300px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 gap-y-10">
                            {heroSectionData.guidePosts.map((post, index) => (
                                index % 2 === 0 ? (
                                    <div key={index} className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors ${post.hoverBgColor} justify-between items-center sm:rounded-[200px_0px_0px_200px] ${post.bgColor} p-3 pr-2 max-w-[200px] text-black font-bold opacity-0 animate-fade-in [animation-delay:${index + 1}00ms]`}>
                                        <div className={`p-1 ${post.ImageColor} rounded-full`}>
                                            <img src={post.image} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span>{post.number}.</span>
                                            <span>{post.description}</span>
                                        </div>
                                    </div>
                                ) :
                                    (
                                        <div key={index} className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors ${post.hoverBgColor} justify-between items-center sm:rounded-[0px_200px_200px_0px] ${post.bgColor} p-3 pl-2 max-w-[200px] text-black font-bold opacity-0 animate-fade-in [animation-delay:${index}00ms]`}>
                                            <div className="flex flex-col">
                                                <span>{post.number}.</span>
                                                <span>{post.description}</span>
                                            </div>
                                            <div className={`p-1 ${post.ImageColor} rounded-full`}>
                                                <img src={post.image} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                            </div>
                                        </div>
                                    )
                            ))}
                        </div>
                    </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    );
};

export default GuidePost6;