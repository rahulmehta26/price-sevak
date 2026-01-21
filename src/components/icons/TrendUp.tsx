import React from "react";
import { cn } from "../../utils/cn";

const TrendUp = ({ className }: { className?: string }) => {
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
            <path d="M3 17l6 -6l4 4l8 -8" />
            <path d="M14 7l7 0l0 7" />
        </svg>
    );
};

export default TrendUp;
