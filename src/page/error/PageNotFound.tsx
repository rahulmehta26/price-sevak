import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Button from "../../components/ui/Button";
import Return from "../../components/icons/Return";
import AnimatedItem from "../../components/ui/AnimatedItem";
import { cn } from "../../utils/cn";
import Home from "../../components/icons/Home";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <section className={cn(
            "relative w-full min-h-screen px-6",
            "overflow-hidden bg-background",
            "flex flex-col justify-center items-center"
        )}>

            <motion.div
                className={cn(
                    "absolute top-1/4 left-1/4 w-32 h-32",
                    "rounded-full border-2 border-primary/20"
                )}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className={cn("relative z-10 text-center")}>
                <div className="relative mb-8">
                    <div
                        className={cn(
                            "text-[8rem] md:text-[16rem] font-black",
                            "leading-none tracking-tighter select-none"
                        )}
                    >
                        404
                    </div>

                </div>

                <AnimatedItem
                    as="div"
                    className="space-y-4 mb-10"
                >
                    <h2 className={cn("text-2xl md:text-3xl font-semibold text-foreground")}>
                        Page not found
                    </h2>
                    <p className={cn("text-muted-foreground max-w-md mx-auto text-base md:text-lg")}>
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </AnimatedItem>

                <AnimatedItem
                    as="div"
                    className={cn("flex flex-col sm:flex-row gap-4 justify-center items-center")}
                >
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="min-w-[10rem]"
                        textStyle="text-foreground"
                        title="Go Back"
                        leftIcon={Return}
                        leftIconStyle="stroke-foreground"
                    />

                    <Button
                        onClick={() => navigate("/")}
                        className="min-w-[10rem]"
                        title="Return Home"
                        leftIcon={Home}
                    />
                </AnimatedItem>
            </div>

        </section>
    );
};

export default NotFound;
