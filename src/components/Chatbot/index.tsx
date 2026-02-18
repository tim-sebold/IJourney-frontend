import { useEffect, useState } from 'react';
import {
    SearchIcon
} from 'lucide-react';
import { Input } from '../../elements/input';
import { Card, CardContent } from '../../elements/card';

import BotImage from '../../assets/image/bot.jfif';
import CloseIcon from '../../assets/image/icon-close.svg';
import CloseIconCircle from '../../assets/image/icon-closecircle.svg';
import IconVector1 from '../../assets/image/icon-1.svg';
import IconVector2 from '../../assets/image/icon-2.svg';
import IconVector3 from '../../assets/image/icon-3.svg';
import IconIndicator from '../../assets/image/icon-indicator.svg';
import ImageChatbot from '../../assets/image/chatbot.png';

function Chatbot() {
    const [search, setSearch] = useState<string>("");
    const [openState, setOpenState] = useState(false);
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString()); // Local system time
        };

        update(); // Update immediately on load

        const interval = setInterval(update, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    const chatbotHandler = () => {
        setOpenState(!openState);
    }

    const clearSearch = () => {
        setSearch("");
    }

    return (
        openState ? (
            <div className='w-[300px] md:w-[350px] fixed z-20 bg-[#F3F3F3] right-5 bottom-20 rounded-2xl shadow-2xl font-ib-3'>
                <div className="flex flex-col gap-0 items-start">
                    <div className="flex w-full justify-between items-center bg-white px-4 pt-4 pb-2 rounded-2xl">
                        <div className="time font-bold text-[16px]">{time}</div>
                        <div className="" onClick={chatbotHandler}>
                            <img src={CloseIcon} alt="" className='cursor-pointer hover:opacity-80' />
                        </div>
                    </div>
                    <div className="search-line flex justify-between items-center w-full  px-4 py-2">
                        <div className="search flex items-center w-full">
                            <SearchIcon />
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for bots or people" className='border-none shadow-none'></Input>
                        </div>
                        <div className="" onClick={clearSearch}>
                            <img src={CloseIconCircle} alt="" className='cursor-pointer hover:opacity-80' />
                        </div>
                    </div>
                    <div className="topbar flex justify-between items-center w-full  px-4 py-2 bg-white">
                        <div className="flex items-center gap-2">
                            <img src={IconVector2} alt="" className='cursor-pointer hover:opacity-80' />
                            <div className="bot flex items-center gap-1">
                                <div className="">
                                    <img src={BotImage} alt="" className='rounded-full w-12' />
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="name ml-1 font-bold text-[14px]">AIBot</div>
                                    <div className="text-[12px]">@Official</div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <img src={IconVector1} alt="" className='cursor-pointer hover:opacity-80' />
                        </div>
                    </div>
                    <div className="chat flex flex-col items-start px-4 py-2 w-full h-[400px] overflow-auto">
                        <div className="flex justify-center w-full">
                            <img src={BotImage} alt="" className='rounded-full w-36 border-8 border-white' />
                        </div>
                        <div className="main-chat flex flex-col gap-2">
                            <Card className="flex flex-col items-start relative w-full bg-white border-none rounded-[20px] max-w-[250px]">
                                <CardContent className="flex flex-col items-start gap-[30px] p-3 text-[14px] font-medium">
                                    <p className="flex items-center justify-center self-stretch font-body-b3 text-second-text-color [font-style:var(--body-b3-font-style)]">
                                        I'll help you explore your learning path step-by-step. Ready to begin?
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="send-message flex flex-col w-full px-4 py-2">
                        <div className="send-message flex justify-between bg-white p-2">
                            <Input type="text" placeholder="Type a message" className='border-none shadow-none' />
                            <img src={IconVector3} alt="" className='cursor-pointer hover:opacity-80 placeholder:text-[5c5c5c]' />
                        </div>
                        <div className="flex justify-center mt-5">
                            <img src={IconIndicator} alt="" className='cursor-pointer hover:opacity-80 bg-["5c5c5c"]' />
                        </div>
                    </div>
                </div>
            </div>
        )
            :
            (
                <div className="right-10 bottom-10 rounded-2xl font-ib-3 fixed" onClick={chatbotHandler}>
                    <img src={ImageChatbot} alt="" className='cursor-pointer hover:opacity-80 w-15' />
                </div>
            )
    )
}

export default Chatbot