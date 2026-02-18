
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

function SummaryOasis() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/1", prevMilestoneId: "milestone2/13" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/12');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.13: Oasis Summary & Commit</h3>
                <h6>In here, I will give you current confidence level.</h6>
            </div>
            <div className="">
                <h4 className='font-bold'>My Confidence Compass Rating</h4>
                <h6>Your current confidence level across all dimensions: <span className='font-bold text-ib-1'>8.2 / 10</span></h6>
                <h6>This represents your healthy confidence in navigating your personal and professional journey.</h6>
            </div>
            <div className="">
                <h4 className='font-bold'>My Oasis Reflection Notes</h4>
                <h6>Through my journey of self-discovery, I've learned that my emotional intelligence allows me to connect deeply with others while maintaining healthy boundaries.
                    My self-esteem is rooted in my authentic values and character strengths, not external validation.
                    I recognize that I am designed to thrive, and I have abundant resources to share with others from my personal oasis.
                    This foundation gives me joy, happiness, and security in the fullness of my creation.
                </h6>
            </div>
            <div className="flex flex-col gap-2">
                
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default SummaryOasis;