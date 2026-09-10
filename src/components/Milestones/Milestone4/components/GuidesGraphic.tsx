/**
 * The "A Team" guides diagram.
 *
 * This replaces an AI-generated raster image whose baked-in text was garbled
 * and partly non-English ("Nioe Ui Design", "Nichona"). Drawing it as SVG keeps
 * every label real English, readable at any size, and editable in code.
 */

const GUIDES = [
    { label: 'Mentor', angle: 198 },
    { label: 'Teacher', angle: 270 },
    { label: 'Peer', angle: 342 },
    { label: 'Expert', angle: 54 },
    { label: 'A-Team', angle: 126 },
] as const;

const CENTER = { x: 260, y: 220 };
const ORBIT = 140;

const pointAt = (angle: number, radius: number) => ({
    x: CENTER.x + radius * Math.cos((angle * Math.PI) / 180),
    y: CENTER.y + radius * Math.sin((angle * Math.PI) / 180),
});

export function GuidesGraphic() {
    return (
        <svg
            viewBox="0 0 520 440"
            role="img"
            aria-label="You at the centre, surrounded by your guides: Mentor, Teacher, Peer, Expert and A-Team."
            className="w-full max-w-xl"
        >
            <defs>
                <radialGradient id="guides-core" cx="50%" cy="45%" r="60%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </radialGradient>
            </defs>

            <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={ORBIT}
                fill="none"
                stroke="#c7d2fe"
                strokeWidth="2"
                strokeDasharray="6 8"
            />

            {GUIDES.map(({ label, angle }) => {
                const spoke = pointAt(angle, ORBIT);
                return (
                    <line
                        key={`spoke-${label}`}
                        x1={CENTER.x}
                        y1={CENTER.y}
                        x2={spoke.x}
                        y2={spoke.y}
                        stroke="#c7d2fe"
                        strokeWidth="2"
                    />
                );
            })}

            <circle cx={CENTER.x} cy={CENTER.y} r="62" fill="url(#guides-core)" />
            <text
                x={CENTER.x}
                y={CENTER.y - 4}
                textAnchor="middle"
                className="fill-amber-900"
                fontSize="24"
                fontWeight="700"
            >
                YOU
            </text>
            <text
                x={CENTER.x}
                y={CENTER.y + 20}
                textAnchor="middle"
                className="fill-amber-800"
                fontSize="13"
            >
                the Journeyer
            </text>

            {GUIDES.map(({ label, angle }) => {
                const node = pointAt(angle, ORBIT);
                return (
                    <g key={label}>
                        <circle cx={node.x} cy={node.y} r="42" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />
                        <text
                            x={node.x}
                            y={node.y + 5}
                            textAnchor="middle"
                            className="fill-indigo-700"
                            fontSize="15"
                            fontWeight="600"
                        >
                            {label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export default GuidesGraphic;
