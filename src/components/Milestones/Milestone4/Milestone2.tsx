
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Input } from '../../../elements/input';
import { Label } from '../../../elements/label';
import { Card, CardContent } from '../../../elements/card';
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

function MappingNet() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [supports, setSupports] = useState<Array<object>>([
        { name: "", role: "" },
        { name: "", role: "" },
        { name: "", role: "" },
        { name: "", role: "" },
        { name: "", role: "" }
    ])
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const roles = ["", "Mentor", "Teacher", "Peer", "Family", "Expert"];

    const isFormComplete = () => {
        return supports.every((row: any) =>
            row.name.trim() !== '' &&
            row.role.trim() !== ''
        );
    };

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone4_2');
                if (response) {
                    setSupports(response.responses.supports as Array<object>);
                    setIsSaved(true);
                }
            }
            getResponse();
        }
    }, [user])

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone4/3", prevMilestoneId: "milestone4/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone4/3');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone4/1');
    };

    const save = async () => {
        if (user) {
            try {
                const result = await submitMilestone('milestone4_2', { userId: user?.uid, responses: { supports } });
                setIsSaved(true);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error("You need to login to save a Entries.");
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-bold">M4.2: Mapping Your Network</h2>
                <h6>Create your personal "A Team" the people who will guide and cheer you on your journey to success.</h6>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>The Guiding Light</h4>
                <h5>No one succeeds alone. By naming your support system, you make it tangible and easier to activate when you face challenges.
                    Think of people who offer different types of support:</h5>
            </div>
            <div className="flex flex-col gap-6 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
                <h4 className='font-bold'>Your Support Persons</h4>
                {supports.map((item: any, index: number) =>
                    <Card key={index} className="flex flex-col w-full items-start rounded-0 overflow-hidden border-2 border-gray-300 border-dashed">
                        <CardContent className="flex flex-col items-start gap-2 pt-6 pb-5 px-6 relative w-full">
                            <div className='font-bold flex gap-2'>
                                <Users />
                                Person {index + 1}
                            </div>
                            <div className="w-full justify-between flex flex-col items-start relative">
                                <Label className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                    Name
                                </Label>
                                <div className="relative w-full">
                                    <Input
                                        value={item.name}
                                        type="text"
                                        onChange={(e) => setSupports(supports.map((support, i) => i === index ? { ...support, name: e.target.value } : { ...support }))}
                                        className="border-0 border-b border-ib rounded-none px-0 h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </div>
                            </div>
                            <div className="w-full justify-between flex flex-col items-start relative">
                                <Label className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                    Role/Category
                                </Label>
                                <div className="relative w-full">
                                    <select
                                        value={item.role}
                                        onChange={(e) => setSupports(supports.map((support, i) => i === index ? { ...support, role: e.target.value } : { ...support }))}
                                        className="border-0 border-b w-full p-2 border-ib rounded-none h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        {roles.map((item, roleIndex) => <option key={roleIndex} value={item}>{item}</option>)}
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>)}
                <div className="flex justify-center">
                    <CustomButton onClickFunc={save} title='save' className='rounded-none justify-end' type='red' disabled={!isFormComplete()}></CustomButton>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Why You Need This</h4>
                <h6>The course stresses that no one succeeds alone. By writing down names, you make your support system tangible and easier to activate when you face
                    challenges. Having different types of help available ensures you're prepared for any situation on your journey.</h6>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!isSaved}></CustomButton>
            </div>
        </div>
    )
}

export default MappingNet;