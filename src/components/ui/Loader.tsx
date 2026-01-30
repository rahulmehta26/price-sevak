import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { Circle } from "../icons/Circle";

type LoaderProps = {
    size?: number;
    text?: string;
    frontColor?: string;
    backColor?: string;
    textColor?: string;
    className?: string;
};

export default function Loader({
    size = 64,
    text = "Loading...",
    frontColor = "var(--color-primary)",
    backColor = "var(--color-secondary)",
    textColor = "var(--color-primary)",
    className,
}: LoaderProps) {
    const duration = 1.8;

    return (

        <div
            className="w-full h-screen flex justify-center items-center"
        >
            <div
                className={cn(
                    "flex flex-col items-center justify-center",
                    size && `w-${size} h-${size + 40}`,
                    className
                )}
            >
                <div
                    className={cn(
                        "relative",
                        size && `w-${size} h-${size}`
                    )}
                >

                    <Circle
                        size={size * 1.35}
                        radius={40}
                        dash={[62.75, 188.25]}
                        frontColor={frontColor}
                        backColor={backColor}
                        duration={duration}
                    />

                    <Circle
                        size={size}
                        radius={27}
                        dash={[42.5, 127.5]}
                        frontColor={frontColor}
                        backColor={backColor}
                        duration={duration}
                    />

                    <Circle
                        size={size * 0.55}
                        radius={14}
                        dash={[22, 66]}
                        frontColor={frontColor}
                        backColor={backColor}
                        duration={duration}
                    />
                </div>

                <motion.div
                    className={cn(
                        "mt-16 relative",
                        "text-sm font-mono font-medium md:text-lg",
                        textColor && `text-${textColor}`
                    )}
                >
                    <motion.span
                        className={cn(
                            "absolute font-mono left-0 md:text-lg",
                            textColor && `text-${frontColor}`
                        )}
                        animate={{
                            clipPath: [
                                "inset(0 100% 0 0)",
                                "inset(0)",
                                "inset(0 0 0 100%)",
                            ],
                        }}
                        transition={{
                            duration: 3.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {text.toLowerCase()}
                    </motion.span>

                    {text.toLowerCase()}
                </motion.div>
            </div>
        </div>
    );
}

