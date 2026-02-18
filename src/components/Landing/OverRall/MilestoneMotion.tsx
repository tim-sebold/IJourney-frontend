import React from 'react'
import { motion } from 'framer-motion'

export type Milestone = {
    id: number
    title: string
}

type Props = {
    current?: number
    completedIds?: number[]
    onSelect?: (id: number) => void
    imageSrc?: string // PNG for milestone #1 button
}

export const TITLES: Record<number, string> = {
    1: "Journeyer's Statement",
    2: "Oasis Explorations",
    3: "Unchartered Territory",
    4: "Resources Roadways",
    5: "Navigating Education",
    6: "Envisioning the Future",
    7: "Yielding Growth",
}

const COLORS: Record<number, string> = {
    1: "bg-green-500",
    2: "bg-sky-500",
    3: "bg-amber-500",
    4: "bg-pink-500",
    5: "bg-violet-600",
    6: "bg-indigo-700",
    7: "bg-orange-400",
}

const TEXT_COLORS: Record<number, string> = {
    1: "text-white",
    2: "text-white",
    3: "text-white",
    4: "text-white",
    5: "text-white",
    6: "text-white",
    7: "text-white",
}

function classNames(...cls: (string | false | null | undefined)[]) {
    return cls.filter(Boolean).join(" ")
}

export default function MilestoneStepper({
    current = 1,
    completedIds = [],
    onSelect,
    imageSrc,
}: Props) {
    return (
        <div className="w-full flex justify-center">
            <div className="relative flex flex-col sm:flex-row max-w-6xl sm:items-center justify-between gap-4 md:gap-4 px-8 sm:px-2 py-6 sm:gap-2">
                <div className="pointer-events-none absolute inset-y-4 sm:top-1/2 -z-10 w-0.5 sm:w-full sm:h-0.5 border-r-8 sm:border-t-4 md:border-t-8 border-dashed border-gray-300 block" />

                {Array.from({ length: 7 }).map((_, i) => {
                    const id = i + 1
                    const isCurrent = id === current
                    const isCompleted = completedIds.includes(id)

                    if (id === 1 && imageSrc) {
                        return (
                            <ImageMilestoneButton
                                key={id}
                                id={id}
                                title={TITLES[id]}
                                src={imageSrc}
                                isCurrent={isCurrent}
                                isCompleted={isCompleted}
                                onSelect={onSelect}
                            />
                        )
                    }

                    return (
                        <DiamondMilestoneButton
                            key={id}
                            id={id}
                            title={TITLES[id]}
                            colorClass={COLORS[id]}
                            textColorClass={TEXT_COLORS[id]}
                            isCurrent={isCurrent}
                            isCompleted={isCompleted}
                            onSelect={onSelect}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function ImageMilestoneButton({
    id,
    title,
    src,
    isCurrent,
    isCompleted,
    onSelect,
}: {
    id: number
    title: string
    src: string
    isCurrent: boolean
    isCompleted: boolean
    onSelect?: (id: number) => void
}) {
    return (
        <MilestoneButtonBase
            id={id}
            label={title}
            isCurrent={isCurrent}
            isCompleted={isCompleted}
            onSelect={onSelect}
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className={classNames(
                    "group relative isolate grid h-16 w-16 place-items-center overflow-hidden rounded-xl shadow-sm ring-2 cursor-pointer",
                    isCurrent ? "ring-black/70" : "ring-black/10",
                    isCompleted ? "opacity-90" : "opacity-100"
                )}
                aria-label={`${id}. ${title}`}
                onClick={() => onSelect?.(id)}
            >
                <img src={src} alt="Milestone 1" className="absolute inset-0 h-full w-full object-cover" />
                <span className="relative z-10 rounded-full bg-black/60 px-2 text-xs font-semibold text-white">
                    {id}
                </span>
            </motion.button>
        </MilestoneButtonBase>
    )
}

function DiamondMilestoneButton({
    id,
    title,
    colorClass,
    textColorClass,
    isCurrent,
    isCompleted,
    onSelect,
}: {
    id: number
    title: string
    colorClass: string
    textColorClass: string
    isCurrent: boolean
    isCompleted: boolean
    onSelect?: (id: number) => void
}) {
    return (
        <MilestoneButtonBase
            id={id}
            label={title}
            isCurrent={isCurrent}
            isCompleted={isCompleted}
            onSelect={onSelect}
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onSelect?.(id)}
                aria-label={`${id}. ${title}`}
                className="grid place-items-center cursor-pointer"
            >
                <div className="relative h-12 w-12 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16">
                    <div
                        className={classNames(
                            "absolute inset-0 origin-center rotate-25 skew-x-[-20deg] rounded-sm shadow-sm ring-1 ring-black/10",
                            colorClass,
                            isCurrent && "ring-2 ring-black/70",
                            isCompleted && "opacity-90"
                        )}
                    />
                    <div className="absolute inset-0 grid place-items-center">
                        <span className={classNames("text-md md:text-2xl font-bold", textColorClass)}>
                            {id}
                        </span>
                    </div>
                </div>
            </motion.button>
        </MilestoneButtonBase>
    )
}

function MilestoneButtonBase({
    id,
    label,
    isCurrent,
    isCompleted,
    onSelect,
    children,
}: {
    id: number
    label: string
    isCurrent: boolean
    isCompleted: boolean
    onSelect?: (id: number) => void
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row sm:flex-col sm:items-center gap-6 sm:gap-2 text-center">
            {children}
            <button
                type="button"
                onClick={() => onSelect?.(id)}
                className={classNames(
                    "cursor-pointer text-[12px] sm:text-sm md:text-md lg:text-[20px] font-medium leading-tight text-gray-700 hover:underline focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2",
                    isCurrent && "text-black",
                    isCompleted && "opacity-90"
                )}
            >
                {label}
            </button>
        </div>
    )
}

export function Demo({ imageSrc }: { imageSrc?: string }) {
    const [current, setCurrent] = React.useState(1)
    const completed = Array.from({ length: current }, (_, i) => i + 1)

    return (
        <div className="mx-auto max-w-6xl p-6">
            <MilestoneStepper
                current={current}
                completedIds={completed}
                onSelect={(id) => setCurrent(id)}
                imageSrc={imageSrc}
            />

            <div className="mt-6 text-sm text-gray-600">
                <p>
                    Selected: <span className="font-semibold">{current}. {TITLES[current]}</span>
                </p>
            </div>
        </div>
    )
}
