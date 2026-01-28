import { motion, type Variants } from "motion/react"
import { cn } from "../../utils/cn";

const bellBody: Variants = {
    initial: { rotate: 0 },
    hover: {
        rotate: [0, -8, 8, -6, 6, 0],
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
}

const bellClapper: Variants = {
    initial: { x: 0, rotate: 0 },
    hover: {
        x: [0, 4, -4, 3, -3, 0],
        rotate: [0, 12, -12, 8, -8, 0],
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            delay: 0.05,
        },
    },
}

const Bell = ({ className }: { className?: string }) => {
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
            <motion.path
                fill="currentColor"
                variants={bellBody}
                style={{ transformOrigin: "50% 0%" }}
                d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <motion.path
                variants={bellClapper}
                style={{ transformOrigin: "50% 50%" }}
                d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </motion.svg>
    );
};

export default Bell;
