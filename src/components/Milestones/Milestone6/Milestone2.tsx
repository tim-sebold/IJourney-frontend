import { MilestonePageShell } from '../MilestonePageShell';
import { useMilestoneNav } from '../../../hooks/useMilestoneNav';

import { Lightbulb } from 'lucide-react';

function JourneyerStatement() {
    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone6/1",
        nextRoute: "/milestones/milestone6/3",
        unlock: { milestoneId: "milestone6/3", prevMilestoneId: "milestone6/2" },
    });

    return (
        <MilestonePageShell
            title="M6.2: Your Journeyer's Statement"
            subtitle="Crafting Your Personal Mission Statement"
            onPrevious={previous}
            onNext={next}
            isNextLoading={isNextLoading}
        >
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">What is a Journeyer's Statement?</h4>
                        <p className="mb-4">Your Journeyer's Statement is your personal mission statement that reflects your core values, aspirations, and desired impact. It's a declaration of who you are, what you stand for, and what kind of future you want to create.</p>
                        <p className="mb-4">Be honest, specific, and inspiring. Answer questions like: Who am I? What do I stand for? What kind of future do I want to create?</p>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="text-xl font-bold text-indigo-800 mb-3">Structure Your Statement</h4>
                        <p className="mb-4">Use these guiding phrases to help structure your statement:</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-2">
                                <div className="bg-white p-3 rounded-lg shrink-0 flex items-center justify-center w-[200px]">
                                    <span className=" font-bold">I AM</span>
                                </div>
                                <div>
                                    <h5 className="font-semibold ">Define your identity and values</h5>
                                    <p className="text-sm">Example: "I am a compassionate problem-solver who values integrity and continuous learning."</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <div className="bg-white p-3 rounded-lg shrink-0 flex items-center justify-center w-[200px]">
                                    <span className=" font-bold">I BELIEVE</span>
                                </div>
                                <div>
                                    <h5 className="font-semibold ">Articulate your core beliefs</h5>
                                    <p className="text-sm">Example: "I believe everyone deserves access to quality education and that small actions can create big change."</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <div className="bg-white p-3 rounded-lg shrink-0 flex items-center justify-center w-[200px]">
                                    <span className=" font-bold">I WILL</span>
                                </div>
                                <div>
                                    <h5 className="font-semibold ">Declare your intentions and actions</h5>
                                    <p className="text-sm">Example: "I will pursue a career in educational technology to empower underserved communities."</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <div className="bg-white p-3 rounded-lg shrink-0 flex items-center justify-center w-[200px]">
                                    <span className=" font-bold">I AM CONFIDENT</span>
                                </div>
                                <div>
                                    <h5 className="font-semibold ">Affirm your capabilities</h5>
                                    <p className="text-sm">Example: "I am confident in my ability to overcome challenges and adapt to new situations."</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <div className="bg-white p-3 rounded-lg shrink-0 flex items-center justify-center w-[200px]">
                                    <span className=" font-bold">I AM CAPABLE</span>
                                </div>
                                <div>
                                    <h5 className="font-semibold ">Reinforce your self-efficacy</h5>
                                    <p className="text-sm">Example: "I am capable of achieving my goals through dedication, resilience, and collaboration."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">AI Writing Assistant</h4>
                        <p className="mb-4">Our AI chatbot can help you craft your Journeyer's Statement by asking probing questions:</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> "What core value is most important to you?"</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> "How do you want to be remembered?"</li>
                            <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> "Based on your strengths, what might you say about yourself?"</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MilestonePageShell>
    )
}

export default JourneyerStatement;