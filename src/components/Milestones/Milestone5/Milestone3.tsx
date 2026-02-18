
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { Search, Users, CheckCircle, DollarSign, AlertTriangle } from "lucide-react";
import { CustomButton } from "../../../elements/buttons";

function InvestingEducation() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone5/4", prevMilestoneId: "milestone5/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone5/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone5/4');
    };


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M5.3: Investing in Your Education</h3>
                <h6>Making Smart Financial Decisions for Your Future</h6>
            </div>
            <div className="flex flex-col bg-white gap-2 px-6 py-8 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Investing in Your Education</h4>
                        <p className="mb-4">Think of education like investing in stocks — you put money in now to get returns later. College can increase your lifetime earnings significantly.</p>
                        <p className="mb-4">While college isn't for everyone, most jobs require some form of post-secondary training. Scholarships, grants, and loans can make education affordable.</p>
                        <div className="flex items-center gap-2 mt-4">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Education is an investment, not a burden</span>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Scholarships and Grants</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Scholarships</h5>
                                <p className="text-sm">Merit-based (grades, talent, etc.) - do NOT need to be repaid</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Grants</h5>
                                <p className="text-sm">Need-based (financial aid) - do NOT need to be repaid</p>
                            </div>
                        </div>

                        <h5 className="font-semibold text-green-700 mb-2">How to Find Them:</h5>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><Search className="w-4 h-4 text-green-600 mt-1" /> Use scholarship search engines (Fastweb, Cappex, Scholarships.com)</li>
                            <li className="flex items-start gap-2"><Users className="w-4 h-4 text-green-600 mt-1" /> Check with your high school counselor</li>
                            <li className="flex items-start gap-2"><Users className="w-4 h-4 text-green-600 mt-1" /> Look into local organizations (churches, civic groups, employers)</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Apply early and often — many scholarships go unclaimed</li>
                        </ul>

                        <h5 className="font-semibold text-green-700 mb-2">Important Tips:</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-green-600 mt-1" /> Never pay to apply for a scholarship</li>
                            <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-green-600 mt-1" /> Beware of scams</li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-1" /> Keep track of deadlines and requirements</li>
                        </ul>

                        <div className="mt-4 space-y-2">
                            <a href="https://app.scholarships.com/" target="_blank" rel="noopener noreferrer" className="inline-block underline text-[14px] font-bold">
                                SC State Scholarship Programs
                            </a>
                            <br />
                            <a href="https://studentaid.gov/" target="_blank" rel="noopener noreferrer" className="inline-block underline text-[14px] font-bold">
                                Federal Student Aid
                            </a>
                        </div>
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

export default InvestingEducation;