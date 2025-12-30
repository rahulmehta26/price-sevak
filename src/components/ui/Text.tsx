import React, { type ReactNode } from 'react'
import { cn } from '../../utils/cn';

interface TextProps {
    children: ReactNode;
    className?: string;
    variant?: keyof typeof variants;
    as?: TextElement;
}

const variants = {
    heading: "text-2xl font-bold text-primary",
    subHeading: "text-xl text-primary",
    body: "text-secondary",
    para: "text-sm text-primary/80",
    tags: "text-sm text-primary",
    base: "text-primary",
};


type TextElement = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Text: React.FC<TextProps> = ({ children, className, variant = "base", as: TextComponent = "span" }) => {
    return (
        <TextComponent
            className={cn(
                "text-base text-shadow-xs font-oswald tracking-wider font-normal",
                variants[variant],
                className,
            )}
        >
            {children}
        </TextComponent>
    )
}

export default Text