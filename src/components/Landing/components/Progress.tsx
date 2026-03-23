import { useEffect, useMemo, useState } from "react";

type CircularProgressProps = {
    value: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
    duration?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CircularProgress = ({
    value,
    size = 340,
    strokeWidth = 8,
    label = "In progress please wait a moment...",
    duration = 1800,
}: CircularProgressProps) => {
    const targetValue = Math.max(0, Math.min(100, value));
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let frameId = 0;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const nextValue = targetValue * eased;

            setAnimatedValue(nextValue);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        setAnimatedValue(0);
        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [targetValue, duration]);

    const { center, radius, circumference, dashOffset } = useMemo(() => {
        const center = size / 2;
        const radius = (size - strokeWidth * 2) / 2;
        const circumference = 2 * Math.PI * radius;
        const dashOffset =
            circumference - (animatedValue / 100) * circumference;

        return {
            center,
            radius,
            circumference,
            dashOffset,
        };
    }, [size, strokeWidth, animatedValue]);

    return (
        <div className="relative flex items-center justify-center overflow-hidden">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="-rotate-90"
            >
                {/* dark track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#1f1f1f"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* animated green progress */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#8BFF00"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{
                        transition: "stroke-dashoffset 40ms linear",
                        filter: "drop-shadow(0 0 4px rgba(139,255,0,0.35))",
                    }}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center overflow-hidden">
                <div className="flex items-start justify-center leading-none">
                    <span className="text-[30px] sm:text-[4.5rem] mt-2 font-semibold tracking-tight">
                        {Math.round(animatedValue)}
                    </span>
                    <span className="ml-2 mt-2 text-[2rem] font-semibold">%</span>
                </div>

                <div className="mt-2 h-1 w-1 rounded-full bg-[#CFFF3D]" />

                <p className="mt-3 max-w-[230px] text-[1.05rem] font-medium leading-6">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default CircularProgress;