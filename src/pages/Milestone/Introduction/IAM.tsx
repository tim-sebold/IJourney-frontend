
import { CustomButton } from "../../../elements/buttons";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from "../../../controllers/courseController";
import toast from "react-hot-toast";

import Image1 from "../../../assets/image/png/5.png";
import Image2 from "../../../assets/image/png/4.png";

function IAM() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone0/2", prevMilestoneId: "milestone0/1" });
                console.log(result)
                toast.success(result.message);        
                navigate('/milestones/milestone0/2');
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <div className="font-bold sm:text-[18px]">
                    <h3>I AM: You Are the Journey</h3>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-ib-5">
                    <h5>You're the explorer, embarking on an exciting journey towards a land of purpose. Can you see it? It's your future, waiting for you—an undiscovered island full of potential.
                        Can you feel it? It's your future, expanding like a pair of wide-angle binoculars, showing you sights you've only dared to dream of.</h5>
                    <p className="font-bold">You're not just on this journey—you are the journey. And oh, what adventure lies ahead!</p>
                </div>
            </div>
            <div className="flex md:flex-row justify-between gap-4 flex-col">
                <div className="images flex flex-row md:flex-col justify-center items-center">
                    <div className="w-30">
                        <img src={Image1} alt="" className="" />
                    </div>
                    <div className="w-30">
                        <img src={Image2} alt="" className="" />
                    </div>
                </div>
                <div className="flex flex-col items-start p-6">
                    Imagine this workbook as your personal map, guiding you on an introspective journey filled with enlightening discoveries and tools for growth.
                    These discoveries are pointing you towards more than a paycheck, but a dazzling reflection of your unique passions and values packaged in the form of a career.
                    It's a mirror, revealing who you truly are and who you aspire to be. Be mindful—this journey of self-discovery requires more than a sprinkle of endurance and a dash of mental fitness to keep you on track.
                    <p className="font-bold">So, grab your backpack and get ready to collect all the treasures and tools along the path for each part of your journey!</p>
                </div>
            </div>
            <div className="flex justify-end">
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default IAM