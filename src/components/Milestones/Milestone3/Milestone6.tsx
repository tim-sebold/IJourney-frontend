
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import ImageNextMove from '../../../assets/image/milestones/nextmove.svg';
import Image63 from "../../../assets/image/png/63.png";
import Image64 from "../../../assets/image/png/64.png";

function CareerResearchLog() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone3/7", prevMilestoneId: "milestone3/6" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone3/7');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone3/4');
    };

    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M3.6: Career Assessment</h3>
                <h6></h6>
            </div>
            <h6>Emotional Intelligence (EQ) is guided by six foundational skills essential for navigating life's challenges and building strong relationships.</h6>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <img src={Image63} alt="" className='w-1/3' />
                <img src={Image64} alt="" className='w-1/3' />
            </div>
            <div className="flex flex-col bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 gap-8">
                <ul className='flex flex-col list-decimal list-inside gap-4'>
                    <li>
                        <span className='font-bold'>The O*NET Interest Profiler has 60 questions about work activities that some people do on their jobs.</span>
                        <h6 className='px-4'>Please be sure to read each question carefully and decide how you would feel about doing each type of work.</h6>
                    </li>
                    <li>
                        <span className='font-bold'>Try NOT to think about:</span>
                        <h6 className='px-4'>Education or training needed or how much money you would make doing the work (just yet).</h6>
                    </li>
                    <li>
                        <span className='font-bold'>For now, just think about if you would like or dislike doing the work.</span>
                    </li>
                    <li>
                        <span className='font-bold'>Though it takes on average about 20 minutes to complete, there is no rush.</span>
                    </li>
                    <li>
                        <span className='font-bold'>You are learning about your interests, so that you can explore work you might like and find rewarding!</span>
                    </li>
                </ul>
                <h6 className='font-bold'>Your results will be displayed in a graph and numerical chart reflecting your Career Interest Categories (R, I , A, S, E, C).</h6>
            </div>
            <div className="flex justify-center">
                <img src={ImageNextMove} alt="" />
            </div>
            <div className="flex flex-col gap-4 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
                <h4 className='font-bold'>Focus on your highest-ranked categories:</h4>
                <ul className='px-6 list-disc list-inside'>
                    <li className='px-6'>
                        <span className='font-bold'>R</span> ( Realistic) : Enjoy hands-on work, including:
                        <ul className='px-6 list-[circle] list-inside'>
                            <li className='px-6'>Working with plants and animals</li>
                            <li className='px-6'>Crafting with wood and tools</li>
                            <li className='px-6'>Outdoor activities</li>
                        </ul>
                    </li>
                    <li className='px-6'>
                        <span className='font-bold'>I</span> (Investigative) : Prefer exploring ideas and solving problems, such as:
                        <ul className='px-6 list-[circle] list-inside'>
                            <li className='px-6'>
                                Researching facts like a detective
                                <ul className='px-6 list-[square] list-inside'>
                                    <li className='px-6'>Tackling complex issues</li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className='px-6'>
                        <span className='font-bold'>A</span> (Artistic)
                        <ul className='px-6 list-[circle] list-inside'>
                            <li className='px-6'>Embracing creativity in acting, music, art, and design.</li>
                            <li className='px-6'>
                                They enjoy:
                                <ul className='px-6 list-[square] list-inside'>
                                    <li className='px-6'>Creative tasks</li>
                                    <li className='px-6'>Free-spirited work</li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className='px-6'>
                        <span className='font-bold'>S</span> (Social)
                        <ul className='px-6 list-[circle] list-inside'>
                            <li>Thriving on teamwork and helping others. They prefer interaction over machines or numbers.</li>
                            <li>
                                They love:
                                <ul className='px-6 list-[square] list-inside'>
                                    <li className='px-6'>Teaching</li>
                                    <li className='px-6'>Giving advice</li>
                                    <li className='px-6'>Serving others</li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className='px-6'>
                        <span className='font-bold'>E</span> (Enterprising)
                        <ul className='px-6 list-[circle] list-inside'>
                            <li className='px-6'>Go-getters who launch business ventures and take action.</li>
                            <li className='px-6'>
                                They enjoy:
                                <ul className='px-6 list-[square] list-inside'>
                                    <li className='px-6'>Persuading others</li>
                                    <li className='px-6'>Making bold decisions</li>
                                    <li className='px-6'>Taking risks for profit</li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className='px-6'>
                        <span className='font-bold'>C</span> (Conventional)
                        <ul className='px-6 list-[circle] list-inside'>
                            <li className='px-6'>Favoring routine and structure over lofty ideas.</li>
                            <li className='px-6'>
                                They appreciate:
                                <ul className='px-6 list-[square] list-inside'>
                                    <li className='px-6'>Clear rules</li>
                                    <li className='px-6'>Strong leadership</li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default CareerResearchLog;