import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Input } from '../../../elements/input';

function CareerDiscovery() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [careers, setCareers] = useState<Record<string, string>>({
        c1: '',
        c2: '',
        c3: ''
    });

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone3_3');
                if(response) {
                    setCareers(response.responses.careers as Record<string, string>);
                }
            }
            getResponse();
        }
    }, [user])

    const allFilled = Object.values(careers).every(value => value.trim() !== '');

    const handleChange = (field: string, value: string) => {
        setCareers(prev => ({ ...prev, [field]: value }));
    };

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone3_3', { userId: user?.uid, responses: { careers } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/4", prevMilestoneId: "milestone3/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/2');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M3.3: Career Discovery Input</h3>
                <h6></h6>
            </div>
            <h6>This screen is where you take the findings from your external O*NET Interest Profiler and formally record them into the iJOURNEY platform. Enter three potential
                career paths that aligned with your interests during the O*NET assessment.</h6>
            <div className="flex flex-col bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
                <ul className="flex flex-col gap-4 list-decimal list-inside">
                    {['c1', 'c2', 'c3'].map((key, index) => (
                        <li key={key} className="text-[20px]">
                            <label className="font-bold">Career Path {index + 1}</label>
                            <Input
                                placeholder={`e.g, ${[
                                    'Anthropologist',
                                    'Equal Opportunity Officer',
                                    'Archaeologist'
                                ][index]}`}
                                type="text"
                                value={careers[key as keyof typeof careers]}
                                onChange={(e: any) => handleChange(key, e.target.value)}
                                className="border-0 border-b-2 px-2 border-ib rounded-none pb-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <h5 className='text-center font-bold'>These careers will populate your Career Research Log (M3.5) and Lifestyle Calculator </h5>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className={`rounded-none justify-end ${!allFilled ? 'opacity-50 cursor-not-allowed' : ''}`} type='move' disabled={!allFilled}></CustomButton>
            </div>
        </div>
    )
}

export default CareerDiscovery;