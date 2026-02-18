import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';
import type { EmotionNode } from '../../../lib/types';

import { FeelingsWheel } from '../../FeelingsWheel/FeelingsWheel';
import { CustomButton } from "../../../elements/buttons";
import { Input } from '../../../elements/input';

import ImageMentalHealth from "../../../assets/image/milestones/mental-health.png";
import ImageLamp from "../../../assets/image/milestones/lamp.png";
import IconSparker from "../../../assets/image/milestones/sparker.svg";

function ExploreEmotion() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedEmotion, setSelectedEmotion] = useState<EmotionNode | null>(null);
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/4", prevMilestoneId: "milestone1/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone1/2');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M1.3: Exploring Your Emotions</h3>
                <h6></h6>
            </div>
            <div className="flex flex-col gap-2 items-center font-normal">
                <h6>The <span className='font-bold text-ib-1'>Feelings Wheel</span> is a powerful tool that helps you move beyond simple words like "good" or "bad" to discover more precise and nuanced emotions.
                    By identifying your specific feelings, you gain deeper self-awareness and can better understand what you're truly experiencing.</h6>
                <h6>Learning to name your emotions accurately is the first step toward emotional intelligence and personal growth. It allows you to communicate more
                    effectively, make better decisions, and respond to situations with greater clarity.</h6>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>How the Feelings Wheel Works</h4>
                <h6>The <span className='font-bold text-ib-1'>Feelings Wheel</span> is structured with core emotions in the center (like joy, fear, anger, sadness, disgust, and surprise).
                    Radiating outward from each core emotion are increasingly specific emotions that help you pinpoint exactly what you're feeling.
                    The more specific you can be about your emotions, the better you can understand and address them.</h6>
            </div>
            <div className="flex flex-col gap-4 px-6 pt-6 pb-8 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <h4 className='font-extrabold'>Locating your finisher's spark</h4>
                <p className='text-ib-2 italic'>Below are examples of emotions Mia was feeling</p>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <div className="">
                            <img src={IconSparker} alt="" className='min-w-10' />
                        </div>
                        <Input
                            value={"Joy (hopeful)"}
                            readOnly={true}
                            type="text"
                            className="border-0 sm:w-fit border-b-2 text-center font-bold text-[#4AA7F3] border-ib rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <p className='font-medium'>Be curious!  What deeper insights can you uncover about this emotion? Describe the feelings associated with it and why.</p>
                    <p className='text-[12px] underline text-ib-1'>When I went to Ari's graduation, it totally changed how I saw things.
                        Everyone there was chasing their dreams instead of just letting life happen to them. Like, none of my family has gone to college,
                        but being on that campus made me picture myself as a student.
                        I mean, I have no clue how I'd actually get there, but just thinking about it felt amazing. This workbook might help me figure things out,
                        and I'm excited about what I can discover about my.self. So, I guess I would describe it more by saying I feel hopeful."</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <div className="">
                            <img src={IconSparker} alt="" className='min-w-10' />
                        </div>
                        <Input
                            value={"Fear (insecure)"}
                            readOnly={true}
                            type="text"
                            className="border-0 sm:w-fit border-b-2 text-center font-bold text-[#4AA7F3] border-ib rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <p className='font-medium'>Be curious!  What deeper insights can you uncover about this emotion? Describe the feelings associated with it and why.</p>
                    <p className='text-[12px] underline text-ib-1'>I've never had family to tell me good things about myself like some of my friends family.
                        I know there are good things about me because I am a good person. I just have a hard time believing I am good
                        enough for great things. I want to know I have what it takes to finish it before I set my. heart on starting it. So, I feel "insecure",</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center">
                <img src={ImageMentalHealth} alt="" className='h-20' />
                <img src={ImageLamp} alt="" className='h-30' />
            </div>
            <div className="flex items-center justify-center">
                <FeelingsWheel
                    selection={true}
                    selectedEmotion={selectedEmotion}
                    onSelectEmotion={(emotion) => {
                        setSelectedEmotion(emotion);
                    }}
                />
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default ExploreEmotion