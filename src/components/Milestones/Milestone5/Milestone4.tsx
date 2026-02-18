
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import { Users, Search, GraduationCap, CheckCircle } from 'lucide-react';

function LoansSelecting() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone5/5", prevMilestoneId: "milestone5/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone5/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone5/3');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M5.4: Student Loans & Selecting Your Journey</h3>
                <h6>Understanding Financial Options and Making Your Choice</h6>
            </div>
            <div className="flex flex-col gap-4 px-6 py-8 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <div className="space-y-6">
                    <div className="bg-red-100 p-6 rounded-lg border-l-4 border-red-500">
                        <h4 className="text-xl font-bold text-red-800 mb-3">Student Loans</h4>
                        <p className="mb-4">Loans must be repaid with interest. Borrow only what you need and understand loan terms before signing.</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-red-600 mt-1" /> Use federal loans before private ones (lower interest rates, flexible repayment)</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-red-600 mt-1" /> Avoid taking on too much debt</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-red-600 mt-1" /> Understand loan terms before signing</li>
                        </ul>
                        <div className="bg-white p-4 rounded-lg mt-4">
                            <p className="text-sm">Remember: Investing in your education is like planting a money tree for your future! With some serious financial planning and the right resources, you can choose your academic dreams without drowning in debt.</p>
                        </div>
                    </div>

                    <div className="bg-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Selecting Your Journey</h4>
                        <ol className="space-y-3">
                            <li className="flex items-start gap-2"><span className="font-bold text-purple-600">1.</span> Make a List of Colleges or Programs – Research options that match your interests.</li>
                            <li className="flex items-start gap-2"><span className="font-bold text-purple-600">2.</span> Check Admission Requirements – Ensure you meet GPA, test scores, etc.</li>
                            <li className="flex items-start gap-2"><span className="font-bold text-purple-600">3.</span> Look at Program Details – What will you study? How long? What's the cost?</li>
                            <li className="flex items-start gap-2"><span className="font-bold text-purple-600">4.</span> Check Financial Aid Options – Scholarships, grants, loans.</li>
                            <li className="flex items-start gap-2"><span className="font-bold text-purple-600">5.</span> Choose Your Top Picks – Narrow down to 3–5 schools.</li>
                            <li className="flex items-start gap-2"><span className="font-bold text-purple-600">6.</span> Apply! – Submit applications and financial aid forms.</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-100 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">Research Space</h4>
                        <p className="mb-4">Encourages users to use search engines, visit college websites, talk to counselors, and attend college fairs.</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><Search className="w-4 h-4 text-yellow-600 mt-1" /> Consider location, campus culture, and career outcomes</li>
                            <li className="flex items-start gap-2"><Users className="w-4 h-4 text-yellow-600 mt-1" /> Talk to current students and alumni</li>
                            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-yellow-600 mt-1" /> Attend college fairs and information sessions</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default LoansSelecting;