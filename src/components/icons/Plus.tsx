import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { drawPath } from "../animations/hover";

const Plus = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("icon", className)}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path variants={drawPath} d="M12 5l0 14" />
            <motion.path variants={drawPath} d="M5 12l14 0" />
        </svg>
    );
};

export default Plus;
