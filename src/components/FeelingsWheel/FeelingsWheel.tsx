import { useState } from "react";
import { emotions } from "./data";
import { useSunburst, getNodeColor, getTextTransform } from "./useSunburst";
import { EmotionDetails } from "./EmotionDetails";
import type { FeelingsWheelProps } from "../../lib/types";
import { Button } from "../../elements";
import { ArrowRightFromLineIcon, X } from "lucide-react";

const VIEWBOX_SIZE = 620;
const RADIUS = VIEWBOX_SIZE / 2;

export const FeelingsWheel = ({
    selection,
    selectedEmotion,
    onSelectEmotion,
}: FeelingsWheelProps) => {
    const { nodes, arc, centerRadius } = useSunburst(emotions, RADIUS);
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
                {/* Wheel wrapper */}
                <div className="w-full max-w-[620px] px-3 sm:px-4">
                    <div className="mx-auto aspect-square w-full">
                        <svg
                            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
                            className="h-full w-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g transform={`translate(${RADIUS}, ${RADIUS})`}>
                                {nodes
                                    .filter((d) => d.depth > 0)
                                    .map((d) => (
                                        <path
                                            key={d.data.id}
                                            d={arc(d) ?? undefined}
                                            fill={getNodeColor(d)}
                                            className="cursor-pointer transition hover:opacity-80"
                                            onClick={() => {
                                                onSelectEmotion(d.data);
                                                setShowModal(true);
                                            }}
                                        />
                                    ))}

                                {nodes
                                    .filter((d) => d.depth > 0)
                                    .map((d) => (
                                        <text
                                            key={`${d.data.id}-label`}
                                            transform={getTextTransform(d)}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="pointer-events-none select-none fill-white font-semibold"
                                            style={{
                                                fontSize: d.data.emoji ? 28 : 10,
                                            }}
                                        >
                                            {d.depth === 1 && d.data.emoji ? d.data.emoji : d.data.name}
                                        </text>
                                    ))}

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
                                        fontSize={18}
                                        fontWeight={600}
                                        letterSpacing={2}
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
                                            style={{ fontSize: 56 }}
                                        >
                                            {selectedEmotion.emoji}
                                        </text>
                                    )}

                                    {selection && (
                                        <text
                                            textAnchor="middle"
                                            y={selectedEmotion?.emoji ? 36 : 12}
                                            className="fill-red-500 font-bold"
                                            style={{ fontSize: 14 }}
                                        >
                                            {selectedEmotion?.name}
                                        </text>
                                    )}
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Desktop side card */}
                <div className="hidden w-full max-w-sm lg:block">
                    <EmotionDetails emotion={selectedEmotion} />
                </div>
            </div>

            {/* Mobile / tablet slide-up panel */}
            <div
                className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${showModal ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setShowModal(false)}
            >
                <div
                    className={`absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl transition-transform duration-300 ${showModal ? "translate-y-0" : "translate-y-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-800">Emotion Details</h3>
                        <Button
                            onClick={() => setShowModal(false)}
                            title="close"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <X size={18} />
                        </Button>
                    </div>

                    <EmotionDetails emotion={selectedEmotion} />
                </div>
            </div>

            {/* Desktop floating close button if you still want modal behavior there */}
            <div
                className={`fixed top-20 z-40 hidden w-full max-w-sm transition-all lg:block ${showModal ? "right-6 opacity-100" : "-right-[420px] opacity-0"
                    }`}
            >
                <div className="relative">
                    <Button
                        onClick={() => setShowModal(false)}
                        title="close"
                        className="absolute right-2 top-2 z-10 text-white hover:text-gray-300"
                    >
                        <ArrowRightFromLineIcon />
                    </Button>
                    <EmotionDetails emotion={selectedEmotion} />
                </div>
            </div>
        </>
    );
}