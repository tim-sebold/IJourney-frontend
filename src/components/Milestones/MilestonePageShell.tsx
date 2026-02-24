import React from "react";
import { CustomButton } from "../../elements";

type Props = {
    title: string;          
    subtitle?: string;     
    children: React.ReactNode;

    onPrevious: () => void;
    onNext: () => void;

    nextDisabled?: boolean;
    previousLabel?: string;
    nextLabel?: string;

    
    isNextLoading?: boolean;
};

export function MilestonePageShell({
    title,
    subtitle,
    children,
    onPrevious,
    onNext,
    nextDisabled,
    previousLabel = "previous",
    nextLabel = "next",
    isNextLoading,
}: Props) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">{title}</h3>
                {subtitle ? <h6>{subtitle}</h6> : null}
            </div>

            <div className="flex flex-col gap-6">{children}</div>

            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton
                    onClickFunc={onPrevious}
                    title={previousLabel}
                    className="rounded-none justify-end"
                    type="move"
                    disabled={!onPrevious}
                />

                <CustomButton
                    onClickFunc={onNext}
                    title={isNextLoading ? "loading..." : nextLabel}
                    className="rounded-none justify-end"
                    type="move"
                    disabled={!onNext || !!nextDisabled || !!isNextLoading}
                />
            </div>
        </div>
    );
}
