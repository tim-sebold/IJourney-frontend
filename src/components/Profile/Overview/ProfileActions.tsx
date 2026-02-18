import { Pencil, Save, X } from "lucide-react";
import { Button } from "../../../elements";

type Mode = "view" | "edit";

export function ProfileActions({
    mode,
    dirty,
    saving,
    onEdit,
    onCancel,
    onSave,
}: {
    mode: Mode;
    dirty: boolean;
    saving: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => Promise<void>;
}) {
    if (mode === "view") {
        return (
            <Button
                type="button"
                onClick={onEdit}
                className="rounded-xl bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:bg-sky-800"
            >
                <Pencil className="h-4 w-4" />
                Edit
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-black/10 bg-white text-zinc-800 hover:bg-zinc-50"
            >
                <X className="h-4 w-4" />
                Cancel
            </Button>

            <Button
                type="button"
                disabled={!dirty || saving}
                onClick={onSave}
                className={[
                    "rounded-xl text-white shadow-sm",
                    !dirty || saving
                        ? "bg-zinc-300 cursor-not-allowed"
                        : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800",
                ].join(" ")}
            >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save"}
            </Button>
        </div>
    );
}
