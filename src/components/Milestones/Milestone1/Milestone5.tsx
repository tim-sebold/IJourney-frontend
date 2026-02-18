

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';;
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { Input } from '../../../elements/input';
import { Label } from '../../../elements';
import { CustomButton } from '../../../elements/buttons';

import ImageMountain from "../../../assets/image/png/10.png";

const items = [
    { value: "Integrity" },
    { value: "Trust" },
    { value: "Security" },
    { value: "Family" },
    { value: "Perseverance" },
    { value: "Freedom" },
    { value: "Growth" },
    { value: "Leadership" },
    { value: "Excellence" },
    { value: "Kindness" },
    { value: "Innovation" },
    { value: "Balance" }
]

function IdentifyTrueNorth() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [checkedItems, setCheckedItems] = useState<Array<any>>([]);
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);

    const toggleCheckbox = async (id: number, value: string) => {
        if (checkedItems.filter(item => item.id === id).length > 0) {
            await setCheckedItems(checkedItems.filter(item => item.id !== id));
        } else {
            await setCheckedItems([...checkedItems, { id, value }]);
        }
    };

    useEffect(() => {
        if (checkedItems.length >= 3) setnextButtonDisabledState(false);
        else setnextButtonDisabledState(true);
    }, [checkedItems.length]);

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const result = await getMilestone('milestone1_5');
                if (result) {
                    setCheckedItems(result.responses.trueNorth as Array<object>);
                }
            }
            getResponse();
        }
    }, [user])

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone1_5', { userId: user?.uid, responses: { trueNorth: checkedItems } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/6", prevMilestoneId: "milestone1/5" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/6');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone1/4');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M1.5: Identifying Your True North</h3>
                <h6>A <span className='font-bold text-ib-1'>"True North"</span> is a fixed point that guides you, like a compass.</h6>
            </div>
            <div className="flex flex-col gap-4 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-8">
                <h5 className=''>Please read the list below and select the <span className='font-bold'>Three</span> values that are most important to you.</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-start p-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-row gap-2 justify-start">
                            <Input
                                id={item.value}
                                type="checkbox"
                                checked={checkedItems.filter(item => item.id === index + 1).length > 0}
                                onChange={() => toggleCheckbox(index + 1, item.value)}
                                className="border-0 w-auto shadow-none border-b border-ib rounded-none px-0 h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Label htmlFor={item.value}>{item.value}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-8">
                <h4 className='font-extrabold'>Journeyer's Statement</h4>
                <h6 className=''>Utilize <span className='font-bold'>the Locating Your Finisher's Spark</span> worksheet to craft your Journeyers Statement. If you identify any demotivating feelings,
                    recognize them and take a moment to reflect on how you can progress despite these obstacles.</h6>
                <div className="flex justify-center">
                    <img src={ImageMountain} alt="" className="w-40" />
                </div>
                <div className="tracking-[0.4px] leading-7">
                    I, <span className="border-b-2 px-4 pb-1 font-bold">Kayla</span> officially declare that I have approached the creation of my <span className='font-bold text-ib-1'>Journeyer's Statement</span> with careful
                    thought and reflection before deciding to proceed on my iJourney path. I recognize that my personal journey has left me feeling both hopeful and
                    <span className="border-b-2 px-4 pb-1 font-bold">Insecure</span>,
                    and I choose to positively harness these feelings as motivation by <span className="border-b-2 px-4 pb-1 font-bold">focusing on my possibilities rather than blocking my own future with insecurities</span>
                    This workbook and journey hold significant value for me because <span className="border-b-2 px-4 pb-1 font-bold">I want the good things I find about myself to be the whispers I hear when I doubt myself.
                        I want to understand who I am so that I can be more confident in setting goals that lead to living on purpose.</span>
                </div>
            </div>
            <h4 className='font-extrabold text-[#137070] text-center uppercase'>Clearing the path by believing in yourself</h4>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={nextButtonDisabledState}></CustomButton>
            </div>
        </div>
    )
}

export default IdentifyTrueNorth