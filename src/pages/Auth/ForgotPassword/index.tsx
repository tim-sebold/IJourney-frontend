import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
    Button,
    Input,
    Label
} from '../../../elements';
import ImageLogo from '../../../assets/image/logo.svg';
import ImageAuth from '../../../assets/image/auth1.png';
import IconLeftArrow from '../../../assets/image/left-arrow.svg';
import { validateEmail } from '../../../lib/validation';
import { forgotPassword } from '../../../controllers/authController';

function ForgotPassword() {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationData = validateEmail(email);
        if (validationData) {
            toast.error(validationData);
            return;
        } else {
            try {
                const res: any = await forgotPassword(email);
                
                if (res?.link) {
                    console.log("Password reset link:", res.link);
                    window.open(res.link, '_blank');
                }

                toast.success("If this email exists, a reset link has been sent.");
            } catch (err: any) {
                toast.error(err.message || "Something went wrong.");
            }
        }
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-3 hidden md:block md:flex-1">
                <div className="flex flex-col px-6 py-10 gap-6">
                    <div className="flex justify-center">
                        <Link to="/">
                            <img src={ImageLogo} alt="Auth Logo" className="hover:opacity-80 cursor-pointer" />
                        </Link>
                    </div>
                    <span className="z-6 [--animation-delay:200ms] font-medium text-[20px] text-center text-white">
                        If you forgot your password, Don't worry about it at all. You can update your password to a new password that you wanted in here.
                    </span>
                    <div className="flex justify-center">
                        <img src={ImageAuth} alt="Auth Background Image" className="" />
                    </div>
                </div>
            </div>
            <div className="bg-[#ffffff] rounded-[70px_0px_0px_60px] flex-4 md:flex-1">
                <div className="mx-auto flex flex-col justify-center items-center h-full max-w-[600px] px-4 py-10 sm:px-6 lg:px-10">
                    <div className="flex justify-start my-4 w-full">
                        <Link to="/login" className="flex gap-3 cursor-pointer hover:opacity-80">
                            <img src={IconLeftArrow} alt="" className="w-3" />
                            <span className="text-ib-2 text-[16px] font-bold">Back</span>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        <form className="p-6 text-center flex flex-col gap-10" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-0 animate-fade-in [animation-delay:100ms] opacity-0 text-center text-ib-2">
                                <h1 className="uppercase z-6 font-bold text-[32px] text-center">
                                    Password Update
                                </h1>
                                <p className="text-[16px]">A password reset link will be sent to your e-mail address.</p>
                            </div>
                            <div className="flex flex-col gap-8 text-center">
                                <div className="w-full justify-between z-5 flex flex-col max-w-[800px] items-start relative opacity-0 animate-fade-in [animation-delay:200ms]">
                                    <Label className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                        E - Mail Address
                                    </Label>
                                    <div className="relative w-full">
                                        <Input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            className="border-0 border-b border-ib text-black rounded-none px-0 h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-ib"
                                        />

                                    </div>
                                </div>
                                <Button type='submit' className="h-auto items-center cursor-pointer text-white px-6 py-2 relative w-full z-3 opacity-0 bg-custom border-custom rounded-xl hover:bg-white border-2 hover:border-ib-1 hover:text-ib-1  transition-colors animate-fade-in [animation-delay:300ms]">
                                    <span className="w-fit -mt-px font-bold text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                                        Send
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword