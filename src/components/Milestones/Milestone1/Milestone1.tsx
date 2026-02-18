
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import ImageInnerCompass from "../../../assets/image/milestones/inner-compass.png";

function InnerCompass() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/2", prevMilestoneId: "milestone1/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = async () => {
        navigate('/milestones/milestone0/2');
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M1.1: Your Inner Compass</h3>
                <h6></h6>
            </div>
            <h5>Think of this phase in your journey as an opportunity to discover your "why"—the reason you started and the motivation that will keep you going.
                Your final <span className='font-bold text-ib-1'>Journeyer's Statement</span> should be a strong and inspiring reminder that helps you push through tough times or moments when the journey requires
                more strength. This statement will serve as your personal mantra, keeping you focused and energized as you work towards your goals.</h5>
            <div className="flex flex-col justify-center items-center">
                <img src={ImageInnerCompass} alt="InnerCompass" className="rounded-xl border-8 border-white" />
            </div>
            <div className="flex justify-between">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default InnerCompass