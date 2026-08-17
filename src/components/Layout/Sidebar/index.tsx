import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../../context/ProgressContext';
import toast from 'react-hot-toast';

import { Progress, Button } from '../../../elements';

import { sidebarData, headerData } from '../../../datas/layoutData';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ArrowLeftFromLine, ArrowRightFromLine, AlarmClock, AlarmClockCheck, AlarmClockMinusIcon } from "lucide-react";

import { control_scroll } from '../../../lib/utils';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const navigate = useNavigate();
    const { currentMilestone, currentMilestoneChild, refreshProgress, progress } = useProgress();

    const url = document.baseURI.split('/');
    const params = useParams();

    useEffect(() => {
        control_scroll("top");
        refreshProgress();
    }, [params, refreshProgress])

    const handleMilestone = (menu: any) => {
        navigate(menu.url);
    }

    const handleMilestone1 = (menu: any, index: number) => {
        if (currentMilestone && currentMilestoneChild && index < currentMilestoneChild) {
            navigate(menu.url);
        } else {
            toast.error("You have not unlocked this milestone yet.");
        }
    }

    return (
        <aside className={`fixed top-0 left-0 z-2 pt-24 h-full bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-gray-600 transition-[width] duration-300 ease-in-out px-3 py-5 ${collapsed ? "w-16" : "w-92 max-w-[85vw]"}`}>
            <div className="relative my-4 flex items-center">
                <Button
                    type="button"
                    aria-label={collapsed ? "Expand milestone sidebar" : "Collapse milestone sidebar"}
                    aria-expanded={!collapsed}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    onClick={onToggle}
                    className="absolute top-2 -right-8 z-30 h-10 w-10 rounded-full border border-custom bg-white p-0 shadow-md cursor-pointer hover:bg-custom hover:text-white group"
                >
                    {collapsed ? <ArrowRightFromLine size={20} className="text-ib-2 group-hover:text-white" /> : <ArrowLeftFromLine size={20} className="text-ib-2 group-hover:text-white" />}
                </Button>
            </div>
            {!collapsed && (
                <div className="mt-10 mb-4 overflow-hidden px-2 text-center">
                    <span className="block truncate whitespace-nowrap font-bold text-[#5197ff] text-2xl">
                        {headerData.solutions[parseInt(url[url.length - 2].replace("milestone", "")) - 1].title}
                    </span>
                </div>
            )}
            <div className={`w-full px-2 relative ${collapsed ? "pt-5" : ""}`}>
                <div className="flex justify-between">
                    {!collapsed && <span className="text-left font-bold text-xl sm:text-[14px]">{Math.floor(progress?.summary.percent)}%</span>}
                    {!collapsed && <span className='font-bold absolute top-2 p-3 -translate-y-1/2 right-1 text-center'>{sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].length}</span>}
                    {collapsed && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-bold text-ib-2">
                            {sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].length}
                        </span>
                    )}
                </div>
                <div className="relative w-full h-2 bg-[#385581] rounded-full overflow-hidden">
                    <Progress
                        value={Math.floor(progress?.summary.percent)}
                        className="h-full bg-[#385581] [&>div]:bg-[#5197ff]"
                    />
                </div>
            </div>
            <div className={`relative flex mt-8 mb-2 ${collapsed ? "h-10" : ""}`}>
                {!collapsed && <h4 className="font-bold px-2 py-1 text-center text-ib-2">Milestones</h4>}
                <h4 className="px-2 py-1 cursor-pointer text-center font-bold absolute right-1 bg-ib-2 w-[34px] text-white">M</h4>
            </div>

            <ul className="flex h-[calc(100%-15rem)] flex-col overflow-y-auto pb-8 list-none">
                {sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].map((menu, index) => (
                    Math.floor(progress?.summary.percent) === 100 ||
                        currentMilestone && parseInt(url[url.length - 2].replace("milestone", "")) < currentMilestone ?
                        <li key={index} title={collapsed ? menu.title : undefined} className={`relative flex items-center cursor-pointer p-2 overflow-hidden leading-8 hover:bg-gray-200 ${parseInt(url[url.length - 1]) === index + 1 && "bg-white text-custom"}`} onClick={() => handleMilestone(menu)} >
                            <AlarmClockCheck size={25} className="h-[25px] w-[25px] min-w-[25px] shrink-0" />
                            {!collapsed && <span className="ml-4 min-w-0 flex-1 truncate whitespace-nowrap font-bold leading-5" >
                                {menu.title}
                            </span>}
                        </li>
                        :
                        parseInt(url[url.length - 2].replace("milestone", "")) === currentMilestone ?
                            <li key={index} title={collapsed ? menu.title : undefined} className={`relative flex items-center overflow-hidden p-2 leading-[1.8rem] ${parseInt(url[url.length - 1]) === index + 1 && "bg-white text-custom"} ${currentMilestoneChild && currentMilestoneChild > index ? " hover:bg-gray-200 cursor-pointer" : "opacity-50 cursor-not-allowed"}`} onClick={() => handleMilestone1(menu, index)} >
                                {currentMilestoneChild && index + 1 < currentMilestoneChild && <AlarmClockCheck size={25} className="h-[25px] w-[25px] min-w-[25px] shrink-0" />}
                                {index + 1 === currentMilestoneChild && <AlarmClock size={25} className="h-[25px] w-[25px] min-w-[25px] shrink-0" />}
                                {currentMilestoneChild && index + 1 > currentMilestoneChild && <AlarmClockMinusIcon size={25} className="h-[25px] w-[25px] min-w-[25px] shrink-0" />}
                                {!collapsed && <span className="ml-4 min-w-0 flex-1 truncate whitespace-nowrap font-bold leading-5" >
                                    {menu.title}
                                </span>}
                            </li>
                            :
                            <li key={index} title={collapsed ? menu.title : undefined} className="relative flex items-center overflow-hidden p-2 leading-[1.8rem] cursor-not-allowed" onClick={() => handleMilestone(menu)} >
                                <AlarmClockCheck size={25} className="h-[25px] w-[25px] min-w-[25px] shrink-0" />
                                {!collapsed && <span className="ml-4 min-w-0 flex-1 truncate whitespace-nowrap font-bold leading-5" >
                                    {menu.title}
                                </span>}
                            </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
