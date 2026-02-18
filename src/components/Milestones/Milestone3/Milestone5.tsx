import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';
import { Notebook } from 'lucide-react';

import { CustomButton } from "../../../elements/buttons";

function CareerResearchLog() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const careers = ['', '', ''];
    const [researchData, setResearchData] = useState<Array<object>>([
        { career: '', outlook: '', education: '', skills: '', prosCons: '' },
        { career: '', outlook: '', education: '', skills: '', prosCons: '' },
        { career: '', outlook: '', education: '', skills: '', prosCons: '' }
    ]);

    useEffect(() => {
        if (user) {
            const loadData = async () => {
                const careersMilestone = await getMilestone('milestone3_3');

                const careerList: string[] = Object.values(
                    careersMilestone?.responses?.careers || {}
                );

                setResearchData(researchData.map((item: any, index: number) => ({
                    ...item,
                    career: careerList[index] || ""
                })));

                const researchMilestone = await getMilestone('milestone3_5');

                if (researchMilestone?.responses?.researchData) {
                    const savedResearch = researchMilestone.responses.researchData;

                    // Research data might also be saved as an object → convert to array
                    const researchList = Array.isArray(savedResearch)
                        ? savedResearch
                        : Object.values(savedResearch);

                    const merged = researchList.map((item: any, index: number) => ({
                        ...item,
                        career: careerList[index] || ""
                    }));

                    setResearchData(merged);
                    return;
                }

                // No saved research → initialize fresh with careers
                const initial = careerList.map(career => ({
                    career,
                    outlook: "",
                    education: "",
                    skills: "",
                    prosCons: ""
                }));

                setResearchData(initial);
            };

            loadData();
        }
    }, [user])

    const isFormComplete = () => {
        return researchData.every((row: any) =>
            row.career.trim() !== '' &&
            row.outlook.trim() !== '' &&
            row.education.trim() !== '' &&
            row.skills.trim() !== '' &&
            row.prosCons.trim() !== ''
        );
    };

    const handleResearchChange = (index: number, field: string, value: string) => {
        const newData = [...researchData];
        setResearchData(newData.map((item, i) => i === index ? { ...item, [field]: value } : { ...item }));
    };
    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone3_5', { userId: user?.uid, responses: { careers, researchData } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/6", prevMilestoneId: "milestone3/5" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/6');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/4');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M3.5: Career Research Log</h3>
                <h6>Fill in details for each of your three career paths. This will help you decide which path fits you best.</h6>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl mb-8 border border-purple-200">
                <div className="flex flex-row gap-2 items-center">
                    <Notebook className="w-6 h-6" />
                    <h4 className="text-lg font-semibold">Career Research Log</h4>
                </div>
                <p className="mt-4">
                    Research your careers using <a href="https://www.mynextmove.org/" target="_blank" rel="noopener noreferrer" className="underline text-ib-1">My Next Move</a> or O*NET.
                    Compare skills with your strengths from Milestone 2.
                </p>
            </div>

            <div className="space-y-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Career Path</th>
                                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Job Outlook</th>
                                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Required Education</th>
                                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Key Skills/Traits</th>
                                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Pros & Cons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {researchData.map((row: any, i: number) => (
                                <tr key={i}>
                                    <td className="border border-gray-300 px-4 py-3 font-medium">{row.career}</td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <input
                                            type="text"
                                            value={row.outlook}
                                            onChange={(e) => handleResearchChange(i, 'outlook', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            placeholder="e.g., Faster than average"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <input
                                            type="text"
                                            value={row.education}
                                            onChange={(e) => handleResearchChange(i, 'education', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            placeholder="e.g., Bachelor's Degree"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <textarea
                                            value={row.skills}
                                            onChange={(e) => handleResearchChange(i, 'skills', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            placeholder="e.g., Problem-solving, Communication"
                                            rows={5}
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <textarea
                                            value={row.prosCons}
                                            onChange={(e) => handleResearchChange(i, 'prosCons', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                            placeholder="e.g., Pros: Flexible hours. Cons: High stress."
                                            rows={5}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!isFormComplete()}></CustomButton>
            </div>
        </div>
    );
}

export default CareerResearchLog;

