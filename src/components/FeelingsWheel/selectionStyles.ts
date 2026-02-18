import clsx from "clsx";
import type { EmotionNode } from "../../lib/types";

export function getSliceClassName(
    nodeId: string,
    selectedEmotion: EmotionNode | null
) {
    const isSelected = selectedEmotion?.id === nodeId;

    return clsx(
        "cursor-pointer transition-all duration-200 ease-out",
        selectedEmotion
            ? isSelected
                ? "opacity-100 stroke-black stroke-2"
                : "opacity-25"
            : "hover:opacity-85"
    );
}
