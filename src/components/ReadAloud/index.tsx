import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';

type Props = {
    /** Everything this control should read, in reading order. */
    text: string;
    /** Shown next to the speaker icon, e.g. "Kayla's story". */
    label?: string;
    className?: string;
};

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;

/**
 * Reads a passage out loud with the browser's own speech synthesis, so long
 * stories are available to students who would rather listen than read. No audio
 * file or recording is involved: the voice is the one already installed on the
 * device, which is why this works offline and needs nothing hosted.
 */
function ReadAloud({ text, label = 'this page', className = '' }: Props) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // A cancel on unmount stops the voice from following the student to the next
    // page — speechSynthesis lives on the window, not on this component.
    useEffect(() => () => synth?.cancel(), []);

    const stop = useCallback(() => {
        synth?.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    }, []);

    const speak = useCallback(() => {
        if (!synth) return;

        synth.cancel();

        // Long passages are split into sentence-sized chunks: several browsers
        // cut a single utterance off after roughly fifteen seconds.
        const chunks = text
            .replace(/\s+/g, ' ')
            .trim()
            .match(/[^.!?]+[.!?]*\s*/g) ?? [text];

        chunks.forEach((chunk, index) => {
            const utterance = new SpeechSynthesisUtterance(chunk);
            utterance.rate = 0.95;
            utterance.lang = 'en-US';
            if (index === chunks.length - 1) {
                utterance.onend = () => {
                    setIsSpeaking(false);
                    setIsPaused(false);
                };
            }
            utterance.onerror = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };
            utteranceRef.current = utterance;
            synth.speak(utterance);
        });

        setIsSpeaking(true);
        setIsPaused(false);
    }, [text]);

    const togglePause = useCallback(() => {
        if (!synth) return;
        if (isPaused) {
            synth.resume();
            setIsPaused(false);
        } else {
            synth.pause();
            setIsPaused(true);
        }
    }, [isPaused]);

    // Browsers without speech synthesis (and server rendering) get nothing rather
    // than a button that does nothing.
    if (!synth) return null;

    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            {!isSpeaking ? (
                <button
                    type="button"
                    onClick={speak}
                    className="flex items-center gap-2 rounded-full border border-ib-1 px-4 py-2 font-bold text-ib-2 cursor-pointer hover:bg-ib-1 hover:text-white transition-colors"
                >
                    <Volume2 size={18} />
                    Listen to {label}
                </button>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={togglePause}
                        className="flex items-center gap-2 rounded-full border border-ib-1 px-4 py-2 font-bold text-ib-2 cursor-pointer hover:bg-ib-1 hover:text-white transition-colors"
                    >
                        {isPaused ? <Play size={18} /> : <Pause size={18} />}
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        type="button"
                        onClick={stop}
                        className="flex items-center gap-2 rounded-full border border-ib px-4 py-2 font-bold text-ib-5 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                        <Square size={16} />
                        Stop
                    </button>
                </>
            )}
        </div>
    );
}

export default ReadAloud;
