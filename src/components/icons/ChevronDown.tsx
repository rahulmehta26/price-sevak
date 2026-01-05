import { motion } from "motion/react"
import { cn } from '../../utils/cn'
import { drawPath } from '../animations/hover'

const ChevronDown = ({ className }: { className?: string }) => {
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
            <motion.path variants={drawPath} d="M6 9l6 6l6 -6" />
        </svg>
    )
}

export default ChevronDown