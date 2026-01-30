import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Button from "../../components/ui/Button";
import Return from "../../components/icons/Return";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-background flex flex-col justify-center items-center px-6">

            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-primary/20"
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

            <div className="relative z-10 text-center">
                <div className="relative mb-8">
                    <div
                        className="text-[8rem] md:text-[16rem] font-black leading-none tracking-tighter select-none"
                    >
                        404
                    </div>

                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-4 mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        Page not found
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto text-base md:text-lg">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                        leftIcon={Return}
                    />
                </motion.div>
            </div>

        </section>
    );
};

export default NotFound;
