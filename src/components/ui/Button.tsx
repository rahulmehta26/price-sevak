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
    primary: "bg-primary text-black",
    outline: "hover:bg-primary/10 bg-transparent",
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
            onClick={onClick}
            initial="initial"
            whileHover="hover"
            whileTap={{
                scale: [0.985, 1.025, 1],
                transition: {
                    duration: 0.6
                }
            }}
            className={cn(
                "px-3 md:px-4 py-2 md:py-3",
                "border rounded-sm",
                "shadow hover:shadow-sm ",
                "transition-all duration-200 ease-in-out",
                "cursor-pointer group",
                "flex justify-center items-center gap-1.5 md:gap-3",
                variants[variant],
                className
            )}
            {...props}
        >

            {LeftIcon && (
                <LeftIcon className={cn(
                    "w-4.5 h-4.5 md:w-6 md:h-6 ",
                    variant === "outline" ? "stroke-primary" : "text-background",
                    leftIconStyle
                )} />
            )}

            <span
                className={cn(
                    "text-sm md:text-base",
                    "font-mono font-bold tracking-normal text-shadow-xs ",
                    variant === "outline" ? "text-primary" : "text-background",
                    textStyle
                )}
            >
                {title}
            </span>

            {RightIcon && (
                <RightIcon className={cn(
                    "icon",
                    variant === "outline" ? "stroke-primary" : "text-background",
                    rightIconStyle)} />
            )}

        </motion.button>
    )
}

export default Button