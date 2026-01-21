import type { Variants } from "motion/react";

export const leafSway: Variants = {
  animate: {
    rotate: [0, 1.6, -1.4, 0],
    y: [0, -1.2, 1, 0],
    scale: [1, 1.01, 0.995, 1],
    transition: {
      duration: 5.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
