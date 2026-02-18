import type { EmotionNode } from "../../lib/types";

interface Props {
    emotion: EmotionNode | null;
}

export function EmotionDetails({ emotion }: Props) {
    if (!emotion) {
        return (
            <div className="text-gray-400 italic">
                Click an emotion to see details
            </div>
        );
    }

    return (
        <div
            className="p-4 rounded-xl text-white shadow-lg transition-all"
            style={{ backgroundColor: emotion.color }}
        >
            <h2 className="text-2xl font-bold">{emotion.emoji}{emotion.name}</h2>
            {emotion.description && (
                <p className="mt-2 text-sm opacity-90">
                    {emotion.description}
                </p>
            )}
        </div>
    );
}
