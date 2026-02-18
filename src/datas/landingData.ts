import Image12 from '../assets/image/png/12.png';
import Image179 from '../assets/image/png/179.png';
import Image94 from '../assets/image/png/94.png';
import Image146 from '../assets/image/png/146.png';
import Image31 from '../assets/image/png/31.png';
import Image82 from '../assets/image/png/82.png';
import IconLamp from '../assets/image/guide-posts/lamp.jpg';
import IconBrain from '../assets/image/guide-posts/key.png';
import IconControl from '../assets/image/guide-posts/control-panel.jpg';
import IconPerson from '../assets/image/guide-posts/person.png';
import IconMark from '../assets/image/guide-posts/person-mark.png';
import IconFriend from '../assets/image/guide-posts/two-people.png';

export const heroSectionData = {
    formFields: [
        {
            id: "name",
            label: "Name*",
            placeholder: "Full Name",
            type: "text",
        },
        {
            id: "email",
            label: "E - Mail Address*",
            placeholder: "example@gmail.com",
            type: "email",
        },
        {
            id: "password",
            label: "Password *",
            placeholder: "New Password",
            type: "password",
        },
        {
            id: "confirmPassword",
            label: "Re - Password *",
            placeholder: "Re New Password",
            type: "password",
            hasIcon: true,
        },
    ],
    guidePosts: [
        {
            image: IconLamp,
            number: "01",
            description: `Increasing Self Awareness`,
            bgColor: "bg-[#ffccab]",
            hoverBgColor: "hover:bg-[#f1af82]",
            ImageColor: "bg-[#ffede2]"
        },
        {
            image: IconBrain,
            number: "02",
            description: `Effective Problem Solving`,
            bgColor: "bg-[#d6a7e4]",
            hoverBgColor: "hover:bg-[#d27bec]",
            ImageColor: "bg-[#f8e2ff]"
        },
        {
            image: IconControl,
            number: "03",
            description: `Managing Emotions`,
            bgColor: "bg-[#a8d2d4]",
            hoverBgColor: "hover:bg-[#6adfe6]",
            ImageColor: "bg-[#daf2f4]"
        },
        {
            image: IconFriend,
            number: "04",
            description: `Smart Decision Making`,
            bgColor: "bg-[#efe6ab]",
            hoverBgColor: "hover:bg-[#e6d779]",
            ImageColor: "bg-[#fdf7d0]"
        },
        {
            image: IconMark,
            number: "05",
            description: `Using Empathy In Relationships`,
            bgColor: "bg-[#f3b2db]",
            hoverBgColor: "hover:bg-[#eb7cc2]",
            ImageColor: "bg-[#ffe3f5]"
        },
        {
            image: IconPerson,
            number: "06",
            description: `Taking Responsibility for Actions`,
            bgColor: "bg-[#ffb7b0]",
            hoverBgColor: "hover:bg-[#f7887e]",
            ImageColor: "bg-[#ffdeda]"
        },
    ]
}

export const featureData = {
    featureCards: [
        {
            image: Image12,
            title: "Journeyer's Statement",
            description:
                'A strong, inspiring reminder of your "why" that serves as a personal mantra.',
        },
        {
            image: Image179,
            title: "The Feelings Wheel",
            description:
                "A tool to help navigate your emotional landscape and increase self-awareness.",
        },
        {
            image: Image94,
            title: "Emotions vs. Feelings",
            description:
                "Emotions are the body's quick, natural responses, while feelings are the stories or meanings you attach to those emotions.",
        },
        {
            image: Image146,
            title: "Emotional Intelligence",
            description:
                'Presented as a "wisdom compass"  that helps you manage stress and respond to emotions by building bridges, not walls.',
        },
        {
            image: Image31,
            title: "Confidence Compass",
            description:
                "A tool to help you reflect on your self-esteem traits and identify whether your confidence is low, healthy, or overly high.",
        },
        {
            image: Image82,
            title: "Mental Health",
            description:
                "It's super important to take care of your mental health, especially if you're feeling down or overwheimed.",
        }
    ]
}

export const milestoneData = {
    milestones: [
        {
            id: 1,
            time: "99:41",
            name: "Milestone 1",
            title: "Your Inner Compass",
            description:
                'Focuses on self-reflection to discover your "why" or motivation that will keep you going.',
            status: "completed",
            progress: 100,
            statusBadge: "Completed",
            statusColor: "bg-gradient-to-r from-[#6ab04c] to-[#badc58]",
        },
        {
            id: 2,
            time: "59:41",
            name: "Milestone 2",
            title: "What's the Difference?",
            description:
                "Centers on uncovering your unique strengths, character traits, and treasures.",
            status: "completed",
            progress: 100,
            statusBadge: "Completed",
            statusColor: "bg-gradient-to-r from-[#6ab04c] to-[#badc58]",
        },
        {
            id: 3,
            time: "20:00",
            name: "Milestone 3",
            title: "Exploring Your Emotions",
            description:
                "Guides you through career exploration including Career Assessment and O*NET Job Zones.",
            status: "continue",
            progress: 68,
            statusBadge: "Continue",
            statusColor: "bg-gradient-to-r from-[#ffa502] to-[#ff6348]",
        },
        {
            id: 4,
            time: "00:00",
            name: "Milestone 4",
            title: "The Interactive Feelings Wheel",
            description:
                "Focuses on identifying and utilizing school and community resources to support your dreams.",
            status: "locked",
            progress: 0,
            statusBadge: "Locked",
            statusColor: "bg-gradient-to-r from-black to-black",
        },
        {
            id: 5,
            time: "00:00",
            name: "Milestone 5",
            title: "Identifying Your True North",
            description:
                "Explores advanced self-discovery techniques and personal growth strategies.",
            status: "locked",
            progress: 0,
            statusBadge: "Locked",
            statusColor: "bg-gradient-to-r from-black to-black",
        },
        {
            id: 6,
            time: "00:00",
            name: "Milestone 6",
            title: "The Guiding Questions",
            description:
                "Develops leadership skills and community engagement opportunities.",
            status: "locked",
            progress: 0,
            statusBadge: "Locked",
            statusColor: "bg-gradient-to-r from-black to-black",
        },
        {
            id: 7,
            time: "00:00",
            name: "Milestone 7",
            title: "Journeyer's Statement Builder",
            description:
                "Final integration of all learnings and creation of your personal action plan.",
            status: "locked",
            progress: 0,
            statusBadge: "Locked",
            statusColor: "bg-gradient-to-r from-black to-black",
        },
    ]
}