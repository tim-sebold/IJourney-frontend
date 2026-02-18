import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';
import { milestoneData } from '../../../datas/milestoneData';

import { CustomButton } from "../../../elements/buttons";
import { images } from '../../../lib/utils';
import { Card, CardContent } from '../../../elements/card';

type CharacterStrength = {
    title: string;
    content: string[];
};

function IntroCharacter() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedCharacterStrengths, setSelectedCharacterStrengths] = useState<CharacterStrength[]>([]);


    useEffect(() => {
        if (!user) return;

        const getResponse = async () => {
            const response = await getMilestone('milestone2_10');
            console.log(response);

            if (response?.responses?.selectedCharacterStrengths) {
                setSelectedCharacterStrengths(
                    response.responses.selectedCharacterStrengths as CharacterStrength[]
                );
            }
        };

        getResponse();
    }, [user]);

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone2_10', { userId: user?.uid, responses: { selectedCharacterStrengths } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/11", prevMilestoneId: "milestone2/10" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/11');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/9');
    };

    const selectCharacters = (data: CharacterStrength) => {
        setSelectedCharacterStrengths(prev => {
            const alreadySelected = prev.some(item => item.title === data.title);

            if (alreadySelected) {
                // remove it
                return prev.filter(item => item.title !== data.title);
            } else {
                // add it
                return [...prev, data];
            }
        });
    };

    useEffect(() => {
        console.log(selectedCharacterStrengths)
    }, [selectedCharacterStrengths]);


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.10: The 24 Character Strengths</h3>
                <h6>Select the character strengths</h6>
            </div>
            <div className="flex flex-col">
                <h5>Pick character strengths that you believe you have</h5>
                <a href='https://www.viacharacter.org/survey/account/register' target='blank' className='text-ib-2 font-bold underline'>https://www.viacharacter.org/survey/account/register</a>
            </div>
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Object.entries(images).map(([path, src], index) => {
                        const name = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'image';
                        const strength = milestoneData.characterStrengths[index];

                        const isSelected = selectedCharacterStrengths.some(
                            item => item.title === strength.title
                        );

                        return (
                            <Card key={index} onClick={() => selectCharacters(strength)} className={`flex flex-col w-full items-start rounded-0 overflow-hidden border-2 border-gray-300 border-dashed cursor-pointer hover:border-gray-500 active:scale-90 ${isSelected && 'border-gray-800'}`}>
                                <CardContent className="flex flex-col items-start gap-2 pt-6 pb-5 px-6 relative w-full">
                                    <div className="flex items-center justify-center w-full">
                                        <img
                                            key={name}
                                            src={src}
                                            alt={name}
                                            className="rounded-xl border-4 border-ib-1 transition-transform hover:scale-105 w-1/2 min-w-[100px]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between h-full w-full">
                                        <div className="flex justify-center">
                                            <h4 className='font-bold text-center text-ib-1'>{milestoneData.characterStrengths[index].title}</h4>
                                        </div>
                                        <ul className='list-decimal list-inside'>
                                            {milestoneData.characterStrengths[index].content.map((item: any, index: number) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex-1 flex justify-center">
                    <img src='https://i.postimg.cc/d1tvNv6Q/42.png' alt='Image2' className='w-2/3' />
                </div>
                <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 flex-1">
                    <h5 className='font-bold mb-5'>Selected Characters :</h5>
                    <div className="flex flex-col gap-1 px-8">
                        {
                            selectedCharacterStrengths.map((item: any, index: number) => (
                                <p key={index} className='text-ib-1 font-bold'>{item.title}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={selectedCharacterStrengths.length === 0}></CustomButton>
            </div>
        </div>
    )
}

export default IntroCharacter;