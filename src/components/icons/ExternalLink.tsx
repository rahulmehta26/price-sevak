import { motion, type Variants } from "motion/react"
import { cn } from '../../utils/cn'

const arrowVariants: Variants = {
    initial: {
        x: 0,
        y: 0,
    },
    hover: {
        x: 1.5,
        y: -1.5,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
    },
}

const ExternalLink = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("icon", className)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
            <motion.path variants={arrowVariants} d="M11 13l9 -9" />
            <motion.path variants={arrowVariants} d="M15 4h5v5" />
        </svg>
    )
}

export default ExternalLink