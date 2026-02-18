import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import QuickAccessment from './Milestone1/QuickAccessment';

import ImageOasis from "../../../assets/image/milestones/oasis.png";

function Oasis() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const SQs = [
        {
            title: "always",
            selected: false
        },
        {
            title: "sometimes",
            selected: false
        },
        {
            title: "Rarely",
            selected: false
        },
        {
            title: "never",
            selected: false
        },
    ];
    const [accessments, setAccessments] = useState<Array<object>>(
        [
            {
                description: "Do you truly celebrate your successes?",
                sqs: SQs
            },
            {
                description: "Can you identify your emotions in the moment?",
                sqs: SQs
            },
            {
                description: "Do you recognize your unique strengths and character traits?",
                sqs: SQs
            }
        ]
    );
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);

    useEffect(() => {
        var count = 0;

        accessments.map((item: any) => {
            item.sqs.map((itemJ: any) => {
                if (itemJ.selected) {
                    count += 1;
                }
            })
        })

        if(count === 3) {
            setnextButtonDisabledState(false);
        }
    }, [accessments])

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const result = await getMilestone('milestone2_1');
                if (result) {
                    setAccessments(result.responses.accessments as Array<object>);
                }
            }
            getResponse();
        }
    }, [user])

    const setSelected = (index: number, index1: number) => {
        setAccessments(accessments.map((item: any, i: number) => i === index ? { ...item, sqs: item.sqs.map((itemJ: any, j: number) => j === index1 ? { ...itemJ, selected: true } : { ...itemJ, selected: false }) } : { ...item }));
    }

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone2_1', { userId: user?.uid, responses: { accessments } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/2", prevMilestoneId: "milestone2/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/2');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone1/7');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.1: Intro Your Oasis</h3>
                <h6></h6>
            </div>
            <h5>Think of this stage in your journey as a voyage of self-discovery, a quest to uncover your unique strengths, gems, treasures and traits. Picture these
                qualities as an internal oasis within you: a flourishing haven in the midst of a desert, bubbling with life-giving water, with hidden gems kept in secret
                treasure chests. When you tap into this life-giving ground within, you're not just nourishing yourself, but also discovering how you can offer solutions
                and provide value to fellow travelers on their own journeys.</h5>
            <div className="flex justify-center">
                <img src={ImageOasis} alt="InnerCompass" className="rounded-xl border-8 border-white" />
            </div>
            <div className="flex flex-col justify-start gap-2 px-6 py-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <h4 className='font-bold'>Quick Self-Assessment</h4>
                <h6>This quick quiz isn't scored—it's designed to help you set an intention for your introspective journey ahead.</h6>
                <ul className="flex flex-col gap-6">
                    {
                        accessments.map((item: any, index: number) => (
                            <li key={index} className='flex flex-col gap-2'>
                                <h6 className='font-bold'>{item.description}</h6>
                                <QuickAccessment SQs={item.sqs} index={index} setSelected={setSelected} />
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex justify-between">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={nextButtonDisabledState}></CustomButton>
            </div>
        </div>
    )
}

export default Oasis