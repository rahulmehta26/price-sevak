import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { drawPath } from "../animations/hover";

const Home = ({ className }: { className?: string }) => {
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
            <motion.path variants={drawPath} d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <motion.path variants={drawPath} d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <motion.path variants={drawPath} d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
    );
};

export default Home;
