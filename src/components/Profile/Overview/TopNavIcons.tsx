import React from "react";
import {
    FileKey,
    ChartNoAxesGantt
} from "lucide-react";
import { Button } from "../../../elements";
import type { Navkey } from "../../../lib/types";

function IconPill({
    active,
    children,
    label,
    clickFunc
}: {
    active?: boolean;
    children: React.ReactNode;
    label: string;
    clickFunc: () => void
}) {
    return (
        <Button
            type="button"
            aria-label={label}
            title={label}
            className={[
                "h-10 w-14 grid place-items-center rounded-full transition hover:text-ib-3 hover:bg-white cursor-pointer",
                active ? "text-white border-white border-2" : "text-white",
            ].join(" ")}
            onClick={clickFunc}
        >
            {children}
        </Button>
    );
}

export function TopNavIcons({ active, welcomeName, setActive }: { active: Navkey, welcomeName: string, setActive: React.Dispatch<React.SetStateAction<Navkey>> }) {

    const onSelectTab = (label: string) => {
        setActive(label.toLowerCase() as Navkey);
    }

    return (
        <div className="flex items-center justify-between border-b border-black/5 bg-custom px-5 backdrop-blur sm:px-8">
            <h4 className="font-bold text-white py-8">Welcome &nbsp;&nbsp;<span className="font-bold text-ib-2">{welcomeName}</span></h4>
            <div className="flex items-start gap-2 h-full">
                <IconPill clickFunc={() => onSelectTab("Overview")} active={active === "overview"} label="Overview">
                    <ChartNoAxesGantt className="h-4 w-4" />
                </IconPill>
                <IconPill clickFunc={() => onSelectTab("Security")} active={active === "security"} label="Security">
                    <FileKey className="h-4 w-4" />
                </IconPill>
            </div>
        </div>
    );
}
