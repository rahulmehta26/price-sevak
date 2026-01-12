import { AnimatePresence } from "motion/react";
import { useToast } from "../../../store/useToast"
import ToastItems from "./ToastItems";
import { cn } from "../../../utils/cn";

const ToastContainer = () => {

    const toasts = useToast((s) => s.toasts);
    return (
        <div
            className={cn(
                "fixed z-50",
                "top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]",
                "md:top-6 md:right-6 md:left-auto md:translate-x-0 md:w-auto",
                "flex flex-col gap-3 pointer-events-none"
            )}
        >
            <AnimatePresence>
                {
                    toasts?.map((toast) => (
                        <ToastItems key={toast?.id} toast={toast} />
                    ))
                }
            </AnimatePresence>
        </div>
    )
}

export default ToastContainer