import { motion } from "motion/react"
import { useToast, type Toast } from "../../../store/useToast"
import { cn } from "../../../utils/cn";
import Text from "../Text";
import CloseButton from "../CloseButton";
import { useEffect, useRef, useState } from "react";

const typeStyle = {
    success: "border-green-500 bg-green-500/10 text-green-400",
    error: "border-red-500 bg-red-500/10 text-red-400",
    info: "border-blue-500 bg-blue-500/10 text-blue-400",

}

const DEFAULT_DURATION = 3000;

const ToastItems = ({ toast }: { toast: Toast }) => {

    const removeToast = useToast((s) => s.removeToast);

    const duration = toast?.duration ?? DEFAULT_DURATION;

    const handleRemoveToast = (id: string | undefined) => {
        if (id) removeToast(id)
    }

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const remainingRef = useRef<number>(duration);

    const [isPaused, setIsPaused] = useState<boolean>(false);

    const clearTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null
        }
    }

    const startTimer = () => {

        startTimeRef.current = Date.now();

        clearTimer();

        timeoutRef.current = setTimeout(() => {
            if (toast.id) removeToast(toast.id);

        }, remainingRef.current);

    }

    const pauseTimer = () => {
        if (isPaused) return;

        setIsPaused(true);
        clearTimer();

        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);

    }

    const resumeTimer = () => {
        if (!isPaused || remainingRef.current <= 0) return;

        setIsPaused(false);
        startTimer();
    }

    useEffect(() => {
        startTimer();

        return () => clearTimer();
    }, [])

    return (
        <motion.section
            layout
            drag
            dragMomentum={false}
            dragElastic={0.2}
            dragConstraints={{ top: -120, bottom: 120, left: -500, right: 200 }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            whileDrag={{ scale: 1.02, opacity: 0.9 }}
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
            onTouchStart={pauseTimer}
            onTouchEnd={resumeTimer}
            onDragStart={pauseTimer}
            className={cn(
                "px-4 py-3",
                "w-full md:max-w-sm lg:w-80",
                "border rounded-lg shadow-md backdrop-blur-md",
                "pointer-events-auto cursor-grab active:cursor-grabbing",
                typeStyle[toast.type]
            )}
        >

            <div
                className={cn(
                    "flex justify-between items-start gap-2"
                )}
            >
                <div>
                    <Text
                        as="p"
                        variant="para"
                        className={cn(
                            toast.type === "error" && "text-red-800",
                            toast.type === "success" && "text-green-800",
                            toast.type === "info" && "text-blue-800"

                        )}
                    >
                        {
                            toast?.title
                        }
                    </Text>

                    {
                        toast?.description && (
                            <Text
                                as="p"
                                variant="para"
                                className={cn(
                                    "text-sm mt-1",
                                    toast.type === "error" && "text-red-800",
                                    toast.type === "success" && "text-green-800",
                                    toast.type === "info" && "text-blue-800"
                                )}
                            >
                                {
                                    toast?.description
                                }
                            </Text>
                        )
                    }
                </div>

                <CloseButton
                    onClick={() => handleRemoveToast(toast?.id)}
                    className={cn("opacity-60 hover:opacity-100 transition-colors duration-300 top-1.5 right-2")}
                />

            </div>

        </motion.section>
    )
}

export default ToastItems