import React from 'react'
import { motion, type HTMLMotionProps } from "motion/react"
import { cn } from '../../utils/cn';

interface ButtonProps extends HTMLMotionProps<"button"> {

    title: string;
    variant?: "primary" | "outline";
    leftIcon?: React.ElementType;
    rightIcon?: React.ElementType;
    leftIconStyle?: string;
    rightIconStyle?: string;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
    textStyle?: string;
}

const variants = {
    primary: "bg-primary text-black text-shadow-xs font-semibold tracking-wider font-oswald rounded-full",
    outline: "border-2 border-primary text-shadow-xs font-semibold tracking-wider font-oswald rounded-full bg-transparent text-primary",
};

const Button: React.FC<ButtonProps> = ({
    title,
    variant = "primary",
    className,
    onClick,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    leftIconStyle,
    rightIconStyle,
    type = "button",
    textStyle,
    ...props
}) => {

    return (
        <motion.button
            initial="initial"
            whileHover="hover"
            whileTap={{
                scale: [0.985, 1.025, 1],
                transition: {
                    duration: 0.6
                }
            }}
            className={cn(
                "px-6 py-3",
                "cursor-pointer group",
                "flex justify-center items-center gap-3",
                variants[variant],
                className
            )}
            {...props}
        >

            {LeftIcon && (
                <LeftIcon className={cn("icon", leftIconStyle)} />
            )}

            <span
                className={cn(
                    "text-base",
                    textStyle
                )}
            >
                {title}
            </span>

            {RightIcon && (
                <RightIcon className={cn("icon", rightIconStyle)} />
            )}

        </motion.button>
    )
}

export default Button