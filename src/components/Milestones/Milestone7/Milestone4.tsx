
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CompletionCard } from './components/CompletionCard';
import { CertificateCard } from './components/CertificateCard';
import { NextStepsCard } from './components/NextStepCard';
import { CustomButton } from "../../../elements/buttons";

function CelebrationCompletion() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone7/5", prevMilestoneId: "milestone7/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone7/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone7/3');
    };

    const download = async () => {
        console.log("download");
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M7.4: Celebration & Completion</h3>
                <h6>Congratulations on Completing Your iJourney!</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <CompletionCard />
                    <CertificateCard name={user?.displayName} downloadFunc={download} />
                    <NextStepsCard />

                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default CelebrationCompletion;