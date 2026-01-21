import { motion, type Variants } from "motion/react";
import { cn } from "../../utils/cn";

const rightArrow: Variants = {
    initial: {
        x: 0,

    },
    hover: {
        x: 4,
        transition: {
            duration: 0.35,
            ease: "easeInOut",
        }
    }
}

const RightArrow = ({ className }: { className?: string }) => {
    return (
        <motion.svg
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
            <motion.path variants={rightArrow} d="M5 12l14 0" />
            <motion.path variants={rightArrow} d="M15 16l4 -4" />
            <motion.path variants={rightArrow} d="M15 8l4 4" />
        </motion.svg>
    );
};

export default RightArrow;
