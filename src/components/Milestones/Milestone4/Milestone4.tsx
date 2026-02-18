import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext, submitMilestone, getMilestone } from '../../../controllers/courseController';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckSquare, Square, ExternalLink } from 'lucide-react';
import { CustomButton } from '../../../elements';

function ResourceInventory() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedResources, setSelectedResources] = useState(new Set());
    const [customResources, setCustomResources] = useState<Array<string>>(['', ''])

    // Resource categories based on the PDF content
    const resourceCategories = [
        {
            id: 'skills_passion',
            title: 'SKILLS DEVELOPMENT • PASSION DISCOVERY',
            color: 'bg-orange-500',
            resources: [
                {
                    id: 'sc_youth_gov',
                    name: 'SC Youth in Government',
                    description: 'Students participate through school or community groups. Develops leadership and civic engagement skills.',
                    url: 'https://www.ymcagreenville.org/programs/outreach-development/sc-youth-government'
                },
                {
                    id: 'greenville_community_centers',
                    name: 'Greenville County Community Centers',
                    description: 'Local centers offering various programs and support services for youth.',
                    url: 'https://greenvillerec.com/community-centers/'
                },
                {
                    id: 'teen_leadership_camp',
                    name: 'Community Center Teen Leadership Camp',
                    description: 'Workshops on 8 core life and career skills: communication, food, money, clothing, at-home, car, career development, and community service.',
                    url: 'https://greenvillerec.com/community-center-teen-leadership-camp/'
                },
                {
                    id: 'usc_upstate_youth',
                    name: 'USC Upstate Youth Services and Camps',
                    description: 'STEM Day Camp (9th-12th) and Nursing Teen Summer Camp (10th-12th).',
                    url: 'https://uscupstate.edu/about/community/youth/'
                },
                {
                    id: 'spartanburg_ymca_sports',
                    name: 'Spartanburg County YMCA Youth Sports',
                    description: 'Youth sports programs and activities to develop teamwork and physical skills.',
                    url: 'https://www.spartanburgymca.org/youth-sports/'
                },
                {
                    id: 'spartanburg_youth_theater',
                    name: 'Spartanburg Youth Theater',
                    description: 'Theater education and performance opportunities for young people.',
                    url: 'https://www.spartanburgyouththeatre.com/education'
                }
            ]
        },
        {
            id: 'support_mentorship',
            title: 'SUPPORT • MENTORSHIP',
            color: 'bg-blue-500',
            resources: [
                {
                    id: 'mentorship_programs',
                    name: 'Mentorship Programs',
                    description: 'Connect with experienced professionals who can guide your career path and personal development.',
                    url: 'https://www.mentoring.org/'
                },
                {
                    id: 'career_center',
                    name: 'School/College Career Center',
                    description: 'Professional guidance for career planning, resume building, and job search strategies.',
                    url: 'https://www.careercenter.gov/'
                },
                {
                    id: 'peer_support_groups',
                    name: 'Peer Support Groups',
                    description: 'Connect with others facing similar challenges for mutual encouragement and accountability.',
                    url: 'https://www.supportgroups.com/'
                },
                {
                    id: 'alumni_networks',
                    name: 'Alumni Networks',
                    description: 'Tap into networks of former students who can offer advice, connections, and opportunities.',
                    url: 'https://www.alumninetworks.org/'
                }
            ]
        },
        {
            id: 'food_nutrition',
            title: 'FOOD • NUTRITION',
            color: 'bg-green-500',
            resources: [
                {
                    id: 'food_banks',
                    name: 'Food Banks & Pantries',
                    description: 'Access to free groceries and meals for those in need. Find local options near you.',
                    url: 'https://www.feedingamerica.org/'
                },
                {
                    id: 'nutrition_programs',
                    name: 'Nutrition Education Programs',
                    description: 'Learn about healthy eating habits and meal planning on a budget.',
                    url: 'https://www.nutritioneducationprograms.org/'
                },
                {
                    id: 'school_meals',
                    name: 'Free School Meals',
                    description: 'Apply for free or reduced-price breakfast and lunch programs through your school.',
                    url: 'https://www.fns.usda.gov/school-meals'
                },
                {
                    id: 'community_gardens',
                    name: 'Community Gardens',
                    description: 'Grow your own food and connect with your community through shared gardening spaces.',
                    url: 'https://www.communitygarden.org/'
                }
            ]
        },
        {
            id: 'mental_health',
            title: 'MENTAL HEALTH',
            color: 'bg-purple-500',
            resources: [
                {
                    id: 'crisis_hotlines',
                    name: 'Crisis Hotlines',
                    description: 'Immediate support for mental health emergencies. Available 24/7.',
                    url: 'https://suicidepreventionlifeline.org/'
                },
                {
                    id: 'counseling_services',
                    name: 'School Counseling Services',
                    description: 'Academic, career, and personal counseling support available through your educational institution.',
                    url: 'https://www.schoolcounselor.org/'
                },
                {
                    id: 'online_therapy',
                    name: 'Online Therapy Platforms',
                    description: 'Access to licensed therapists through convenient online platforms.',
                    url: 'https://www.talkspace.com/'
                },
                {
                    id: 'mental_health_apps',
                    name: 'Mental Health Apps',
                    description: 'Tools for mindfulness, meditation, and tracking your mental well-being.',
                    url: 'https://www.headspace.com/'
                }
            ]
        },
        {
            id: 'statewide_resources',
            title: 'STATEWIDE RESOURCES',
            color: 'bg-red-500',
            resources: [
                {
                    id: 'child_family_resource_guide',
                    name: 'SC Child & Family Resource Guide',
                    description: 'Comprehensive directory of state resources for children and families including healthcare, education, and financial assistance.',
                    url: 'https://www.dss.sc.gov/family-resources'
                },
                {
                    id: 'sc_department_health',
                    name: 'SC Department of Health & Environmental Control',
                    description: 'State agency providing public health services, disease prevention, and environmental protection.',
                    url: 'https://www.scdhec.gov/'
                },
                {
                    id: 'sc_workforce_development',
                    name: 'SC Works Career Centers',
                    description: 'Career services including job placement, training programs, and workforce development resources.',
                    url: 'https://www.scworks.org/'
                },
                {
                    id: 'sc_education_resources',
                    name: 'SC Department of Education Resources',
                    description: 'Educational resources, scholarship information, and academic support programs.',
                    url: 'https://www.ed.sc.gov/'
                }
            ]
        }
    ];

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone4_4');

                if (response) {
                    setSelectedResources(new Set(response.responses.resources as Array<string>));
                    setCustomResources(response.responses.customResources as Array<string>);
                }
            }
            getResponse();
        }
    }, [user])

    const toggleResource = (id: number) => {
        const newSelected = new Set(selectedResources);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedResources(newSelected);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setCustomResources(customResources.map((item, i) => i === index ? e.target.value : item))
    }

    const next = async () => {
        const finalResources = [...selectedResources];

        if (user) {
            try {
                await submitMilestone('milestone4_4', { userId: user?.uid, responses: { resources: finalResources, customResources: customResources } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone4/5", prevMilestoneId: "milestone4/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone4/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone4/3');
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">M4.4: Resource Inventory</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Systematically identify and take stock of the non-human resources and services available to you that can aid your journey toward purpose and career goals.
                    </p>
                </div>

                {/* Instructions */}
                <div className="bg-white shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)] p-6 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <CheckSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">How to Complete This Inventory</h4>
                            <ul className="text-gray-600 space-y-2">
                                <li>✓ Check all resources you currently have access to</li>
                                <li>✓ Add any additional resources in the custom fields below</li>
                                <li>✓ All selections will be saved to your Trail Log profile</li>
                                <li>✓ These resources will help generate personalized tips from Vertex AI</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Resource Categories */}
                <div className="space-y-8">
                    {resourceCategories.map((category) => (
                        <div key={category.id} className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            <div className={`px-6 py-4 ${category.color} text-white`}>
                                <p className="font-bold text-[20px] md:text-[24px]">{category.title}</p>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-4">
                                    {category.resources.map((resource: any, resourceIndex: number) => (
                                        <div
                                            key={resourceIndex}
                                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedResources.has(resource.id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => toggleResource(resource.id)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        {selectedResources.has(resource.id) ? (
                                                            <CheckSquare className=" text-blue-600" size={20} />
                                                        ) : (
                                                            <Square className=" text-gray-400 min-w-5" size={20} />
                                                        )}
                                                        <h4 className="font-semibold text-gray-800">{resource.name}</h4>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                                                    {resource.url && (
                                                        <a
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-blue-600 text-sm hover:text-blue-800 underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Learn more <ExternalLink className="ml-1 w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Resources */}
                <div className="bg-white rounded-xl shadow-2xl p-6 mt-8">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">Add Your Own Resources</h4>
                    <p className="text-gray-600 mb-6">
                        Don't see a resource you use? Add your own custom resources below.
                    </p>

                    <div className="space-y-4">
                        {
                            customResources.map((custom, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Custom Resource {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        value={custom}
                                        onChange={(e) => handleChange(e, index)}
                                        placeholder="e.g., Local coding bootcamp, online mentorship platform, etc."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-between w-full gap-2 text-center">
                    <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                    <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!selectedResources.size}></CustomButton>
                </div>
            </div>
        </div>
    );
};

export default ResourceInventory;
