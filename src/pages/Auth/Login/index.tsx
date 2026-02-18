import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { loginData } from '../../../datas/authData';
import { validateLoginForm } from '../../../lib/validation';
import toast from 'react-hot-toast';

import {
    Button,
    Input,
    Label,
    Badge
} from '../../../elements';
import BlindEye from '../../../assets/image/blind-eye.svg';
import BlindEyeOpen from '../../../assets/image/blind-eye-open.svg';
import Image from '../../../assets/image/landing.jpg';
import ImageLogo from '../../../assets/image/logo-1.svg';
import IconLeftArrow from "../../../assets/image/left-arrow.svg";

function Login() {
    const navigate = useNavigate();
    const { loginWithEmailPassword } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email, password } = inputValues;

        const { isValid, errors } = validateLoginForm(email, password);
        if (!isValid) {
            setErrors(errors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            await loginWithEmailPassword(email, password);
            setInputValues({ email: "", password: "" });
            navigate('/')
        } catch (error: any) {
            toast.error(error.message);
            console.log("Login error:", error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputValues((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-3 hidden md:block md:flex-1">
                <img src={Image} alt="widget-trigger-button" className="h-full" />
            </div>
            <div className="bg-[#ffffff] rounded-[70px_0px_0px_60px] flex-4 md:flex-1">
                <div className="mx-auto flex justify-center items-center h-full max-w-[600px] px-4 py-10 sm:px-6 lg:px-10">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start my-4 w-full">
                            <Link to="/" className="flex gap-3 cursor-pointer hover:opacity-80">
                                <img src={IconLeftArrow} alt="" className="w-3" />
                                <span className="text-ib-2 text-[16px] font-bold">Go Home</span>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/">
                                <img
                                    className="relative w-[60px] h-[60px] animate-fade-in [animation-delay:100ms] opacity-0"
                                    alt="Vector"
                                    src={ImageLogo}
                                />
                            </Link>
                        </div>
                        <form className="p-6 text-center" onSubmit={handleSubmit}>
                            <h1 className="z-6 animate-fade-in [animation-delay:150ms] opacity-0 font-bold text-[32px] text-center text-ib-2">
                                Log In
                            </h1>
                            <div className="flex flex-col gap-6 text-center">
                                {
                                    loginData.formFields.map((field, index) => (
                                        <div
                                            key={index}
                                            className="w-full justify-between z-5 flex flex-col items-start relative opacity-0 animate-fade-in [animation-delay:150ms]"
                                        >
                                            <Label className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                                {field.label}
                                            </Label>
                                            <div className="relative w-full">
                                                <Input
                                                    id={field.id}
                                                    type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
                                                    placeholder={field.placeholder}
                                                    onChange={handleChange}
                                                    autoComplete={field.id}
                                                    className="border-0 border-b border-ib rounded-none px-0 h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                                                />
                                                {field.type === "password" && (
                                                    <>
                                                        <img src={BlindEye} onClick={() => { setShowPassword(!showPassword) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword ? "hidden" : "show"}`} />
                                                        <img src={BlindEyeOpen} onClick={() => { setShowPassword(!showPassword) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword ? "show" : "hidden"}`} />
                                                    </>
                                                )}
                                            </div>
                                            {errors[field.id] && <Badge className='text-red-600'>{errors[field.id]}</Badge>}
                                        </div>
                                    ))
                                }
                                <Button type="submit" className="h-auto items-center cursor-pointer text-white px-6 py-2 relative w-full z-3 opacity-0 bg-custom border-custom rounded-xl hover:bg-white border-2 hover:border-ib-1 hover:text-ib-1  transition-colors animate-fade-in [animation-delay:450ms]">
                                    <span className="font-bold text-xl tracking-[0] leading-[30px]">
                                        {
                                            loading ?
                                                <div className='flex flex-col sm:flex-row justify-center items-center gap-2'>
                                                    <svg className="spinner spinner-ib-1" viewBox="0 0 24 24"></svg>
                                                    Logging In...
                                                </div>
                                                : "Log In"
                                        }
                                    </span>
                                </Button>
                                <div className="flex flex-col items-center justify-center relative w-full z-2">
                                    <Link to="/forgot-password" className="relative w-fit z-2 font-semibold text-ib-1 text-xs text-center tracking-[0] leading-[42px] underline whitespace-nowrap hover:text-primary-ak/80 transition-colors opacity-0 animate-fade-in [animation-delay:550ms]">
                                        Forgot Password?
                                    </Link>
                                    <Link to="/register" className="relative w-fit z-1 font-semibold text-ib-1 text-xs text-center tracking-[0] leading-[42px] underline whitespace-nowrap hover:text-primary-ak/80 transition-colors opacity-0 animate-fade-in [animation-delay:650ms]" >
                                        Create Account
                                    </Link>
                                </div>
                                <div className="flex justify-center items-center w-full z-0">
                                    <Button variant="outline" className="flex cursor-pointer w-[194px] h-auto items-center justify-center p-[12.61px] relative z-0 bg-[#f4f7ff] rounded-[7.88px] border-0 hover:bg-[#f4f7ff]/80 transition-colors opacity-0 animate-fade-in [animation-delay:750ms]">
                                        <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
                                            <img
                                                className="relative w-[18.92px] h-[18.92px]"
                                                alt="Button"
                                                src="https://c.animaapp.com/mh9vug8iMfchkO/img/button.png"
                                            />
                                            <span className="relative flex items-center justify-center w-fit font-medium text-[#131212] text-sm text-center tracking-[0] leading-[normal]">
                                                Sign in with Google
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login