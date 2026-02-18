import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { register } from '../../../controllers/authController';
import type { InputValues } from '../../../lib/types';
import { registerData } from '../../../datas/authData';
import { validateRegisterForm } from '../../../lib/validation';

import {
    Button,
    Input,
    Label,
    Badge
} from '../../../elements';
import BlindEye from "../../../assets/image/blind-eye.svg";
import BlindEyeOpen from "../../../assets/image/blind-eye-open.svg";
import ImageBrand from "../../../assets/image/landing.jpg";
import IconLeftArrow from "../../../assets/image/left-arrow.svg";

function Register() {
    const navigate = useNavigate();
    const { loginWithEmailPassword } = useAuth();
    const [showPassword, setShowPassword] = useState([false, false]);
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
            setInputValues({ name: "", email: "", password: "", confirmPassword: "" });

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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputValues((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-3 hidden md:block md:flex-1">
                <img src={ImageBrand} alt="widget-trigger-button" className="h-full min-w-[400px]" />
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
                        <form className="p-6 text-center" onSubmit={handleSubmit}>
                            <h1 className="uppercase z-6 animate-fade-in [animation-delay:0ms] opacity-0 font-bold text-[32px] text-center text-ib-2">
                                Sign Up
                            </h1>
                            <div className="flex flex-col gap-6 text-center">
                                {
                                    registerData.formFields.map((field, index) => (
                                        <div key={index} className="w-full justify-between z-5 flex flex-col max-w-[800px] items-start relative opacity-0 animate-fade-in [animation-delay:100ms]">
                                            <Label className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                                {field.label}
                                            </Label>
                                            <div className="relative w-full">
                                                <Input
                                                    id={field.id}
                                                    type={field.type === "password" ? (showPassword[index - 2] ? "text" : "password") : field.type}
                                                    placeholder={field.placeholder}
                                                    onChange={handleChange}
                                                    className="border-0 border-b text-black border-ib rounded-none px-0 h-auto pb-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-ib"
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
                                    ))
                                }
                                <Button type="submit" className="h-auto items-center cursor-pointer text-white px-6 py-2 relative w-full z-3 opacity-0 bg-custom border-custom rounded-xl hover:bg-white border-2 hover:border-ib-1 hover:text-ib-1  transition-colors animate-fade-in [animation-delay:500ms]">
                                    <span className="font-bold text-xl tracking-[0] leading-[30px]">
                                        {
                                            loading ?
                                                <div className='flex flex-col sm:flex-row justify-center items-center gap-2'>
                                                    <svg className="spinner spinner-ib-1" viewBox="0 0 24 24"></svg>
                                                    Creating Account...
                                                </div>
                                                : "Sign Up"
                                        }
                                    </span>
                                </Button>
                                <div className="flex flex-col items-center justify-center relative w-full z-2">
                                    <Link to="/login" className="relative w-fit z-2 font-semibold text-ib-1 text-xs text-center tracking-[0] leading-[42px] underline whitespace-nowrap hover:text-primary-ak/80 transition-colors opacity-0 animate-fade-in [animation-delay:700ms]">
                                        Log In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register