import { motion } from "motion/react"
import { cn } from "../../utils/cn";

type CircleProps = {
    size: number;
    radius: number;
    dash: number[];
    frontColor: string;
    backColor: string;
    duration: number;
};

export function Circle({
    size,
    radius,
    dash,
    frontColor,
    backColor,
    duration,
}: CircleProps) {
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = [
        0.1 * circumference,
        0,
        1.2 * circumference,
        1.1 * circumference
    ];

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${radius * 2 + 6} ${radius * 2 + 6}`}
            className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}
        >
            <motion.circle
                cx={radius + 3}
                cy={radius + 3}
                r={radius}
                fill="none"
                stroke={backColor}
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={dash.join(" ")}
                animate={{ strokeDashoffset }}
                transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.circle
                cx={radius + 3}
                cy={radius + 3}
                r={radius}
                fill="none"
                stroke={frontColor}
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={dash.join(" ")}
                animate={{ strokeDashoffset }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.15,
                }}
            />
        </svg>
    );
}
