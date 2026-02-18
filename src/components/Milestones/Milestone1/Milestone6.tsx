import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from '../../../elements/buttons';
import { Input } from '../../../elements/input';
import { Textarea } from '../../../elements/textarea';

import ImageMentalHealth from "../../../assets/image/milestones/mental-health.png";
import ImageLamp from "../../../assets/image/milestones/lamp.png";
import IconSparker from "../../../assets/image/milestones/sparker.svg";

function GuidingQuestions() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [emotion1, setEmotion1] = useState<string>("");
    const [emotion2, setEmotion2] = useState<string>("");
    const [associateFeeling1, setAssociateFeeling1] = useState<string>("");
    const [associateFeeling2, setAssociateFeeling2] = useState<string>("");
    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone1_6', { userId: user?.uid, responses: { emotion1, emotion2, associateFeeling1, associateFeeling2 } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/7", prevMilestoneId: "milestone1/6" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/7');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const result = await getMilestone('milestone1_6');
                if (result) {
                    setEmotion1(result.responses.emotion1 as string);
                    setEmotion2(result.responses.emotion2 as string);
                    setAssociateFeeling1(result.responses.associateFeeling1 as string);
                    setAssociateFeeling2(result.responses.associateFeeling2 as string);
                }
            }
            getResponse();
        }
    }, [user])


    const previous = () => {
        navigate('/milestones/milestone1/5');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M1.6: The Guiding Questions</h3>
                <h6>These deep, reflective questions will help you clarify your purpose. You don't have to write your final statement yet—just think about the answers.</h6>
            </div>
            <div className="flex flex-col gap-2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
                <h4 className='font-bold text-center'>Reflection Prompts</h4>
                <div className="text-ib-5 font-normal flex flex-col gap-2">
                    <span className="font-bold">Take a moment to consider these core questions from your iJourney manual:</span>
                    <div className="flex flex-col justify-between md:flex-row items-center">
                        <ul className="list-decimal list-inside">
                            <li>What causes or ideas are you most passionate about?</li>
                            <li>What kind of impact do you want your life to have on others?</li>
                            <li>What challenges are you willing to endure to achieve your goals?</li>
                        </ul>
                        <img src={ImageLamp} alt="" className='h-30' />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>How the Feelings Wheel Works</h4>
                <h6>The <span className='font-bold text-ib-1'>Feelings Wheel</span> is structured with core emotions in the center (like joy, fear, anger, sadness, disgust, and surprise).
                    Radiating outward from each core emotion are increasingly specific emotions that help you pinpoint exactly what you're feeling.
                    The more specific you can be about your emotions, the better you can understand and address them.</h6>
            </div>
            <div className="flex flex-col gap-4 px-6 pt-6 pb-8 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <h4 className='font-bold'>Locating your finisher's spark</h4>
                <p><span className='font-bold'>Identity</span> and <span className='font-bold'>Reflect</span> on at least two emotions you have completing this workbook.</p>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <div className="">
                            <img src={IconSparker} alt="" className='min-w-10' />
                        </div>
                        <Input
                            value={emotion1}
                            onChange={(e) => setEmotion1(e.target.value)}
                            type="text"
                            className="border-0 sm:w-fit border-b-2 text-center font-bold text-[#4AA7F3] border-ib rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <p className='font-medium'>Be curious!  What deeper insights can you uncover about this emotion? Describe the feelings associated with it and why.</p>
                    <Textarea
                        value={associateFeeling1}
                        placeholder="Describe the situation..."
                        rows={5}
                        onChange={(e) => setAssociateFeeling1(e.target.value)}
                        className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <div className="">
                            <img src={IconSparker} alt="" className='min-w-10' />
                        </div>
                        <Input
                            value={emotion2}
                            onChange={(e) => setEmotion2(e.target.value)}
                            type="text"
                            className="border-0 sm:w-fit border-b-2 text-center font-bold text-[#4AA7F3] border-ib rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <p className='font-medium'>Be curious!  What deeper insights can you uncover about this emotion? Describe the feelings associated with it and why.</p>
                    <Textarea
                        value={associateFeeling2}
                        placeholder="Describe the situation..."
                        rows={5}
                        onChange={(e) => setAssociateFeeling2(e.target.value)}
                        className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                    />
                </div>
            </div>
            <h5 className="text-[#338dd6] font-extrabold text-center">Use the feelings wheel to help you locate and navigate where you are emotionally.</h5>
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <h5 className="bg-[#1c6097] p-4 rounded-2xl text-white uppercase font-bold flex-1">
                    It is okay to take a pause and reach out someone you trust for support, like a mentor or couselor at any moment,
                </h5>
                <img src={ImageMentalHealth} alt="" className='h-20' />
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!emotion1 || !associateFeeling1 || !emotion2 || !associateFeeling2}></CustomButton>
            </div>
        </div>
    )
}

export default GuidingQuestions