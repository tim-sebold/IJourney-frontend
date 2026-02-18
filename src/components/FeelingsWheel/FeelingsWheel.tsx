import { useState } from "react";
import { emotions } from "./data";
import { useSunburst, getNodeColor, getTextTransform } from "./useSunburst";
import { EmotionDetails } from "./EmotionDetails";
import type { FeelingsWheelProps } from "../../lib/types";
import { Button } from "../../elements";
import { ArrowRightFromLineIcon } from "lucide-react";

const SIZE = 620;
const RADIUS = SIZE / 2;

export function FeelingsWheel({
    selection,
    selectedEmotion,
    onSelectEmotion,
}: FeelingsWheelProps) {
    const { nodes, arc, centerRadius } = useSunburst(emotions, RADIUS);
    const [showModel, setShowModel] = useState<boolean>(false);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <svg width={SIZE} height={SIZE}>
                <g transform={`translate(${RADIUS}, ${RADIUS})`}>
                    {
                        nodes
                            .filter(d => d.depth > 0)
                            .map(d => (
                                <path
                                    key={d.data.id}
                                    d={arc(d) ?? undefined}
                                    fill={getNodeColor(d)}
                                    className="cursor-pointer hover:opacity-80 transition"
                                    onClick={() => {
                                        onSelectEmotion(d.data);
                                        setShowModel(true);
                                    }}
                                />
                            ))
                    }

                    {
                        nodes
                            .filter(d => d.depth > 0)
                            .map(d => (
                                <text
                                    key={`${d.data.id}-label`}
                                    transform={getTextTransform(d)}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className={`pointer-events-none fill-white font-semibold select-none ${d.data.emoji ? "text-4xl" : "text-[10px]"}`}
                                >
                                    {
                                        d.depth === 1 && d.data.emoji
                                            ? `${d.data.emoji}` : d.data.name
                                    }
                                </text>
                            ))
                    }

                    <g>
                        <circle r={centerRadius - 8} fill="#ffffff" />

                        <defs>
                            <path
                                id="centerTextPath"
                                d={`
                                M 0,0
                                m -${centerRadius - 24}, 0
                                a ${centerRadius - 24},${centerRadius - 24} 0 1,1 ${(centerRadius - 24) * 2},0
                                a ${centerRadius - 24},${centerRadius - 24} 0 1,1 -${(centerRadius - 24) * 2},0
                            `}
                            />
                        </defs>

                        <text
                            fill="#6b7280"
                            fontSize={20}
                            fontWeight={600}
                            letterSpacing={2.5}
                        >
                            <textPath
                                href="#centerTextPath"
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                HOW ARE YOU FEELING?
                            </textPath>
                        </text>

                        {selection && selectedEmotion?.emoji && (
                            <text
                                textAnchor="middle"
                                dominantBaseline="middle"
                                y={-6}
                                style={{ fontSize: 64 }}
                            >
                                {selectedEmotion?.emoji}
                            </text>
                        )}

                        {selection && (
                            <text
                                textAnchor="middle"
                                y={selectedEmotion?.emoji ? 36 : 12}
                                className="fill-red-500 font-bold text-sm"
                            >
                                {selectedEmotion?.name}
                            </text>
                        )}
                    </g>
                </g>
            </svg>

            <div className={`w-full fixed max-w-sm flex flex-col top-20 gap-4 z-1 transition-all ${!showModel ? "-right-100" : "md:right-10 right-2"}`}>
                <Button onClick={() => setShowModel(false)} title='close' className='absolute right-0 text-white cursor-pointer hover:text-gray-500'>
                    <ArrowRightFromLineIcon />
                </Button>
                <EmotionDetails emotion={selectedEmotion} />
            </div>
        </div>
    );
}
