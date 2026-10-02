import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import toast from "react-hot-toast";
import { extractAvatarBasedonName } from "../../../lib/utils";
import { useAuth } from "../../../context/AuthContext";
import { useProgress } from "../../../context/ProgressContext";

import {
    ChevronDownIcon,
    MenuIcon,
    XIcon,
    CheckCircle,
    LockKeyhole,
    LockKeyholeOpen,
    UserCircle2,
    BookOpenCheck,
    LucideChartNoAxesCombined,
    School,
    LogOut,
} from "lucide-react";

import { Button } from "../../../elements/buttons/button";

import LandingLogo from "../../../assets/image/landing-logo.png";
import { headerData } from "../../../datas/layoutData";

type NavItem = {
    label: string;
    href?: string;
    hasDropdown?: boolean;
};

const NAV_ITEMS: NavItem[] = [
    { label: "Home", hasDropdown: false, href: "/" },
    { label: "Course Map", hasDropdown: true },
    { label: "My Progress", hasDropdown: false, href: "overRallProgress" },
    { label: "About Us", hasDropdown: false, href: "/aboutus" },
];

function classNames(...xs: Array<string | false | undefined | null>) {
    return xs.filter(Boolean).join(" ");
}

function Avatar({
    name,
    avatarBase64,
}: {
    name?: string | null;
    displayName?: string | null;
    avatarBase64?: string | null;
}) {
    if (avatarBase64) {
        return (
            <img
                className="relative h-8 w-8 cursor-pointer rounded-full hover:opacity-90"
                alt={name ?? "User avatar"}
                src={avatarBase64}
            />
        );
    }

    if (name) {
        return (
            <div className="grid place-items-center rounded-full bg-ib-1 p-3 text-zinc-600">
                <span className="text-[16px] font-bold text-white">
                    {extractAvatarBasedonName(name)}
                </span>
            </div>
        );
    }

    return (
        <div className="bg-zinc-200"></div>
    );
}

function isMilestoneUnlocked(args: {
    userLoggedIn: boolean;
    index: number;
    currentMilestone: number | null;
    currentMilestoneChild: number | null;
    percent?: number;
}) {
    const { userLoggedIn, index, currentMilestone, currentMilestoneChild, percent } = args;

    if (!userLoggedIn) return false;

    if (currentMilestone && currentMilestoneChild) {
        return index < currentMilestone;
    }

    return Math.floor(percent ?? 0) === 100;
}

