import { cn } from '../../utils/cn'
import { motion } from "motion/react"
import { drawPath } from '../animations/hover'

const Line = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn("icon", className)}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path variants={drawPath} d="M3 7l6 6l4 -4l8 8" />
            <motion.path variants={drawPath} d="M21 10l0 7l-7 0" />
        </svg>
    )
}

export default Line