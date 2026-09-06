import { useEffect, useState } from 'react';
import { CheckCircle, GraduationCap, TrendingUp, DollarSign, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from '../../../elements';

import Image67 from '../../../assets/image/png/67.png';
import Image68 from '../../../assets/image/png/68.png';

type CareerPath = {
    id: number;
    title: string;
    jobOutlook: string;
    requiredEducation: string;
};

/** Reads a milestone document, tolerating the 404 returned before a first save. */
const readMilestone = (key: string) => getMilestone(key).catch(() => null);

/**
 * Finds the first of `keys` whose document actually carries `field`. Pages moved
 * during the M3 reordering, so a student may have work under either the current
 * key or the one the page used to live at, and both keys now exist with different
 * shapes — the field is what identifies the right document.
 */
const findResponseWith = async (keys: string[], field: string) => {
    const documents = await Promise.all(keys.map(readMilestone));
    return documents.find((response) => response?.responses?.[field] !== undefined)?.responses;
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

export default function App() {
    const [selectedCareerId, setSelectedCareerId] = useState<number>();
    const [isCommitted, setIsCommitted] = useState<boolean>(false);
    const [requiredSalary, setRequiredSalary] = useState<number>(0);
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                // The Lifestyle Calculator's gross salary — not its expense total,
                // which is what this banner used to show.
                const lifestyle = await findResponseWith(
                    ['milestone3_6', 'milestone3_4'],
                    'requiredSalary'
                );
                if (lifestyle) {
                    setRequiredSalary(Number(lifestyle.requiredSalary) || 0);
                }

                // The three careers the student actually entered, filled in with
                // the outlook and education they researched on the Career Research Log.
                const discovery = await findResponseWith(
                    ['milestone3_4', 'milestone3_3'],
                    'careers'
                );
                const researchLog = await findResponseWith(['milestone3_5'], 'researchData');
                const research = Array.isArray(researchLog?.researchData)
                    ? (researchLog.researchData as Array<Record<string, string>>)
                    : Object.values((researchLog?.researchData ?? {}) as Record<string, Record<string, string>>);

                const careers = Object.values((discovery?.careers ?? {}) as Record<string, string>);
                setCareerPaths(
                    careers
                        .map((title, index) => ({
                            id: index + 1,
                            title,
                            jobOutlook: research[index]?.outlook || 'Not researched yet',
                            requiredEducation: research[index]?.education || 'Not researched yet',
                        }))
                        .filter((career) => career.title?.trim())
                );

                const response = await readMilestone('milestone3_7');
                if (response) {
                    setSelectedCareerId(response.responses.selectedCareerId as number);
                    setIsCommitted(true);
                }
            }
            getResponse();
        }
    }, [user])
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone4/1", prevMilestoneId: "milestone3/7" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone4/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/6');
    };

    const handleCommit = async () => {
        if (user) {
            if (!selectedCareerId) {
                alert("Please select your top career path.");
                return;
            }

            try {
                const result = await submitMilestone('milestone3_7', { userId: user?.uid, responses: { selectedCareerId } });
                setIsCommitted(true);
                console.log("Committed to career ID:", selectedCareerId);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const selectedCareer = careerPaths.find(c => c.id === selectedCareerId);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M3.7: Territory Summary & Commit</h3>
                <h6>Review your career map and commit to your chosen direction to unlock Milestone 4: Resources Roadways.</h6>
            </div>
            <div className="flex flex-col gap-6">
                {/* Required Salary Banner */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <h4 className="text-xl font-semibold text-gray-800">
                            Required Annual Salary:{" "}
                            <span className="text-green-600 font-bold">
                                {formatCurrency(requiredSalary)}
                            </span>
                        </h4>
                    </div>
                    <p className="text-gray-600 mt-2">
                        This is the gross income needed to support your desired lifestyle.
                    </p>
                </div>

                {/* Career Paths Summary */}
                <div className="space-y-6 mb-10">
                    <h4 className="font-bold text-center mb-6">Your Career Pathways</h4>
                    {careerPaths.length === 0 && (
                        <p className="text-center text-gray-600">
                            You haven't recorded any career paths yet.{" "}
                            <button
                                type="button"
                                onClick={() => navigate('/milestones/milestone3/4')}
                                className="font-bold text-ib-1 underline cursor-pointer"
                            >
                                Go back to M3.4
                            </button>{" "}
                            to add them.
                        </p>
                    )}
                    {careerPaths.map((career, index: number) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all duration-200 cursor-pointer ${selectedCareerId === career.id
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-300'
                                }`}
                            onClick={() => setSelectedCareerId(career.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <input
                                        type="radio"
                                        checked={selectedCareerId === career.id}
                                        onChange={() => setSelectedCareerId(career.id)}
                                        className="w-5 h-5 text-indigo-600"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-xl font-bold text-gray-900">{career.title}</h5>
                                    <div className="mt-3 space-y-2 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                                            <span><span className="font-medium">Education:</span> {career.requiredEducation}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
                                            <span><span className="font-medium">Job Outlook:</span> {career.jobOutlook}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Commit Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    {isCommitted ? (
                        <div className="py-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Milestone 3 Complete!</h3>
                            <p className="text-gray-600 mb-4">
                                You've committed to: <span className="font-semibold text-indigo-600">{selectedCareer?.title}</span>
                            </p>
                            <p className="text-lg text-gray-700">
                                Milestone 4: Resources Roadways is now ready. 🚀
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-700 mb-6">
                                Select your top career path above, then commit to finalize your direction.
                            </p>
                            <button
                                onClick={handleCommit}
                                disabled={!selectedCareerId}
                                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 ${selectedCareerId
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                My Territory Map is Clear
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>
                        Your commitment locks in this career direction for Milestones 4 & 5. You can update it later in your profile.
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                <img src={Image67} alt="" className='w-1/3' />
                <img src={Image68} alt="" className='w-1/3' />
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!isCommitted}></CustomButton>
            </div>
        </div>
    );
}