function MilestoneIcon({
    userLoggedIn,
    index,
    currentMilestone,
    percent,
}: {
    userLoggedIn: boolean;
    index: number;
    currentMilestone: number | null;
    percent?: number;
}) {
    if (!userLoggedIn) return <LockKeyhole aria-hidden="true" color="#5c5c5c" />;

    if (Math.floor(percent ?? 0) === 100) {
        return <CheckCircle aria-hidden="true" color="#2ECC71" />;
    }

    if (!currentMilestone) {
        return <LockKeyhole aria-hidden="true" color="#5c5c5c" />;
    }

    if (index < currentMilestone - 1) return <CheckCircle aria-hidden="true" color="#2ECC71" />;
    if (index === currentMilestone - 1) return <LockKeyholeOpen aria-hidden="true" color="#ff6f61" />;
    return <LockKeyhole aria-hidden="true" color="#5c5c5c" />;
}

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, userProfile, logout, isAdmin } = useAuth();
    const { progress, currentMilestone, currentMilestoneChild } = useProgress();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const activeLabel = useMemo(() => {
        if (location.pathname.includes("milestone")) return "Course Map";
        if (location.pathname === "/") return "Home";
        if (location.pathname === "/aboutus") return "About Us";
        return "";
    }, [location.pathname]);

    const goToLogin = () => navigate("/login");

    const goToProfile = () => navigate("/user-profile");

    const goToRecap = () => navigate("/recap");

    const goToProgressSection = () => {
        navigate("/");
        setTimeout(() => {
            document.getElementById("overRallProgress")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const onLogout = async () => {
        await logout();
        navigate("/");
    };

    const onNavigateItem = (item: NavItem) => {
        if (item.hasDropdown) return;

        if (!item.href) return;

        if (item.href.includes("/")) {
            navigate(item.href);
            return;
        }

        navigate("/");
        setTimeout(() => {
            document.getElementById(item.href!)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const onClickMilestone = (milestone: any, index: number) => {
        const unlocked = isMilestoneUnlocked({
            userLoggedIn: !!user,
            index,
            currentMilestone: currentMilestone ?? null,
            currentMilestoneChild: currentMilestoneChild ?? null,
            percent: progress?.summary?.percent,
        });

        if (!user) {
            toast.error("You need to log in to unlock the next milestone.");
            return;
        }

        if (!unlocked) {
            toast.error("You have not unlocked this milestone yet.");
            return;
        }

        navigate(milestone.href);
    };

    return (
        <section className="fixed z-4 flex w-full flex-col items-start">
            <nav className="flex w-full items-center bg-custom px-8 py-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] sm:justify-between">
                <div className="relative flex flex-1 items-center justify-between text-white">
                    <a href="/" aria-label="Home">
                        <img
                            className="relative h-8 w-36 cursor-pointer hover:opacity-90"
                            alt="Full logo white"
                            src={LandingLogo}
                        />
                    </a>
                </div>

                <div className="flex items-center gap-2 font-ib-1 text-white">
                    {user ? (
                        <Popover className="relative flex h-full">
                            <PopoverButton className="group flex cursor-pointer items-center gap-x-1 px-4 font-semibold outline-0 xl:px-8">
                                <Avatar
                                    name={userProfile?.name}
                                    displayName={userProfile?.displayName}
                                    avatarBase64={userProfile?.avatarBase64 ?? null}
                                />
                                <span className="max-w-[140px] truncate">{userProfile?.displayName ?? ""}</span>
                                <ChevronDownIcon aria-hidden="true" className="size-5" />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute right-0 top-[110%] z-10 flex w-screen max-w-max px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >
                                <div className="w-60 flex-auto overflow-hidden bg-white text-sm/6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] outline-1 -outline-offset-1 outline-white/80">
                                    <ul className="flex flex-col py-4">
                                        <li
                                            className="group relative flex cursor-pointer items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200"
                                            onClick={goToProfile}
                                        >
                                            <LucideChartNoAxesCombined size={20} />
                                            <span>My Profile</span>
                                        </li>

                                        <li
                                            className="group relative flex cursor-pointer items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200"
                                            onClick={goToProgressSection}
                                        >
                                            <UserCircle2 size={20} />
                                            <span>My Progress</span>
                                        </li>

                                        <li
                                            className="group relative flex cursor-pointer items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200"
                                            onClick={goToRecap}
                                        >
                                            <BookOpenCheck size={20} />
                                            <span>My Recap</span>
                                        </li>

                                        {isAdmin && (
                                            <li
                                                className="group relative flex cursor-pointer items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200"
                                                onClick={() => navigate("/admin")}
                                            >
                                                <School size={20} />
                                                <span>School Codes</span>
                                            </li>
                                        )}

                                        <li className="border border-gray-300" />

                                        <li
                                            className="group relative flex cursor-pointer items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200"
                                            onClick={onLogout}
                                        >
                                            <LogOut size={20} />
                                            <span>Log Out</span>
                                        </li>
                                    </ul>
                                </div>
                            </PopoverPanel>
                        </Popover>
                    ) : (
                        <Button
                            onClick={goToLogin}
                            className="relative h-auto cursor-pointer items-center justify-center rounded-2xl bg-[#ff6f61] text-white transition-colors hover:bg-[#ff6f61]/80"
                        >
                            Log In
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer lg:hidden"
                        onClick={() => setMobileMenuOpen((v) => !v)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </Button>
                </div>
            </nav>

            <div className="relative hidden w-full justify-center lg:flex">
                <ul className="absolute -top-6 flex flex-col rounded-full bg-white px-8 text-[16px] text-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] lg:flex-row">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.label === activeLabel;

                        return (
                            <li
                                key={item.label}
                                className={classNames(
                                    "relative transition-opacity hover:opacity-90 hover:border-b-3 hover:border-[#ff6f61]",
                                    isActive && "cursor-pointer border-b-3 border-[#ff6f61] text-[#ff6f61]"
                                )}
                            >
                                <Popover className="relative flex h-full">
                                    <PopoverButton
                                        onClick={() => onNavigateItem(item)}
                                        className="group flex cursor-pointer items-center gap-x-1 px-4 py-2 font-semibold outline-0 xl:px-8"
                                    >
                                        <span>{item.label}</span>
                                        {item.hasDropdown && (
                                            <ChevronDownIcon aria-hidden="true" className="size-5 transition" />
                                        )}
                                    </PopoverButton>

                                    {item.hasDropdown && (
                                        <PopoverPanel
                                            transition
                                            className="absolute left-0 top-[110%] z-10 flex w-screen max-w-max px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                        >
                                            <div className="w-screen max-w-sm flex-auto overflow-hidden bg-white text-sm/6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] outline-1 -outline-offset-1 outline-white/80">
                                                <div className="flex flex-col py-4">
                                                    {headerData.solutions.map((m: any, idx: number) => {
                                                        const unlocked = isMilestoneUnlocked({
                                                            userLoggedIn: !!user,
                                                            index: idx,
                                                            currentMilestone: currentMilestone ?? null,
                                                            currentMilestoneChild: currentMilestoneChild ?? null,
                                                            percent: progress?.summary?.percent,
                                                        });

                                                        return (
                                                            <div
                                                                key={idx}
                                                                onClick={() => (unlocked ? onClickMilestone(m, idx) : onClickMilestone(m, idx))}
                                                                className={classNames(
                                                                    "group relative flex items-center gap-x-4 rounded-lg px-6 pb-3 pt-2 transition-colors hover:bg-gray-200",
                                                                    unlocked ? "cursor-pointer" : "cursor-not-allowed"
                                                                )}
                                                            >
                                                                <div className="mt-1 flex size-8 flex-none items-center justify-center rounded-lg bg-white">
                                                                    <MilestoneIcon
                                                                        userLoggedIn={!!user}
                                                                        index={idx}
                                                                        currentMilestone={currentMilestone ?? null}
                                                                        percent={progress?.summary?.percent}
                                                                    />
                                                                </div>

                                                                <div className="flex flex-col text-gray-800">
                                                                    <span className="text-[14px] font-bold">{m.title}</span>
                                                                    <span className="text-[12px] leading-3">{m.description}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </PopoverPanel>
                                    )}
                                </Popover>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Below `lg` the pill navigation above is hidden, so this is the only way
                to reach the course map or About Us on a phone. */}
            {mobileMenuOpen && (
                <div className="w-full bg-white text-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] lg:hidden">
                    <ul className="flex max-h-[calc(100vh-70px)] flex-col overflow-y-auto py-2 font-ib-1">
                        {NAV_ITEMS.filter((item) => !item.hasDropdown).map((item) => (
                            <li key={item.label}>
                                <button
                                    type="button"
                                    onClick={() => { setMobileMenuOpen(false); onNavigateItem(item); }}
                                    className={classNames(
                                        "w-full cursor-pointer px-8 py-3 text-left font-semibold hover:bg-gray-200",
                                        item.label === activeLabel && "text-[#ff6f61]"
                                    )}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        <li className="border-t border-gray-200 px-8 pb-1 pt-3 text-xs font-bold uppercase text-gray-500">
                            Course Map
                        </li>
                        {headerData.solutions.map((m, idx) => (
                            <li key={m.href}>
                                <button
                                    type="button"
                                    onClick={() => { setMobileMenuOpen(false); onClickMilestone(m, idx); }}
                                    className="flex w-full cursor-pointer items-center gap-x-3 px-8 py-2 text-left hover:bg-gray-200"
                                >
                                    <MilestoneIcon
                                        userLoggedIn={!!user}
                                        index={idx}
                                        currentMilestone={currentMilestone ?? null}
                                        percent={progress?.summary?.percent}
                                    />
                                    <span className="text-[14px] font-bold text-gray-800">{m.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
