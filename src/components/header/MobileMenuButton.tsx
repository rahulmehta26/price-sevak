import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

const barVariants: Variants = {
    closed: (i: number) => ({
        rotate: 0,
        y: i === 0 ? -8 : i === 2 ? 8 : 0,
        opacity: 1,
    }),
    open: (i: number) => ({
        rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
        y: 0,
        opacity: i === 1 ? 0 : 1,
    }),
};

const MobileMenuButton = ({
    isMobileOpen,
    handleToggle,
}: {
    isMobileOpen: boolean;
    handleToggle: () => void;
}) => {
    return (
        <div className="lg:hidden flex justify-between items-center">
            <motion.button
                onClick={handleToggle}
                className={cn(
                    "relative w-10 h-10",
                    "flex items-center justify-center rounded-md",
                    "bg-foreground/1 backdrop-blur-xs cursor-pointer"
                )}

            >
                <div className="relative w-6 h-5">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={barVariants}
                            animate={isMobileOpen ? "open" : "closed"}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className={cn(
                                "absolute left-0 top-1/2",
                                "h-0.5 w-full bg-foreground",
                                "-translate-y-1/2 origin-center"
                            )}
                        />
                    ))}
                </div>
            </motion.button>
        </div>
    );
}

export default MobileMenuButton;
