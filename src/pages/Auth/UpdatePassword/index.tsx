import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import toast from "react-hot-toast";

import { Button } from "../../../elements/buttons/button";
import { Input } from "../../../elements/input";
import { Label } from "../../../elements/label";

import Logo from "../../../assets/image/logo.svg";
import Auth1 from "../../../assets/image/auth1.png";
import leftArrow from "../../../assets/image/left-arrow.svg";
import BlindEye from "../../../assets/image/blind-eye.svg";
import BlindEyeOpen from "../../../assets/image/blind-eye-open.svg";
import { auth } from "../../../firebaseConfig";
import { validateConfirmPassword, validatePassword } from "../../../lib/validation";

function UpdatePassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [showPassword, setShowPassword] = useState([false, false]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [codeStatus, setCodeStatus] = useState<"checking" | "valid" | "invalid">("checking");

    const oobCode = searchParams.get("oobCode");

    // Validate the reset code up front so an expired or hand-typed link says so
    // immediately, instead of after the user has filled in both password fields.
    useEffect(() => {
        let active = true;

        if (!oobCode) {
            setCodeStatus("invalid");
            return;
        }

        verifyPasswordResetCode(auth, oobCode)
            .then(() => { if (active) setCodeStatus("valid"); })
            .catch(() => { if (active) setCodeStatus("invalid"); });

        return () => { active = false; };
    }, [oobCode]);

    const sendPassword = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!oobCode || codeStatus === "invalid") {
            toast.error("This password-reset link is invalid or has expired. Request a new one.");
            return;
        }

        const passwordError = validatePassword(password);
        const confirmationError = validateConfirmPassword(password, confirmPassword);
        if (passwordError || confirmationError) {
            toast.error(passwordError || confirmationError);
            return;
        }

        setLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, password);
            toast.success("Your password has been updated.");
            navigate("/login", { replace: true });
        } catch (error: any) {
            toast.error(error?.code === "auth/expired-action-code"
                ? "This password-reset link has expired."
                : "Unable to update the password. Request a new reset link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <div className="flex justify-center items-center min-h-screen">
                <div className="max-w-7xl w-full p-10">
                    <section className="text-white bg-custom shadow-2xl font-ib-1 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-3 hidden md:block md:flex-1">
                                <div className="flex flex-col px-6 py-10 gap-6">
                                    <div className="flex justify-center">
                                        <img src={Logo} alt="Auth Logo" />
                                    </div>
                                    <span className="z-6 font-medium text-[20px] text-center text-white">
                                        If you forgot your password, Don't worry about it at all. You can update your password to a new password that you wanted in here.
                                    </span>
                                    <div className="flex justify-center">
                                        <img src={Auth1} alt="Auth Background Image" className="" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff] rounded-[70px_0px_0px_60px] flex-4 md:flex-1">
                                <div className="mx-auto flex flex-col justify-center items-center h-full max-w-[600px] px-4 py-10 sm:px-6 lg:px-10">
                                    <div className="flex justify-start my-4 w-full">
                                        <Link to="/login" className="flex gap-3 cursor-pointer hover:opacity-80">
                                            <img src={leftArrow} alt="" className="w-3" />
                                            <span className="text-ib-2 text-[16px] font-bold">Back</span>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center items-center w-full h-full">
                                        <form className="p-6 text-center flex flex-col gap-10" onSubmit={sendPassword}>
                                            <div className="flex flex-col gap-0 text-center text-ib-2 animate-fade-in [animation-delay:0ms] opacity-0">
                                                <h1 className="z-6 font-bold text-[32px] text-center">
                                                    Update Password
                                                </h1>
                                                <p className="text-[16px]">Your password must contain at least one lowercase letter and one uppercase letter.</p>
                                                {codeStatus === "invalid" && (
                                                    <p className="mt-3 text-[14px] font-bold text-red-600">
                                                        This password-reset link is invalid or has expired.{" "}
                                                        <Link to="/forgot-password" className="underline">Request a new one</Link>.
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-8 text-center">
                                                <div className="w-full justify-between z-4 flex flex-col max-w-[800px] items-start relative opacity-0 animate-fade-in [animation-delay:100ms]">
                                                    <Label className="font-ib-2 relative w-fit -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                                        Your New Password
                                                    </Label>
                                                    <div className="relative w-full">
                                                        <Input
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            type={showPassword[0] ? "text" : "password"}
                                                            className="border-0 border-b border-ib rounded-none px-0 h-auto pb-2 w-full"
                                                        />
                                                        <img src={BlindEye} onClick={() => { setShowPassword([!showPassword[0], showPassword[1]]) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[0] ? "hidden" : "show"}`} />
                                                        <img src={BlindEyeOpen} onClick={() => { setShowPassword([!showPassword[0], showPassword[1]]) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[0] ? "show" : "hidden"}`} />
                                                    </div>
                                                </div>
                                                <div className="w-full justify-between z-4 flex flex-col max-w-[800px] items-start relative opacity-0 animate-fade-in [animation-delay:200ms]">
                                                    <Label className="font-ib-2 relative w-fit -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap">
                                                        Your New Password Again
                                                    </Label>
                                                    <div className="relative w-full">
                                                        <Input
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            type={showPassword[1] ? "text" : "password"}
                                                            className="border-0 border-b border-ib rounded-none px-0 h-auto pb-2 w-full"
                                                        />
                                                        <img src={BlindEye} onClick={() => { setShowPassword([showPassword[0], !showPassword[1]]) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[1] ? "hidden" : "show"}`} />
                                                        <img src={BlindEyeOpen} onClick={() => { setShowPassword([showPassword[0], !showPassword[1]]) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[1] ? "show" : "hidden"}`} />
                                                    </div>
                                                </div>
                                                <Button type="submit" loading={loading} disabled={codeStatus !== "valid" || loading} className="h-auto items-center cursor-pointer text-white px-6 py-2 relative w-full z-3 opacity-0 bg-custom border-custom rounded-xl hover:bg-white border-2 hover:border-ib-1 hover:text-ib-1 disabled:opacity-60 disabled:cursor-not-allowed transition-colors animate-fade-in [animation-delay:300ms]">
                                                    <span className="font-bold text-xl tracking-[0] leading-[30px]">
                                                        {loading ? "Updating..." : codeStatus === "checking" ? "Checking link..." : "Confirm"}
                                                    </span>
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default UpdatePassword
