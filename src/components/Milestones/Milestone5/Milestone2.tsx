
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { Lightbulb, CheckCircle } from "lucide-react";
import { CustomButton } from "../../../elements/buttons";

function EducationalJourneys() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone5/3", prevMilestoneId: "milestone5/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone5/3');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone5/1');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M5.2: Types of Educational Journeys</h3>
                <h6>Discover Your Path Forward</h6>
            </div>
            <div className="flex flex-col gap-4">
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                            <h4 className="text-xl font-bold text-purple-800 mb-3">Vocational & Technical Schools</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-purple-600 mt-1" /> Shorter, skills-based programs (plumbing, cosmetology, IT support)</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-purple-600 mt-1" /> Lead to certifications or licenses</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-purple-600 mt-1" /> Can be completed in less than a year</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-purple-600 mt-1" /> May offer apprenticeships</li>
                            </ul>
                        </div>

                        <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                            <h4 className="text-xl font-bold text-indigo-800 mb-3">2-Year Associate Degrees</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-600 mt-1" /> Offered by community colleges</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-600 mt-1" /> Can transfer to 4-year universities</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-600 mt-1" /> Lower cost than 4-year degrees</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-600 mt-1" /> Good for exploring interests before committing</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-cyan-50 p-6 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="text-xl font-bold text-cyan-800 mb-3">4-Year Bachelor's Degrees</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyan-600 mt-1" /> Traditional university path</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyan-600 mt-1" /> Often required for professional careers</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyan-600 mt-1" /> Provides broader education and networking</li>
                            </ul>
                        </div>

                        <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                            <h4 className="text-xl font-bold text-teal-800 mb-3">Graduate/Professional Education</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-teal-600 mt-1" /> Master's, PhD, Law, Medicine</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-teal-600 mt-1" /> Requires prior bachelor's degree</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-teal-600 mt-1" /> Leads to higher earning potential and leadership roles</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">Benefits of Early College / Dual Enrollment</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-yellow-600 mt-1" /> Earn college credits while in high school</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-yellow-600 mt-1" /> Reduce overall college costs</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-yellow-600 mt-1" /> Gain confidence in college-level work</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-yellow-600 mt-1" /> Explore majors before committing</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-yellow-600 mt-1" /> Get a head start on graduation</li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                        <h4 className="text-xl font-bold text-orange-800 mb-3">Spartanburg Community College (For Middle Schoolers)</h4>
                        <p className="mb-3">Introduces the concept of "Early College" for middle schoolers. Encourages exploration of career paths early.</p>
                        <a href="https://early-college.gvltec.edu/" target="_blank" rel="noopener noreferrer" className="inline-block font-bold text-orange-600 hover:text-orange-800 underline">
                            Learn more about SCC's Early College Program
                        </a>
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

export default EducationalJourneys;