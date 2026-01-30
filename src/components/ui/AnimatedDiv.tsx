import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/fadeUp";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
}

const AnimatedDiv = ({
    children,
    delay = 0,
    className,
}: Props) => {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={delay}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedDiv;
