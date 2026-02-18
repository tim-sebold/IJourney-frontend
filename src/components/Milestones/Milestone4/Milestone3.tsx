import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext, submitMilestone, getMilestone } from '../../../controllers/courseController';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AlertCircle, User, Briefcase, Heart, GraduationCap, Target } from 'lucide-react';

import { CustomButton } from '../../../elements';

type NetworkPerson = {
    id: number;
    name: string;
    role: string;
    areaOfSupport: string;
    specificNeed: string;
    contactGoal: string;
};

function DefiningRoles() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const initialNetwork = [
        { id: 1, name: '', role: '' },
        { id: 2, name: '', role: '' },
        { id: 3, name: '', role: '' },
        { id: 4, name: '', role: '' },
        { id: 5, name: '', role: '' }
    ];

    const [network, setNetwork] = useState(
        initialNetwork.map(person => ({
            ...person,
            areaOfSupport: '',
            specificNeed: '',
            contactGoal: ''
        }))
    );

    const supportAreas = [
        { value: 'career', label: 'Career Advice', icon: Briefcase },
        { value: 'emotional', label: 'Emotional Support', icon: Heart },
        { value: 'skills', label: 'Skill Development', icon: GraduationCap },
        { value: 'accountability', label: 'Accountability', icon: Target }
    ];

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const responseSupports = await getMilestone('milestone4_2');
                const supportsRaw = responseSupports?.responses?.supports;

                const supportsArray: any[] = supportsRaw
                    ? Array.isArray(supportsRaw)
                        ? supportsRaw
                        : Object.values(supportsRaw)
                    : initialNetwork;

                const base: NetworkPerson[] = supportsArray.map((person: any, index: number) => ({
                    id: person.id ?? index + 1,
                    name: person.name ?? initialNetwork[index]?.name ?? "",
                    role: person.role ?? initialNetwork[index]?.role ?? "",
                    areaOfSupport: "",
                    specificNeed: "",
                    contactGoal: ""
                }));

                setNetwork(base);

                const response = await getMilestone('milestone4_3');

                const savedRaw = response?.responses?.network;

                if (savedRaw) {
                    const savedArray: any[] = Array.isArray(savedRaw)
                        ? savedRaw
                        : Object.values(savedRaw);

                    const merged = base.map(basePerson => {
                        // match by id if present, otherwise by name
                        const match = savedArray.find(
                            (p: any) =>
                                (p.id ?? p.name) === (basePerson.id ?? basePerson.name)
                        );

                        return match
                            ? {
                                ...basePerson,
                                areaOfSupport: match.areaOfSupport ?? "",
                                specificNeed: match.specificNeed ?? "",
                                contactGoal: match.contactGoal ?? ""
                            }
                            : basePerson;
                    });

                    setNetwork(merged);
                } else {
                    // No existing 4_3 data → just show names/roles, blank right side
                    setNetwork(base);
                }
            }
            getResponse();
        }
    }, [user])

    const handleInputChange = (id: number, field: string, value: string) => {
        setNetwork(prev =>
            prev.map(person =>
                person.id === id ? { ...person, [field]: value } : person
            )
        );
    };

    const isFormComplete = network.every(person =>
        person.areaOfSupport && person.specificNeed && person.contactGoal
    );

    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone4_3', { userId: user?.uid, responses: { network } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone4/4", prevMilestoneId: "milestone4/3" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone4/4');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {

    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M4.3: Defining Roles</h3>
                <h6>Define specific "job descriptions" for each person in your support network to ensure your network is functional and balanced.</h6>
            </div>
            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                        <div>
                            <h5 className="font-semibold text-gray-800 mb-2">Purpose</h5>
                            <p className="text-gray-600">
                                Don't ask your mentor for emotional support if they're only equipped to give career advice.
                                Define specific roles to use your support network effectively and avoid overwhelming people
                                with requests outside their expertise.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Structured Input Table */}
                <div className="bg-white rounded-xl overflow-hidden border-b">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 border-b">
                        <div className="font-semibold text-gray-700">Name/Role</div>
                        <div className="font-semibold text-gray-700">Area of Support</div>
                        <div className="font-semibold text-gray-700">Specific Need</div>
                        <div className="font-semibold text-gray-700">Contact Goal</div>
                    </div>

                    <div className="divide divide-gray-100">
                        {network.map((person) => {
                            const AreaIcon = supportAreas.find(s => s.value === person.areaOfSupport)?.icon || User;

                            return (
                                <div key={person.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                                    {/* Name/Role (Read-only) */}
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                            <User className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{person.name}</div>
                                            <div className="text-sm text-gray-500">{person.role}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <select
                                            value={person.areaOfSupport}
                                            onChange={(e) => handleInputChange(person.id, 'areaOfSupport', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select area of support</option>
                                            {supportAreas.map((area) => (
                                                <option key={area.value} value={area.value}>
                                                    {area.label}
                                                </option>
                                            ))}
                                        </select>
                                        {person.areaOfSupport && (
                                            <div className="mt-2 flex items-center text-sm text-gray-600">
                                                <AreaIcon className="w-4 h-4 mr-1" />
                                                {supportAreas.find(s => s.value === person.areaOfSupport)?.label}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            value={person.specificNeed}
                                            onChange={(e) => handleInputChange(person.id, 'specificNeed', e.target.value)}
                                            placeholder="E.g., How to handle salary negotiation"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            value={person.contactGoal}
                                            onChange={(e) => handleInputChange(person.id, 'contactGoal', e.target.value)}
                                            placeholder="E.g., Meet monthly for coffee"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)]">
                    <h4 className="font-semibold mb-3">💡 Beginner Tips</h4>
                    <ul className="space-y-2 list-disc list-inside">
                        <li>Move from passive support ("My mom is supportive") to active support ("I can ask my mom to hold me accountable for my M6 goals")</li>
                        <li>Be specific about what you need - this makes it easier for your support network to help you effectively</li>
                        <li>Remember: defining roles shows respect for your supporters' time and expertise</li>
                    </ul>
                </div>

                <div className="flex justify-between w-full gap-2 text-center">
                    <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                    <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!isFormComplete}></CustomButton>
                </div>
            </div>
        </div>
    );
};

export default DefiningRoles;