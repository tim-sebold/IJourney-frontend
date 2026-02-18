import Whatsapp from "../assets/image/social/WhatsApp.svg";
import Container from "../assets/image/social/Facebook.svg";
import Instagram from "../assets/image/social/Instagram.svg";

export const headerData = {
    solutions: [
        { name: 'Milestone 1', title: "M1. Journeyer's Statement", description: 'Get a better understanding of your traffic', href: '/milestones/milestone1/1' },
        { name: 'Milestone 2', title: "M2. Oasis Explorations", description: 'Speak directly to your customers', href: '/milestones/milestone2/1' },
        { name: 'Milestone 3', title: "M3. Unchartered Territory", description: "Your customers' data will be safe and secure", href: '/milestones/milestone3/1' },
        { name: 'Milestone 4', title: "M4. Resources Roadways", description: 'Connect with third-party tools', href: '/milestones/milestone4/1' },
        { name: 'Milestone 5', title: "M5. Navigating Education", description: 'Build strategic funnels that will convert', href: '/milestones/milestone5/1' },
        { name: 'Milestone 6', title: "M6. Envisioning the Future", description: 'Get a better understanding of your traffic', href: '/milestones/milestone6/1' },
        { name: 'Milestone 7', title: "M7. Yielding to Growth", description: 'Your customers data will be safe and secure', href: '/milestones/milestone7/1' },
    ],
};

export const footerData = {
    quickLinks: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/aboutus" },
        { label: "Milestones", href: "milestones" },
        { label: "Overall Progress", href: "overRallProgress" },
    ],
    features: [
        { label: "Educational Video", href: "video" },
        { label: "6 GuidePosts", href: "guide" },
        { label: "Overall Progress", href: "overRallProgress" },
        { label: "Introduce", href: "introduce" },
    ],
    legal: [
        { label: "legal", href: "/" },
        { label: "legal", href: "/" },
        { label: "legal", href: "/" },
        { label: "legal", href: "/" },
    ],
    socialIcons: [
        {
            src: Whatsapp,
            alt: "Whats app",
        },
        {
            src: Container,
            alt: "Container",
            isNested: true,
        },
        {
            src: Instagram,
            alt: "Instagram",
        },
    ]
}

export const sidebarData = {
    milestoneMenus: [
        [
            { title: "M1.1: Your Inner Compass", url: "/milestones/milestone1/1" },
            { title: "M1.2: What's the Difference", url: "/milestones/milestone1/2" },
            { title: "M1.3: Exploring Your Emotions", url: "/milestones/milestone1/3" },
            { title: "M1.4: The Interactive Feelings Wheel", url: "/milestones/milestone1/4" },
            { title: "M1.5: Identifying Your True North", url: "/milestones/milestone1/5" },
            { title: "M1.6: The Guiding Questions", url: "/milestones/milestone1/6" },
            { title: "M1.7: Journeyer's Statement Builder", url: "/milestones/milestone1/7" }
        ],
        [
            { title: "M2.1: Intro Your Oasis", url: "/milestones/milestone2/1" },
            { title: "M2.2: The 6 Guideposts to EQ", url: "/milestones/milestone2/2" },
            { title: "M2.3: Mia's Story", url: "/milestones/milestone2/3" },
            { title: "M2.4: Jordan's Story", url: "/milestones/milestone2/4" },
            { title: "M2.5: EQ: Emotional Intelligence", url: "/milestones/milestone2/5" },
            { title: "M2.6: EQ Treasured Secrets", url: "/milestones/milestone2/6" },
            { title: "M2.7: What is Self-Esteem?", url: "/milestones/milestone2/7" },
            { title: "M2.8: Confidence", url: "/milestones/milestone2/8" },
            { title: "M2.9: Intro to Character", url: "/milestones/milestone2/9" },
            { title: "M2.10: The 24 Character Strengths", url: "/milestones/milestone2/10" },
            { title: "M2.11: Defining Your Strengths", url: "/milestones/milestone2/11" },
            { title: "M2.12: Gems In Treasure Chest", url: "/milestones/milestone2/12" },
            { title: "M2.13: Oasis Summary & Commit", url: "/milestones/milestone2/13" }
        ],
        [
            { title: "M3.1: Intro: The Map", url: "/milestones/milestone3/1" },
            { title: "M3.2: What is O*NET", url: "/milestones/milestone3/2" },
            { title: "M3.3: Career Discovery Input", url: "/milestones/milestone3/3" },
            { title: "M3.4: Lifestyle Calculator", url: "/milestones/milestone3/4" },
            { title: "M3.5: Career Research Log", url: "/milestones/milestone3/5" },
            { title: "M3.6: Career Assessment", url: "/milestones/milestone3/6" },
            { title: "M3.7: Territory Summary & Commit", url: "/milestones/milestone3/7" }
        ],
        [
            { title: "M4.1: Intro: The Guides", url: "/milestones/milestone4/1" },
            { title: "M4.2: Mapping Your Network", url: "/milestones/milestone4/2" },
            { title: "M4.3: Defining Roles", url: "/milestones/milestone4/3" },
            { title: "M4.4: Resource Inventory", url: "/milestones/milestone4/4" },
            { title: "M4.5: Roadways Summary & Commit", url: "/milestones/milestone4/5" }
        ],
        [
            { title: "M5.1: Navigating Education", url: "/milestones/milestone5/1" },
            { title: "M5.2: Types of Educational Journeys", url: "/milestones/milestone5/2" },
            { title: "M5.3: Investing in Your Education", url: "/milestones/milestone5/3" },
            { title: "M5.4: Student Loans & Selecting Your Journey", url: "/milestones/milestone5/4" },
            { title: "M5.5: Your Educational Journey Plan", url: "/milestones/milestone5/5" }
        ],
        [
            { title: "M6.1: Create Your Career Project Fair", url: "/milestones/milestone6/1" },
            { title: "M6.2: Your Journeyer's Statement", url: "/milestones/milestone6/2" },
            { title: "M6.3: Draft Your Statement", url: "/milestones/milestone6/3" },
            { title: "M6.4: Refine & Finalize Your Statement", url: "/milestones/milestone6/4" },
            { title: "M6.5: Create Your Career Project Fair", url: "/milestones/milestone6/5" },
        ],
        [
            { title: "M7.1: Yield to Growth", url: "/milestones/milestone7/1" },
            { title: "M7.2: Oasis Exploration", url: "/milestones/milestone7/2" },
            { title: "M7.3: Template & Reflection", url: "/milestones/milestone7/3" },
            { title: "M7.4: Celebration & Completion", url: "/milestones/milestone7/4" },
            { title: "M7.5: The Road Ahead", url: "/milestones/milestone7/5" }
        ]
    ]
};