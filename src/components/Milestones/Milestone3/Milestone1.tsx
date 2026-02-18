
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import Image3 from '../../../assets/image/milestones/onet.png'

function IntroMap() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/2", prevMilestoneId: "milestone3/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }
    const previous = () => {
        navigate('/milestones/milestone2/13');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-bold">M3.1: Intro: The Map</h2>
                <h6></h6>
            </div>
            <p>Imagine standing on the cusp of a new frontier, a vast expanse of uncharted territory stretching out before you, ripe with infinite possibilities for exploration. This is your career territory.
                We are here to provide you the compass of career assessments, the lantern of enlightening career videos, and the map of job outlook projections.
                Are you ready to step into the unknown and uncover your full potential?</p>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>About the O*NET Interest Profiler</h4>
                <h5>The O*NET Interest Profiler is a powerful assessment tool that will help transform your interests into concrete job ideas.
                    By completing this assessment, you'll receive personalized career suggestions based on your unique interests and preferences.
                    This is your first step in mapping out your career territory and discovering paths that align with who you are.
                    In the next screen, you'll be guided to complete the O*NET Interest Profiler assessment. This will provide you with valuable insights to inform
                    your career research and planning.
                    Next: O*NET Assessment</h5>
            </div>
            <div className="flex justify-center">
                <img src={Image3} alt="" className='w-1/2 rounded-xl' />
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default IntroMap;