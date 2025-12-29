import React, { type ReactNode } from 'react'
import { cn } from '../../utils/cn';

interface TextProps {
    children: ReactNode;
    className?: string;
    variant?: keyof typeof variants;
    as?: TextElement;
}

const variants = {
    heading: " text-2xl text-primary font-bold font-heading ",
    subHeading: "text-xl text-primary font-heading",
    body: "text-primary/60",
    para: "text-sm text-primary/40",
    tags: "text-sm text-primary",
    base: ""
}

type TextElement = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Text: React.FC<TextProps> = ({ children, className, variant = "base", as: TextComponent = "span" }) => {
    return (
        <TextComponent
            className={cn(
                "text-base text-shadow-xs font-body font-normal",
                className,
                variants[variant]
            )}
        >
            {children}
        </TextComponent>
    )
}

export default Text