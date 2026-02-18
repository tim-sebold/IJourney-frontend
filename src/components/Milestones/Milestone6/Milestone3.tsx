
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, submitMilestone, unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

type JourneyerStatement = {
    iAm: string;
    iBelieve: string;
    iWill: string;
    iAmConfident: string;
    iAmCapable: string;
}

function DraftStatement() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [journeyerStatement, setJourneyerStatement] = useState<JourneyerStatement>({
        iAm: '',
        iBelieve: '',
        iWill: '',
        iAmConfident: '',
        iAmCapable: ''
    });

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone6_3');
                if (response) {
                    setJourneyerStatement(response.responses.journeyerStatement as JourneyerStatement);
                }
            }
            getResponse();
        }
    }, [user])

    const isFormComplete = () => {
        return Object.values(journeyerStatement).every((item: string) =>
            item !== ""
        );
    };

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone6/4", prevMilestoneId: "milestone6/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone6/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone6/2');
    };

    const handleSave = async () => {
        // Save the journeyer's statement to the database
        if (user) {
            try {
                const result = await submitMilestone('milestone6_3', { userId: user?.uid, responses: { journeyerStatement } });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M6.3: Draft Your Statement</h3>
                <h6>Begin Writing Your Personal Vision</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Write Your Journeyer's Statement</h4>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I AM...</label>
                                <textarea
                                    value={journeyerStatement.iAm}
                                    onChange={(e) => setJourneyerStatement({ ...journeyerStatement, iAm: e.target.value })}
                                    placeholder="Define your identity and values. Example: 'I am a compassionate problem-solver who values integrity and continuous learning.'"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I BELIEVE...</label>
                                <textarea
                                    value={journeyerStatement.iBelieve}
                                    onChange={(e) => setJourneyerStatement({ ...journeyerStatement, iBelieve: e.target.value })}
                                    placeholder="Articulate your core beliefs. Example: 'I believe everyone deserves access to quality education and that small actions can create big change.'"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I WILL...</label>
                                <textarea
                                    value={journeyerStatement.iWill}
                                    onChange={(e) => setJourneyerStatement({ ...journeyerStatement, iWill: e.target.value })}
                                    placeholder="Declare your intentions and actions. Example: 'I will pursue a career in educational technology to empower underserved communities.'"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I AM CONFIDENT...</label>
                                <textarea
                                    value={journeyerStatement.iAmConfident}
                                    onChange={(e) => setJourneyerStatement({ ...journeyerStatement, iAmConfident: e.target.value })}
                                    placeholder="Affirm your capabilities. Example: 'I am confident in my ability to overcome challenges and adapt to new situations.'"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I AM CAPABLE...</label>
                                <textarea
                                    value={journeyerStatement.iAmCapable}
                                    onChange={(e) => setJourneyerStatement({ ...journeyerStatement, iAmCapable: e.target.value })}
                                    placeholder="I am capable of achieving my DraftStatements through dedication, resilience, and collaboration."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <CustomButton title="Save" className='rounded-full justify-end' type='red' onClickFunc={handleSave} disabled={journeyerStatement.iAm === '' || journeyerStatement.iBelieve === '' || journeyerStatement.iWill === '' || journeyerStatement.iAmConfident === '' || journeyerStatement.iAmCapable === ''} />
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Tips for Writing Your Statement</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Be authentic - write what truly resonates with you</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Be specific - avoid vague statements</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Make it inspiring - your statement should motivate you</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Connect to your values - ensure it reflects what matters most to you</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Keep it concise - aim for clarity over length</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!isFormComplete()}></CustomButton>
            </div>
        </div>
    )
}

export default DraftStatement;