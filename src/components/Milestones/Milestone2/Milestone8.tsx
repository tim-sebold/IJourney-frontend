
import { useEffect, useState } from "react";
import { CustomButton } from "../../../elements/buttons";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { Input } from "../../../elements";

import Image7 from "../../../assets/image/png/7.png";
import Image33 from "../../../assets/image/png/33.png";
import Image35 from "../../../assets/image/png/36.png";
import Image36 from "../../../assets/image/png/33.png";
import Image37 from "../../../assets/image/png/37.png";
import Image18 from "../../../assets/image/png/18.png";
import Image19 from "../../../assets/image/png/19.png";

type Trait = {
    /** The bolded name shown in the reference table; the checkbox shows `text` only. */
    lead?: string;
    text: string;
};

type ConfidenceGroup = {
    /** Firestore key this group is stored under. */
    id: 'overlyHigh' | 'healthy' | 'low';
    label: string;
    description: string;
    traits: Trait[];
};

/**
 * One source for both tables on this page: the checkbox list and the "Degrees of
 * Confidence" reference table below it. They used to be two hand-maintained copies,
 * which is how the two HEALTHY traits below ended up merged into one checkbox.
 */
const CONFIDENCE_GROUPS: ConfidenceGroup[] = [
    {
        id: 'overlyHigh',
        label: 'OVERLY HIGH',
        description:
            'Feeling "better than" others. Overly focused on their self-importance and overlook their flaws. ' +
            'May act entitled. This attitude leads them to criticize others while seeking validation.',
        traits: [
            { lead: 'Demanding', text: 'May demand special treatment or expect others to do things for them.' },
            { lead: 'Ungrateful', text: 'May not show gratitude' },
            { lead: 'Selfish', text: "May only see their own needs and feel the rules don't apply to them" },
            { lead: 'Deserving', text: "May feel like they deserve something they haven't earned." },
            { lead: 'Need for attention', text: 'May have a constant need to be the center of attention.' },
        ],
    },
    {
        id: 'healthy',
        label: 'HEALTHY',
        description:
            'In humility, having a clear and balanced self-view. Believe that everyone has strengths and weaknesses. ' +
            'They have realistic expectations and normalize not succeeding at everything. They embrace their own unique ' +
            'abilities and appreciate the gifts of others.',
        traits: [
            { text: 'Comfortable in expressing needs and opinions' },
            { text: 'Confident in ability to make decisions' },
            { text: 'Able to form secure and honest relationships, and stop unhealthy ones' },
            { text: "Able to deal with life's curveballs and setbacks" },
        ],
    },
    {
        id: 'low',
        label: 'LOW',
        description:
            'Feeling "less than" others. Care more about what others think than their own feelings. They often find it ' +
            'hard to accept compliments, focus on their flaws, and worry about failing. This can make them feel like ' +
            'others are better than they are.',
        traits: [
            { lead: 'All-or-nothing thinking', text: 'You see things as either all good or all bad' },
            { lead: 'Overgeneralization', text: 'You assume that one negative fact or event creates a general rule for your life' },
            { lead: 'Mental filtering', text: 'You focus only on the negative aspects of life, dwell on them' },
            { text: 'Turning positives into negatives' },
            { lead: 'Jumping to negative conclusions', text: 'You assume the worst, even when you have no evidence to support it' },
            { lead: 'Mistaking feelings for facts', text: "You feel stupid, lazy, or ugly, so determine that it's true" },
            { lead: 'Personalizing everything', text: 'You assume everything negative has something to do with you' },
        ],
    },
];

const GROUP_INDEX_BY_ID: Record<string, number> = Object.fromEntries(
    CONFIDENCE_GROUPS.map((group, index) => [group.id, index])
);

