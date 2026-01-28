import { type Variants } from "motion/react";

export const drawPath: Variants = {
  initial: {
    pathLength: 1,
  },

  hover: {
    pathLength: [0, 1],
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
