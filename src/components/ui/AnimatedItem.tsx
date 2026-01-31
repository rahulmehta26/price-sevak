import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/fadeUp";

interface Props {
    children: ReactNode;
    className?: string;
    as?: "div" | "section" | "span";
}

const AnimatedItem = ({ children, className, as = "div", }: Props) => {

    const MotionTag = motion[as];

    return (
        <MotionTag
            variants={fadeUp}
            className={className}
            initial="hidden"
            viewport={{ once: true, amount: 0.25 }}
            whileInView="visible"
            exit="exit"
        >
            {children}
        </MotionTag>
    );
};

export default AnimatedItem;
