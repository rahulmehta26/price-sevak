import { cn } from "../../utils/cn";
import { motion } from "motion/react"
import ChevronRight from "../icons/ChevronRight";
import Text from "./Text";

type HoverSlideButtonProps = {
    onClick: () => void;
    text?: string;
};

const HoverSlideButton = ({ onClick, text = "View All" }: HoverSlideButtonProps) => {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileTap={{ scale: [0.95, 1, 1.05, 1] }}
            className={cn(
                "relative lg:p-4 lg:py-2 rounded-sm",
                "group cursor-pointer",
                "flex justify-start items-center gap-2"
            )}
        >
            <span className="hover-slide-bg" />

            <Text
                as="span"
                variant="tags"
                className={cn(
                    "relative z-10 text-foreground font-normal font-mono",
                    "group-hover:text-primary transition-colors group-hover:duration-300 duration-200 delay-75"
                )}
            >
                {text}
            </Text>

            <ChevronRight className={cn(
                "relative z-10 w-4.5 h-4.5",
                "group-hover:text-primary transition-colors group-hover:duration-300 duration-200 delay-75"
            )} />
        </motion.button>
    );
};

export default HoverSlideButton;
