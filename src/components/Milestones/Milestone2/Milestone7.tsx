

import { CustomButton } from "../../../elements/buttons";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import Image22 from "../../../assets/image/png/22.png";
import Image23 from "../../../assets/image/png/23.png";
import Image24 from "../../../assets/image/png/24.png";
import ImageSelf1 from "../../../assets/image/milestones/self1.png";
import ImageSelf2 from "../../../assets/image/milestones/self2.png";
import IconArrow from "../../../assets/image/milestones/arrow.svg";

function SelfEsteem() {
    const navigate = useNavigate()
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/8", prevMilestoneId: "milestone2/7" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/8');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/6');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.7: What is Self-Esteem?</h3>
                <h6>Building Your Foundation</h6>
            </div>
            <div className="">
                <p>Just a reminder that you are truly one of a kind. Think of yourself as a unique masterpiece, packed with talents and strengths that make you, well, you.
                    Your self-esteem is all about how you see yourself.</p>
            </div>
            <div className="flex justify-center">
                <img src={Image22} alt="" className='w-30' />
            </div>
            <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 flex flex-col gap-4">
                <h5 className='font-bold'>Two faithful allies to your self-esteem are self-acceptance and self-compassion</h5>
                <ul className='list-decimal list-inside'>
                    <li>Self-acceptance is about recognizing and celebrating your strengths, as well as understanding your challenges. Instead of comparing yourself to others,
                        focus on being proud of who you are. Remember, everyone has their own journey, and it's perfectly okay to be exactly where you are.</li>
                    <li>Self-compassion means being kind to yourself, especially when times get tough. It's important to treat yourself like you would treat a friend who
                        is going through a rough patch. Give yourself a break and don't be too hard on yourself! </li>
                </ul>
            </div>
            <div className="flex justify-center gap-3">
                <img src={Image23} alt="" className='w-30' />
                <img src={Image24} alt="" className='w-30' />
            </div>
            <h6>Life can be a rollercoaster, right? There will be moments that lift you up and others that might make you feel a bit down.
                Whether it's moving to a new school, facing rejection or achieving a goal, each experience shapes your confidence.
                Think of them as waves that come and go, influencing your journey but never defining it. So, embrace the ride! Each moment is a chance to learn and grow.
            </h6>
            <div className="flex flex-col justify-center gap-4 items-center">
                <h4 className='font-bold text-center'>Understanding Self-Esteem vs Confidence</h4>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <div className="flex flex-col justify-center items-center">
                        <img src={ImageSelf1} alt="" className='w-40 rounded-full border-4 border-white' />
                        <h6 className='font-bold'>Self-Esteem</h6>
                    </div>
                    <img src={IconArrow} alt="" className='w-40' />
                    <div className="flex flex-col justify-center items-center">
                        <img src={ImageSelf2} alt="" className='w-40 rounded-full border-4 border-white' />
                        <h6 className='font-bold'>Confidence</h6>
                    </div>
                </div>
                <h5 className='font-bold text-center'>"Self-Esteem is your foundation. Confidence is what you build on top of it."</h5>
            </div>
            <h6 className='text-center'>Ready to test your confidence?</h6>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default SelfEsteem