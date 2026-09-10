import { HeartPulse, Timer, Wind, Footprints, Moon, Gift } from "lucide-react";

/**
 * Stress Management, taken from the iJOURNEY course manual (Stress Management,
 * pp. 75-80): Practice Gratitude, Mindfulness, the three mindfulness
 * techniques, and Sleep Health. Wording follows the workbook so the platform
 * and the printed manual teach the same thing.
 */

const MINDFULNESS_TECHNIQUES = [
    {
        icon: Timer,
        name: "One Mindfulness Minute",
        steps: [
            "Check in with your body: sit comfortably and feel how your body is doing. Pay attention to your shoulders, neck, jaw, face, and hands. Do you feel any tightness or tension there? Just notice it without judging.",
            "Check in with your breath: take a slow, deep breath in through your nose, imagining you are breathing into those tight spots. Hold it for a second, then let it out slowly through your mouth. Do that two more times.",
            "Smile: give yourself a big smile and notice how nice it feels to let go of that tension.",
        ],
        closing: "That's it — you just took a minute for yourself. You can do this anytime you want to feel a little better.",
    },
    {
        icon: Wind,
        name: "Balloon Breathing",
        steps: [
            "Take a deep, dreamy breath through your nose, picturing your lungs as a balloon puffing up like it just won a hot air balloon race.",
            "When your lungs are packed to the brim, hold that breath for a beat, then slowly let it all out, like you're giving a balloon a gentle goodbye hug as it deflates.",
            "Do this three more times, then take a moment to check in with yourself — how are you feeling?",
        ],
    },
    {
        icon: Footprints,
        name: "Feet on the Floor",
        steps: [
            "First thing in the morning — and a few times during your day — pause and feel those feet of yours firmly rooted like tree trunks on the ground.",
            "Hit the brakes and take three deep breaths, tuning in to the air as it swirls in and out of your body.",
            "Once more, give your feet some love and notice how they're standing strong and steady on the ground.",
            "Give yourself a little pat on the back — you're here, and you're rocking it!",
        ],
        closing: "Voila! You're centered and focused, ready to tackle whatever comes next.",
    },
] as const;

const GRATITUDE_ACTIVITIES = [
    { name: "Gratitude Jar", detail: "Write down things you're grateful for and place them in a jar to revisit later." },
    { name: "Give Thanks Out Loud", detail: "Express appreciation to others throughout your day, uplifting both you and them." },
    { name: "People Who Make a Difference", detail: "Visualize someone who has helped you while taking deep breaths to feel gratitude for them." },
    { name: "Acts of Kindness", detail: "Reflect on moments when you've helped others, considering their responses and how it made you feel." },
] as const;

const SLEEP_FACTS = [
    "Aim for about 8 to 10 hours of sleep each night, according to the National Sleep Foundation.",
    "Your body's internal clock runs later than kids' and adults', which makes it tough to sleep before 11 PM — so many teens fall short.",
    "Not getting enough sleep increases stress hormones like adrenaline and cortisol, which can leave you feeling wired, anxious, or overwhelmed.",
    "Too little sleep makes it harder to remember things and pay attention in class, slows your reaction times, and can weaken your immune system.",
    "Stress can create a tough cycle of sleep loss, making it even harder to fall asleep.",
] as const;

export function StressManagementCard() {
    return (
        <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-600">
            <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="w-6 h-6 text-teal-700" />
                <h4 className="text-xl font-bold text-teal-900">Stress Management</h4>
            </div>
            <p className="mb-6">
                Goals stretch you, and stretching is stressful. Before you close out your journey,
                here are the tools from your workbook for managing stress along the way — keep them
                somewhere you will actually find them on a hard day.
            </p>

            {/* Mindfulness */}
            <div className="bg-white p-5 rounded-lg shadow mb-4">
                <h5 className="font-bold text-teal-800 mb-2">Mindfulness: what is it?</h5>
                <p className="text-sm mb-2">
                    Mindfulness is all about being fully present in the moment and really noticing what's
                    happening around you and inside you. When you practice mindfulness, you focus on your
                    feelings, your body, and your thoughts without judging them.
                </p>
                <p className="text-sm">
                    For example, if you're feeling anxious about a test, mindfulness helps you recognize that
                    feeling without getting overwhelmed. You might think, <em>"Okay, I feel anxious right now,
                    and that's okay."</em>
                </p>
            </div>

            <h5 className="font-bold text-teal-800 mb-3">Mindfulness techniques</h5>
            <div className="space-y-4 mb-6">
                {MINDFULNESS_TECHNIQUES.map((technique, index) => {
                    const Icon = technique.icon;
                    return (
                        <div key={technique.name} className="bg-white p-5 rounded-lg shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-600 text-sm font-bold text-white">
                                    {index + 1}
                                </span>
                                <Icon className="w-5 h-5 text-teal-700 shrink-0" />
                                <h6 className="font-semibold text-teal-800">{technique.name}</h6>
                            </div>
                            <ul className="list-disc space-y-2 pl-5 text-sm">
                                {technique.steps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ul>
                            {'closing' in technique && technique.closing && (
                                <p className="mt-3 text-sm italic text-gray-600">{technique.closing}</p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <p className="text-sm font-semibold text-teal-900">
                    Practicing mindfulness can help reduce stress, handle your feelings better, sleep more
                    soundly, and boost your focus. It can also make you more empathetic, help you do better in
                    school, create a more positive mindset, and lower feelings of anxiety and depression.
                </p>
            </div>

            {/* Gratitude */}
            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-teal-700" />
                    <h5 className="font-bold text-teal-800">Practice gratitude</h5>
                </div>
                <p className="text-sm mb-4">
                    Gratitude acts as a superpower, helping you release anger and focus on the positive aspects
                    of life. It fosters relaxation, reduces stress, and enhances feelings of joy and hope. Try
                    these four activities with family or friends:
                </p>
                <ol className="space-y-2 text-sm">
                    {GRATITUDE_ACTIVITIES.map((activity, index) => (
                        <li key={activity.name} className="flex items-start gap-2">
                            <span className="font-bold text-teal-600">{index + 1}.</span>
                            <span><strong>{activity.name}:</strong> {activity.detail}</span>
                        </li>
                    ))}
                </ol>
                <p className="mt-4 text-sm italic text-gray-600">
                    Gratitude shifts focus to the positives, and kindness to others often boosts your own mood.
                </p>
            </div>

            {/* Sleep */}
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-teal-700" />
                    <h5 className="font-bold text-teal-800">Sleep health</h5>
                </div>
                <p className="text-sm mb-3">
                    Sleep is when your body recovers, your hormones balance, and your memory consolidates —
                    it matters especially for teens.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm">
                    {SLEEP_FACTS.map((fact) => (
                        <li key={fact}>{fact}</li>
                    ))}
                </ul>
                <p className="mt-3 text-sm">
                    So make sure to prioritize your sleep. It's not just about resting; it's about taking care
                    of yourself for better days ahead.
                </p>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg shadow">
                <p className="text-sm">
                    <strong>If stress becomes more than you can manage on your own,</strong> that is not
                    failure — tell a trusted adult, your school counselor, or reach out to{" "}
                    <a
                        href="https://rizeprevention.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-teal-700 underline hover:text-teal-900"
                    >
                        RIZE Prevention
                    </a>
                    . In a crisis, call or text <strong>988</strong> for the Suicide &amp; Crisis Lifeline, any time of day.
                </p>
            </div>
        </div>
    );
}

export default StressManagementCard;
