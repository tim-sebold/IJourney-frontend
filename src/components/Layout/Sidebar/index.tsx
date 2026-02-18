import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../../context/ProgressContext';
import toast from 'react-hot-toast';

import { Progress, Button } from '../../../elements';

import { sidebarData, headerData } from '../../../datas/layoutData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ArrowLeftFromLine, ArrowRightFromLine, AlarmClock, AlarmClockCheck, AlarmClockMinusIcon } from "lucide-react";

import { control_scroll } from '../../../lib/utils';
import useIsDesktop from '../../../hooks/useIsDesktop';

function Sidebar() {
    const isDesktop = useIsDesktop();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { currentMilestone, currentMilestoneChild, refreshProgress, progress } = useProgress();

    const url = document.baseURI.split('/');
    const params = useParams();

    useEffect(() => {
        control_scroll("top");
        refreshProgress();
    }, [params])

    const handleMilestone = (menu: any) => {
        navigate(menu.url);
    }

    useEffect(() => {
        if (!isDesktop) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [isDesktop]);

    const handleMilestone1 = (menu: any, index: number) => {
        if (currentMilestone && currentMilestoneChild && index < currentMilestoneChild) {
            navigate(menu.url);
        } else {
            toast.error("You have not unlocked this milestone yet.");
        }
    }

    return (
        <aside className={`fixed top-0 left-0 z-2 pt-24 h-full bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-gray-600 transition-all duration-500 px-3 py-5 ${collapsed ? "w-16" : "w-92"}`}>
            <div className="relative my-4 flex items-center">
                <Button
                    type="button"
                    aria-label="Toggle sidebar"
                    onClick={() => setCollapsed((prev) => !prev)}
                    className={`absolute top-1/2 -translate-y-1/2 p-2 rounded-none border border-custom cursor-pointer right-1 hover:bg-custom hover:text-white group lg:hidden`}>
                    {collapsed ? <ArrowRightFromLine size={20} className="group-hover:text-white text-custom" /> : <ArrowLeftFromLine size={20} className="group-hover:text-white text-custom" />}
                </Button>
            </div>
            <div className={`transition-opacity mt-10 mb-4 text-center px-2 duration-500 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <span className="whitespace-nowrap font-bold text-[#5197ff] text-2xl">{headerData.solutions[parseInt(url[url.length - 2].replace("milestone", "")) - 1].title}</span>
            </div>
            <div className="w-full px-2 relative">
                <div className="flex justify-between">
                    <span className={`text-left font-bold text-xl sm:text-[14px] transition-opacity duration-500 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>{Math.floor(progress?.summary.percent)}%</span>
                    <span className='font-bold absolute top-2 p-3 -translate-y-1/2 right-1 text-center'>{sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].length}</span>
                </div>
                <div className="relative w-full h-2 bg-[#385581] rounded-full overflow-hidden">
                    <Progress
                        value={Math.floor(progress?.summary.percent)}
                        className="h-full bg-[#385581] [&>div]:bg-[#5197ff]"
                    />
                </div>
            </div>
            <div className="relative flex mt-8 mb-2">
                <h4 className={`font-bold px-2 py-1 text-center text-ib-2 transition-opacity duration-500 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>Milestones</h4>
                <h4 className="px-2 py-1 cursor-pointer text-center font-bold absolute right-1 bg-ib-2 w-[34px] text-white">M</h4>
            </div>

            <ul className="flex flex-col list-none h-full">
                {sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].map((menu, index) => (
                    Math.floor(progress?.summary.percent) === 100 ||
                        currentMilestone && parseInt(url[url.length - 2].replace("milestone", "")) < currentMilestone ?
                        <li key={index} className={`relative cursor-pointer p-2 overflow-hidden leading-8 whitespace-nowrap hover:bg-gray-200 ${parseInt(url[url.length - 1]) === index + 1 && "bg-white text-custom"}`} onClick={() => handleMilestone(menu)} >
                            <AlarmClockCheck size={25} className="inline-block" />
                            <span className={`ml-4 font-bold transition-opacity duration-500 w-full ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`} >
                                {menu.title}
                            </span>
                            {collapsed && (
                                <span className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 rounded-[0.4rem] bg-white px-[0.9rem] py-1 text-[1.4rem] text-[#17171e] opacity-0 shadow-[0_5px_10px_rgba(0,0,0,0.2)] transition-opacity duration-500">
                                    {menu.title}
                                </span>
                            )}
                        </li>
                        :
                        parseInt(url[url.length - 2].replace("milestone", "")) === currentMilestone ?
                            <li key={index} className={`relative whitespace-nowrap overflow-hidden p-2 leading-[1.8rem] ${parseInt(url[url.length - 1]) === index + 1 && "bg-white text-custom"} ${currentMilestoneChild && currentMilestoneChild > index ? " hover:bg-gray-200 cursor-pointer" : "opacity-50 cursor-not-allowed"}`} onClick={() => handleMilestone1(menu, index)} >
                                {currentMilestoneChild && index + 1 < currentMilestoneChild && <AlarmClockCheck size={25} className="inline-block" />}
                                {index + 1 === currentMilestoneChild && <AlarmClock size={25} className="inline-block" />}
                                {currentMilestoneChild && index + 1 > currentMilestoneChild && <AlarmClockMinusIcon size={25} className="inline-block" />}
                                <span className={`ml-4 font-bold transition-opacity duration-500 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`} >
                                    {menu.title}
                                </span>
                                {collapsed && (
                                    <span className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 rounded-[0.4rem] bg-white px-[0.9rem] py-1 text-[1.4rem] text-[#17171e] opacity-0 shadow-[0_5px_10px_rgba(0,0,0,0.2)] transition-opacity duration-500">
                                        {menu.title}
                                    </span>
                                )}
                            </li>
                            :
                            <li key={index} className={`relative whitespace-nowrap overflow-hidden p-2 leading-[1.8rem] cursor-not-allowed`} onClick={() => handleMilestone(menu)} >
                                <AlarmClockCheck size={25} className="inline-block" />
                                <span className={`ml-4 font-bold transition-opacity duration-500 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`} >
                                    {menu.title}
                                </span>
                                {collapsed && (
                                    <span className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 rounded-[0.4rem] bg-white px-[0.9rem] py-1 text-[1.4rem] text-[#17171e] opacity-0 shadow-[0_5px_10px_rgba(0,0,0,0.2)] transition-opacity duration-500">
                                        {menu.title}
                                    </span>
                                )}
                            </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
