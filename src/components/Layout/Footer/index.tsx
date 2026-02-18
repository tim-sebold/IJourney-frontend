import { Button } from "../../../elements/buttons/button";
import { Input } from "../../../elements/input";
import { Separator } from "../../../elements/separator";
import { Label } from "../../../elements";
import { Textarea } from "../../../elements";
import { useNavigate } from "react-router-dom";

import LandingLogo from "../../../assets/image/landing-logo.png";

import { footerData } from "../../../datas/layoutData";

function Footer() {
    const navigate = useNavigate();

    const handleFeatures = (feature: any) => {
        const element = document.getElementById(feature.href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const handleLinks = (item: any) => {
        if (!item?.hasDropdown) {
            if (item.label === "Home") {
                window.location.replace("/");
            } else {
                if (item.href.includes("/")) {
                    navigate(item.href);
                } else {
                    navigate("/");

                    setTimeout(() => document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" }), 400);
                }
            }
        }
    }

    return (
        <footer className="flex flex-col items-center justify-center py-10 bg-[#16697A] text-white">
            <div className="flex flex-col items-start w-full gap-15 container px-10 pt-10">
                <div className="flex flex-col w-full justify-between gap-10">
                    <img
                        className="relative w-40 h-[33px] cursor-pointer hover:opacity-90"
                        alt="Full logo white"
                        src={LandingLogo}
                    />
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-x-20 xl:gap-x-40">
                        <div className="flex flex-col items-start gap-15 flex-1 w-full">
                            <div className="flex flex-col items-start gap-10 w-full">
                                <div className="inline-flex flex-col gap-5 w-full">
                                    <div className="flex items-start justify-start gap-4 w-full flex-col lg:flex-row">
                                        <div className="flex-1 w-full">
                                            <Label className="">FullName</Label>
                                            <Input
                                                defaultValue=""
                                                type="text"
                                                placeholder="FullName"
                                                className="border mt-1 border-solid shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto border-white flex items-center gap-3 px-2 py-4"
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label>E-Mail</Label>
                                            <Input
                                                defaultValue=""
                                                type="email"
                                                placeholder="E-Mail"
                                                className="border mt-1 border-solid shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto border-white flex items-center gap-3 px-2 py-4"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full">
                                        <Label>Subject</Label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            placeholder="Subject"
                                            className="border mt-1 border-solid shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto border-white flex items-center gap-3 px-2 py-4"
                                        />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <Label>Message</Label>
                                        <Textarea
                                            defaultValue=""
                                            rows={5}
                                            placeholder="Type Message"
                                            className="border mt-1 border-solid shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto border-white flex items-center gap-3 px-2 py-4"
                                        />
                                    </div>
                                    <Button className="flex mt-2 cursor-pointer gap-3 px-6 py-4 bg-[#ff6f61] items-center justify-center relative h-auto rounded-[100px] hover:bg-[#ff6f61]/90 transition-colors">
                                        <span className="relative flex items-center justify-center font-subheading-as-typed-s7">
                                            Send
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex  items-start gap-10 flex-1 flex-col w-full">
                            <nav className="flex flex-col items-start w-full gap-10 sm:flex-row">
                                <div className="flex-col sm:items-start flex-1 gap-5 flex">
                                    <h3 className="self-stretch font-ib-3 font-medium text-white text-2xl tracking-[0] leading-[normal]">
                                        Quick&nbsp;Links
                                    </h3>
                                    <ul className="flex flex-col items-start gap-2 w-full">
                                        {footerData.quickLinks.map((link, index) => (
                                            <li key={index} className="w-full cursor-pointer" onClick={() => handleLinks(link)}>
                                                <p
                                                    className="self-stretch text-white text-sm leading-6 font-ib-3 font-medium tracking-[0] hover:text-[#5c5c5c] transition-colors"
                                                >
                                                    {link.label}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-col items-start gap-5 flex-1 flex">
                                    <h3 className="self-stretch font-ib-3 font-medium text-white text-2xl tracking-[0] leading-[normal]">
                                        Features
                                    </h3>
                                    <ul className="flex flex-col items-start gap-2 w-full">
                                        {footerData.features.map((feature, index) => (
                                            <li key={index} onClick={() => handleFeatures(feature)} className="w-full cursor-pointer">
                                                <p
                                                    className="self-stretch text-white text-sm leading-6 font-ib-3 font-medium tracking-[0] hover:text-[#5c5c5c] transition-colors"
                                                >
                                                    {feature.label}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <div className="flex flex-col items-start gap-5 flex-1">
                                <h3 className="self-stretch font-ib-3 text-white text-2xl tracking-[0] font-medium leading-[normal]">
                                    Legal
                                </h3>
                                <ul className="flex flex-col items-start gap-2 w-full">
                                    {footerData.legal.map((item, index) => (
                                        <li key={index} className="w-full">
                                            <a
                                                href={item.href}
                                                className="self-stretch text-white text-sm leading-6 font-ib-3 font-medium tracking-[0] hover:text-[#5c5c5c] transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                            </nav>
                            <div className="flex flex-col items-start gap-3.5 w-full">
                                <h3 className="self-stretch font-ib-3 text-white text-2xl tracking-[0] font-medium leading-[normal]">
                                    Location
                                </h3>
                                <div className="flex items-start gap-6 w-full">
                                    <div className="inline-flex flex-col items-start gap-2.5">
                                        <p className="flex items-center self-stretch font-subheading-as-typed-s8 text-primaryp-600 [font-style:var(--subheading-as-typed-s8-font-style)]">
                                            UNITED STATE
                                        </p>
                                        <p className="flex items-center justify-center font-body-b5 [font-style:var(--body-b5-font-style)] text-[#E8E8E8]">
                                            3104 Grandview Drive
                                            Suite B
                                            Simpsonville, SC 29680
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 w-full">
                                {footerData.socialIcons.map((icon, index) => (
                                    <button
                                        key={index}
                                        className="inline-flex items-start gap-3 rounded-[10px] hover:bg-[#3498db]/10 transition-colors"
                                        aria-label={icon.alt}
                                    >
                                        {icon.isNested ? (
                                            <div className="relative w-[30px] h-[30px]">
                                                <img
                                                    className="absolute top-1 left-1 w-[22px] h-[22px] text-white"
                                                    alt={icon.alt}
                                                    src={icon.src}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                className="w-[30px] h-[30px] text-white"
                                                alt={icon.alt}
                                                src={icon.src}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="w-full h-px bg-[#E8E8E8]" />
                <div className="">
                    <p>2025 Wonderful digital website - A Path To Purpose</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;