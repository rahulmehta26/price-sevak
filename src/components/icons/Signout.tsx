import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "motion/react";
import { drawPath } from "../animations/hover";

const Signout = ({ className }: { className: string }) => {
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
            <motion.path variants={drawPath} d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
            <motion.path variants={drawPath} d="M15 12h-12l3 -3" />
            <motion.path variants={drawPath} d="M6 15l-3 -3" />
        </motion.svg>
    );
};

export default Signout;