function Confidence() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [checkedItems, setCheckedItems] = useState<{ [groupIndex: number]: number[] }>({});

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                // Nothing saved yet: the API 404s until the first submission.
                const response = await getMilestone('milestone2_8').catch(() => null);
                if (!response) return;

                const selected = (response.responses.selected ?? {}) as Record<string, unknown>;
                const preChecked: { [groupIndex: number]: number[] } = {};

                Object.entries(selected).forEach(([groupId, traits]) => {
                    const groupIndex = GROUP_INDEX_BY_ID[groupId];
                    if (groupIndex === undefined || !Array.isArray(traits)) return;

                    // Match saved trait text back to its checkbox; wording that has since
                    // changed simply doesn't match and is left unchecked.
                    preChecked[groupIndex] = traits
                        .map((trait) =>
                            CONFIDENCE_GROUPS[groupIndex].traits.findIndex((t) => t.text === trait)
                        )
                        .filter((i) => i !== -1);
                });

                setCheckedItems(preChecked);
            }
            getResponse();
        }
    }, [user])

    const handleCheckboxChange = (groupIndex: number, itemIndex: number) => {
        setCheckedItems(prev => {
            const currentGroup = prev[groupIndex] || [];
            const isAlreadyChecked = currentGroup.includes(itemIndex);
            const newGroup = isAlreadyChecked
                ? currentGroup.filter(i => i !== itemIndex)
                : [...currentGroup, itemIndex];
            return { ...prev, [groupIndex]: newGroup };
        });
    };

    const getSelectedTraits = () =>
        Object.fromEntries(
            CONFIDENCE_GROUPS.map((group, groupIndex) => [
                group.id,
                (checkedItems[groupIndex] || []).map((i) => group.traits[i].text),
            ])
        );
    const next = async () => {
        const selected = getSelectedTraits();

        if (user) {
            try {
                await submitMilestone('milestone2_8', { userId: user?.uid, responses: { selected } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/9", prevMilestoneId: "milestone2/8" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/9');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/7');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.8: Healthy Confidence & Confidence Compass</h3>
                <h6>Move beyond general self-esteem and focus on specific areas of confidence—the belief in your ability to succeed at particular tasks.
                    Rate yourself honestly across key life areas to visualize your confidence landscape.</h6>
            </div>
            <h5>To cultivate that sweet, but healthy spot of confidence, we will continue to take moments for self-reflection ,
                identify strengths and pinpoint new horizons to explore.

                Remember, the journey is an epic expedition of learning and self - discovery . By finding that perfect balance of confidence,
                you'll be ready to tackle challenges and seize moments , making your journey a thrilling adventure! The "Confidence Compass"
                is a great tool to help you understand how you see yourself and ultimately understand how it affects your life.</h5>
            <div className="flex flex-row justify-center gap-2">
                <img src={Image33} alt="" className='w-1/4' />
                <img src={Image7} alt="" className='w-1/4' />
            </div>
            <div className="flex flex-col gap-4">
                <h4 className='font-bold'>Instruction:</h4>
                <ul>
                    <li><span className="font-bold">Be Honest Remember,</span> being real with yourself is key.</li>
                    <li><span className="font-bold">Review</span> Look at the self-esteem traits listed in the chart.</li>
                    <li><span className="font-bold">Select</span> select the traits that match up with how you feel about yourself This will help you visualize
                        how most of your traits are categorized.</li>
                </ul>
            </div>
            <div className="flex flex-row justify-center items-center">
                <img src={Image18} alt="" className='w-1/4' />
                <img src={Image19} alt="" className='w-1/4 h-1/4' />
            </div>
            <table className='table-auto border-2p-6 p-4'                                                                                                                                                                                                                       >
                <thead className='border-2 p-4'>
                    <tr>
                        <th className='p-3 border-2'>List the total number of traits in each group </th>
                        <th className='p-3 border-2'>Traits</th>
                    </tr>
                </thead>
                <tbody className='border-2'>
                    {CONFIDENCE_GROUPS.map((group, groupIndex) => (
                        <tr key={group.id}>
                            <td className='p-3 border-2 text-center'>
                                {(checkedItems[groupIndex] || []).length}
                            </td>
                            <td className='p-3 border-2'>
                                <ul className='list-decimal list-inside'>
                                    {group.traits.map((trait, itemIndex) => (
                                        <li key={trait.text} className="flex flex-row gap-3 items-start">
                                            <Input
                                                type="checkbox"
                                                id={`group-${groupIndex}-item-${itemIndex}`}
                                                checked={(checkedItems[groupIndex] || []).includes(itemIndex)}
                                                onChange={() => handleCheckboxChange(groupIndex, itemIndex)}
                                                className="border-0 w-auto shadow-none border-b border-ib rounded-none px-0 h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                            <label htmlFor={`group-${groupIndex}-item-${itemIndex}`} className="text-left">
                                                {trait.text}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className='table-auto border-2p-6 p-4'>
                <thead className='border-2 p-4'>
                    <tr>
                        <th>Degrees of Confidence </th>
                        <th className='p-3 border-2'>Traits</th>
                    </tr>
                </thead>
                <tbody>
                    {CONFIDENCE_GROUPS.map((group) => (
                        <tr key={group.id}>
                            <td className='p-3 border-2 text-right'>
                                <h6 className='font-bold'>{group.label}</h6>
                                {group.description}
                            </td>
                            <td className='p-3 border-2'>
                                <ul>
                                    {group.traits.map((trait) => (
                                        <li key={trait.text}>
                                            {trait.lead && <span className='font-bold'>{trait.lead}: </span>}
                                            {trait.text}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col sm:flex-row justify-center items-center">
                <img src={Image35} alt="" className='w-30 h-40' />
                <img src={Image36} alt="" className='w-30 h-30' />
                <img src={Image37} alt="" className='w-30 h-40' />
            </div>
            <div className="flex justify-between w-full gap-10 text-center">
                <div className="flex justify-between w-full gap-2 text-center">
                    <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move' ></CustomButton>
                    <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!Object.values(checkedItems).some(group => group.length > 0)}></CustomButton>
                </div>
            </div>
        </div>
    )
}

export default Confidence;