import { useEffect, useState } from "react";
import { User, MapPin } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext, submitMilestone, getMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Input } from '../../../elements/input';

function RoadwaysSummary() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [reflection, setReflection] = useState<string>("");
    const [contract, setContract] = useState<Array<object>>();
    const [resources, setResources] = useState<string[]>();
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const responseRoles = await getMilestone('milestone4_3');
                setContract(responseRoles.responses.network as Array<object>);

                const responseResources = await getMilestone('milestone4_4');
                setResources(responseResources.responses.resources as string[]);

                const response = await getMilestone('milestone4_5');
                if (response) {
                    setReflection(response.responses.reflection as string);
                    setIsCompleted(true);
                }
            }
            getResponse();
        }
    }, [user])
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone5/1", prevMilestoneId: "milestone4/5" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone5/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone4/4');
    };

    const saveTrailLog = async () => {
        if (user) {
            try {
                const result =  await submitMilestone('milestone4_5', { userId: user?.uid, responses: { reflection } });
                setIsCompleted(true);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M4.5: Roadways Summary & Commit</h3>
                <h6>Finalize your resource map and commit to using your support network</h6>
            </div>
            <div className="flex flex-col gap-6 px-6 py-8 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <div className="flex flex-row gap-3">
                    <User />
                    <span className='font-bold uppercase'>Your 5 key Contacts</span>
                </div>
                {contract && contract.map((contact: any, index: number) => {
                    return (
                        <div key={index} className="p-4 flex flex-col gap-3 border-2 border-gray-300 border-dashed">
                            <h4 className='font-bold'>{contact.name}</h4>
                            <div className="">
                                <h5>{contact.role}</h5>
                            </div>
                            <div className="flex flex-row gap-6">
                                <div className="flex flex-row gap-4 text-ib-1">
                                    <span>{contact.areaOfSupport}</span>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <span>{contact.contactGoal}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col gap-6 px-6 py-8 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="flex flex-row gap-3">
                    <MapPin />
                    <h4 className='font-bold'>Resource Inventory Checklist</h4>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col w-full gap-6">
                        {resources && resources.map((resource: string, index: number) => {
                            return (
                                <div key={index} className="flex justify-between items-center gap-10 border-2 border-ib-1 rounded-full bg-white px-8 py-2">
                                    <div className="">
                                        <h5 className='font-bold'>{resource}</h5>
                                    </div>
                                    <span className='px-3 py-1 rounded-[20px] bg-[#ff6f61] text-white'>Available</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-6 py-8">
                <h4 className='font-bold'>Your Reflection</h4>
                <h6>Take a moment to reflect on your support network. Answer one of these questions:</h6>
                <ul className='list-decimal list-inside'>
                    <li>What is your biggest fear about using your network?</li>
                    <li>Which contact will you reach out to first and why?</li>
                    <li>How do you feel about having this support system in place?</li>
                </ul>
                <div className="w-full justify-between flex flex-col items-start relative opacity-0 animate-fade-in [animation-delay:250ms]">
                    <div className="relative w-full">
                        <Input
                            value={reflection}
                            type="text"
                            onChange={(e: any) => setReflection(e.target.value)}
                            placeholder='Share your thoughts here...'
                            className="border-0 px-2 border-b border-ib rounded-none pb-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full gap-2 text-center mt-6">
                    <CustomButton onClickFunc={saveTrailLog} title='Save to My trail Log' className='rounded-none justify-end' type='red' disabled={!reflection}></CustomButton>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!isCompleted}></CustomButton>
            </div>
        </div>
    )
}

export default RoadwaysSummary;