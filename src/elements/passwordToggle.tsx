import BlindEye from "../assets/image/blind-eye.svg";
import BlindEyeOpen from "../assets/image/blind-eye-open.svg";

/**
 * The show/hide control inside a password field. A real button, so it can be
 * reached with Tab and announces what it does — the previous pair of clickable
 * images could be used with a mouse only.
 */
export function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-2.5 top-[calc(50%-12px)] cursor-pointer"
        >
            <img src={visible ? BlindEyeOpen : BlindEye} alt="" className="h-5 w-5" />
        </button>
    );
}
