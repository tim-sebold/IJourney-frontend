import * as React from "react"

// Assuming you have a utility file for combining classes
import { cn } from "../lib/utils"

// Define the properties the Textarea component accepts
// It extends all properties of a standard HTML Textarea element
export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

// Define the Textarea component using React.forwardRef
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                // Apply the base styling defined by shadcn/ui
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    // Allow custom classes to be merged and override defaults
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

// Set the display name for better debugging
Textarea.displayName = "Textarea"

export { Textarea }