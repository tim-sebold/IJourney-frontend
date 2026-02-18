
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import Image43 from "../../../assets/image/png/43.png";

function GemsInTreasureChest() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/13", prevMilestoneId: "milestone2/12" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/13');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/11');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.12: Gems In Treasure Chest</h3>
                <h6>Finalize your self-discovery by placing your top character strengths into your Virtuous Treasure Chest.
                    These gems represent your inner resources for your journey ahead.</h6>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold uppercase'>It's your turn</h4>
                <h6>The free VIA Youth Character Strengths assessment is super easy to use, consists of 98 questions and takes about 15 minutes to complete.</h6>
                <a href="https://viacharacter.org/surveys/takesurvey" className='text-ib-1 underline font-bold text-[12px] md:text-[16px]'>https://viacharacter.org/surveys/takesurvey</a>
                <div className="flex flex-col md:flex-row justify-between">
                    <h6>
                        Once you're done, you'll discover your top strength! After that, just click the link to see the rest of your results,
                        which will be sorted from strongest to least strong. (You can even save your results as a PDF for later.)

                        List your top 10 character strengths, which we will title as your "Gem" and the value category as your "Virtuous Treasure Chest".
                        Example Report Result: TEAMWORK ( Justice): Working well with a group; being loyal to the team; doing my part.</h6>
                    <div className="flex justify-center">
                        <img src={Image43} alt="" className='' />
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default GemsInTreasureChest;