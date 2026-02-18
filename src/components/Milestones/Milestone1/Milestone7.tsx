
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from '../../../elements/buttons';
import { Input } from '../../../elements/input';
import { Textarea } from '../../../elements/textarea';

import ImageMountain from "../../../assets/image/png/10.png";
import { useEffect, useState } from 'react';

function StatementBuilder() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");
    const [value3, setValue3] = useState<string>("");
    const [value4, setValue4] = useState<string>("");
    const [value5, setValue5] = useState<string>("");

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const result = await getMilestone('milestone1_7');
                if (result) {
                    setValue1(result.responses.value1 as string);
                    setValue2(result.responses.value2 as string);
                    setValue3(result.responses.value3 as string);
                    setValue4(result.responses.value4 as string);
                    setValue5(result.responses.value5 as string);
                }
            }
            getResponse();
        }
    }, [user])

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone1_7', { userId: user?.uid, responses: { value1, value2, value3, value4, value5 } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/1", prevMilestoneId: "milestone1/7" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error); 
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone1/6');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold text-center">M1.7: Journeyer's Statement Builder</h3>
                <h6>Utilize the Locating Your Finisher's Spark worksheet to craft your Journeyers Statement. If you identify any demotivating feelings,
                    recognize them and take a moment to reflect on how you can progress despite these obstacles.</h6>
            </div>
            <div className="flex flex-col gap-2 mt-6">
                <div className="">
                    I, &nbsp;
                    <Input
                        value={value1}
                        type="text"
                        onChange={(e) => setValue1(e.target.value)}
                        className="border-0 inline-flex w-auto shadow-none border-b-2 border-ib border-dashed rounded-none px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    &nbsp;Officially declare that I have approached the creation of my Journeyers Statement with careful thought and reflection before
                    deciding to proceed on my IJourney path. I recognize that my personal journey has left me feeling both &nbsp;
                    <Input
                        value={value2}
                        type="text"
                        onChange={(e) => setValue2(e.target.value)}
                        className="border-0 inline-flex w-auto shadow-none border-b-2 border-ib border-dashed rounded-none px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    &nbsp;and&nbsp;
                    <Input
                        value={value3}
                        type="text"
                        onChange={(e) => setValue3(e.target.value)}
                        className="border-0 inline-flex w-auto shadow-none border-b-2 border-ib border-dashed rounded-none px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    &nbsp;, and I choose to positively harness these feelings as motivation by &nbsp;
                    <Textarea
                        value={value4}
                        rows={5}
                        onChange={(e) => setValue4(e.target.value)}
                        className="border-0 inline-flex shadow-none border-b-2 border-ib border-dashed rounded-none px-2 resize-none text-gray-800 bg-white placeholder:text-gray-400"
                    />
                    &nbsp;this workbook and journey hold significant value for me because&nbsp;
                    <Textarea
                        value={value5}
                        rows={5}
                        onChange={(e) => setValue5(e.target.value)}
                        className="border-0 inline-flex shadow-none border-b-2 border-ib border-dashed rounded-none px-2 resize-none text-gray-800 bg-white placeholder:text-gray-400"
                    />
                </div>
                <div className="flex justify-center">
                    <img src={ImageMountain} alt="" className="w-40" />
                </div>
            </div>
            <h5 className='text-center font-bold'>Use the feelings wheel to help you locate and navigate where you are emotionally.</h5>
            <h4 className='font-extrabold text-[#137070] text-center uppercase'>Clearing the path by believing in yourself</h4>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!value1 || !value2 || !value3 || !value4 || !value5}></CustomButton>
            </div>
        </div>
    )
}

export default StatementBuilder