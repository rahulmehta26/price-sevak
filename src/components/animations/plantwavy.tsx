import type { Variants } from "motion/react"

export const plantSway: Variants = {
    animate: {
        rotate: [0, 0.8, -0.8, 0],
        transition: {
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
}
