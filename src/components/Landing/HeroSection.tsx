import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import type { InputValues } from '../../lib/types';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { heroSectionData } from '../../datas/landingData';
import { validateRegisterForm } from '../../lib/validation';
import { register } from '../../controllers/authController';
import { unlockNext } from '../../controllers/courseController';

import {
    Badge,
    Button,
    Card,
    CardContent,
    Input,
    Label,
    Progress
} from '../../elements';
import BlindEye from '../../assets/image/blind-eye.svg';
import BlindEyeOpen from '../../assets/image/blind-eye-open.svg';
import ImageHeader from '../../assets/image/guide-posts/title.png';
import ImageBook from '../../assets/image/book.png';
import { sidebarData } from '../../datas/layoutData';


function HeroSection() {
    const { user, loginWithEmailPassword } = useAuth();
    const { refreshProgress, progress, currentMilestone, currentMilestoneChild } = useProgress();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<Array<boolean>>([false, false]);
    const [inputValues, setInputValues] = useState<InputValues>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = inputValues;
        const { isValid, errors } = validateRegisterForm(name, email, password, confirmPassword);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const data = await register(name, email, password, "user");

            if (data.success) {
                toast.success(data.message);

                await loginWithEmailPassword(email, password);
                setInputValues({ name: "", email: "", password: "", confirmPassword: "" });
            } else {
                toast.error(data.message);
            }

            navigate('/');
        } catch (error: any) {
            console.log("Firebase error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputValues((prev) => ({ ...prev, [id]: value }));
    }

    const handleContinue = async () => {
        if (user) {
            if (currentMilestone) {
                navigate(`/milestones/milestone${currentMilestone}/${currentMilestoneChild}`);
            } else {
                try {
                    const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone0/1", prevMilestoneId: "start" });
                    console.log(result)
                    toast.success(result.message);
                    await refreshProgress();
                    navigate('/milestones/milestone0/1');
                } catch (error: any) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
    }

    return (
        <section className="pt-[120px] relative w-full slide flex justify-center min-h-screen">
            <div className="flex justify-center items-center md:justify-between flex-col lg:flex-row px-8 py-16 container gap-20 xl:gap-70">
                <div className="flex items-center justify-center flex-1 text-white w-full gap-3">
                    <div className="flex flex-col gap-4 relative" id="guide">
                        <div className="border-r-4 border-white border-dashed h-full absolute left-[50%] z-1"></div>
                        <div className="flex flex-col justify-center items-center z-2">
                            <img src={ImageHeader} alt="" className="w-[300px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 gap-y-10">
                            {heroSectionData.guidePosts.map((post, index) => (
                                index % 2 === 0 ? (
                                    <div key={index} className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors ${post.hoverBgColor} justify-between items-center sm:rounded-[200px_0px_0px_200px] ${post.bgColor} p-3 pr-2 max-w-[200px] text-black font-bold opacity-0 animate-fade-in [animation-delay:${index + 1}00ms]`}>
                                        <div className={`p-1 ${post.ImageColor} rounded-full`}>
                                            <img src={post.image} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span>{post.number}.</span>
                                            <span>{post.description}</span>
                                        </div>
                                    </div>
                                ) :
                                    (
                                        <div key={index} className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors ${post.hoverBgColor} justify-between items-center sm:rounded-[0px_200px_200px_0px] ${post.bgColor} p-3 pl-2 max-w-[200px] text-black font-bold opacity-0 animate-fade-in [animation-delay:${index}00ms]`}>
                                            <div className="flex flex-col">
                                                <span>{post.number}.</span>
                                                <span>{post.description}</span>
                                            </div>
                                            <div className={`p-1 ${post.ImageColor} rounded-full`}>
                                                <img src={post.image} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                            </div>
                                        </div>
                                    )
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full opacity-0 animate-fade-in [animation-delay:200ms]">
                    {!user ?
                        <Card className="w-full border-0 rounded-none m-auto max-w-[460px]">
                            <CardContent className="flex flex-col items-center bg-white shadow-[0px_10px_10px_rgba(0,0,0,0.25)] gap-10 p-10">
                                <h4 className="text-center uppercase font-bold wrap-anywhere">
                                    Create Account
                                </h4>
                                <form className="flex flex-col items-start gap-2 w-full bg-white overflow-hidden" onSubmit={handleSubmit}>
                                    {
                                        heroSectionData.formFields.map((field, index) => (
                                            <div key={index} className="w-full flex flex-col">
                                                <Label
                                                    htmlFor={field.id}
                                                    className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap"
                                                >
                                                    {field.label}
                                                </Label>
                                                <div className="relative w-full mb-2">
                                                    <Input
                                                        id={field.id}
                                                        type={field.type === "password" ? (showPassword[index - 2] ? "text" : "password") : field.type}
                                                        placeholder={field.placeholder}
                                                        onChange={handleChange}
                                                        autoComplete={field.id}
                                                        className="w-full rounded-none border text-[16px] border-solid px-3 py-6 border-gray-300 font-ib-1 font-normal tracking-[0.20px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    />
                                                    {field.type === "password" && (
                                                        <>
                                                            <img src={BlindEye} onClick={() => { setShowPassword(showPassword.map((item, i) => i === index - 2 ? !item : item)) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[index - 2] ? "hidden" : "show"}`} />
                                                            <img src={BlindEyeOpen} onClick={() => { setShowPassword(showPassword.map((item, i) => i === index - 2 ? !item : item)) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[index - 2] ? "show" : "hidden"}`} />
                                                        </>
                                                    )}
                                                </div>
                                                {errors[field.id] && <Badge className='text-red-600'>{errors[field.id]}</Badge>}
                                            </div>
                                        ))}
                                    <Button type="submit" className="flex w-full h-auto cursor-pointer gap-3 px-6 py-3 bg-[#ff6f61] items-center justify-center relative rounded-full hover:bg-[#ff6f61]/80 transition-colors">
                                        <span className="relative flex items-center justify-center font-ib-3 text-[16px] font-medium tracking-[1.2px] text-white whitespace-pre-wrap">
                                            {
                                                loading ?
                                                    <div className='flex flex-col sm:flex-row justify-center items-center gap-2'>
                                                        <svg className="spinner" viewBox="0 0 24 24"></svg>
                                                        Creating Account...
                                                    </div>
                                                    : "Create Account"
                                            }
                                        </span>
                                    </Button>
                                </form>
                                <Link to="/login" className="font-bold underline text-ib-1 hover:text-ib-1/80">Log In</Link>
                            </CardContent>
                        </Card>
                        :
                        <div className="relative flex flex-col items-center">
                            <div className="max-w-[500px]">
                                <img
                                    className="w-full h-auto object-contain"
                                    alt="Journey illustration"
                                    src={ImageBook}
                                />
                            </div>

                            <Card className="absolute -bottom-28 left-0 right-0 rounded-t-3xl rounded-b-none border-0 shadow-2xl bg-white">
                                <CardContent className="p-6 sm:p-8 space-y-2 sm:space-y-6">
                                    <div className="space-y-2">
                                        <p className="font-extrabold text-[#252b42] sm:text-[24px] md:text-[40px] lg:text-[32px] 2xl:text-[40px]">
                                            Ready To Continue?
                                        </p>
                                        <div className="font-bold text-[#252b42] text-[14px] md:text-[16px] wrap-anyway flex flex-col sm:flex-row md:gap-2">
                                            <span className='font-bold'>Current Milestone:</span>
                                            <p className='text-ib-1'>{currentMilestone && currentMilestoneChild ? sidebarData.milestoneMenus[currentMilestone - 1][currentMilestoneChild - 1].title : Math.floor(progress?.summary.percent) === 100 ? "Completed" : "Start"}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative w-full h-3 bg-[#a55e57] rounded-full overflow-hidden mb-1">
                                            <Progress
                                                value={progress?.summary.percent}
                                                className="h-full bg-[#a55e57] [&>div]:bg-[#ff6f61]"
                                            />
                                        </div>
                                        <h5 className="text-center font-extrabold text-[#252b42]">
                                            {progress?.summary.percent ? Math.floor(progress?.summary.percent) : 0}% completed
                                        </h5>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 w-full">
                                        <div className="flex-1 h-px bg-gray-300" />
                                        <Button onClick={handleContinue} className="px-8 py-3 bg-[#ff6f61] hover:bg-[#ff6f61]/90 rounded-full cursor-pointer active:scale-95">
                                            <span className="text-white">
                                                {currentMilestone ?  "Continue Your Course" : Math.floor(progress?.summary.percent) === 100 ? "Continue Your Course" : "Start Your Course"}
                                            </span>
                                        </Button>
                                        <div className="flex-1 h-px bg-gray-300" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>}
                </div>
            </div>
        </section >
    );
};

export default HeroSection;