import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../utils/cn";

interface ToggleProps {
    isOn?: boolean;
    defaultOn?: boolean;
    onChange?: (isOn: boolean) => void;
    disabled?: boolean;
}


const Toggle = ({
    isOn,
    defaultOn = false,
    onChange,
    disabled = false,
}: ToggleProps) => {


    const prefersReducedMotion = useReducedMotion();
    const isControlled = typeof isOn === "boolean";
    const [internalIsOn, setInternalIsOn] = useState(defaultOn);

    useEffect(() => {
        if (isControlled) setInternalIsOn(isOn!);
    }, [isOn, isControlled]);

    const state = isControlled ? isOn! : internalIsOn;

    const toggle = useCallback(() => {
        if (disabled) return;
        const next = !state;
        if (!isControlled) setInternalIsOn(next);
        onChange?.(next);
    }, [state, disabled, isControlled, onChange]);

    return (
        <motion.button
            type="button"
            disabled={disabled}
            onClick={toggle}
            className={cn(
                "relative h-6 w-12 md:h-8 md:w-16 rounded-full p-1.5",
                "inline-flex items-center",
                state ? "justify-end bg-success" : "justify-start bg-foreground/10"
            )}
        >
            <motion.span
                layout
                transition={
                    prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 28 }
                }
                className={cn(
                    "h-4 w-4 md:h-6 md:w-6",
                    "rounded-full bg-foreground shadow-md"
                )}
            />
        </motion.button>
    );
};

export default Toggle;
