import type { Variants } from "motion/react";

export const infiniteGlitch: Variants = {
  animate: {
    opacity: [1, 0.7, 1],
    x: [0, -1.5, 1.5, -1, 1, 0],
    y: [0, 1, -1, 0],
    filter: ["blur(0px)", "blur(1.2px)", "blur(0px)"],
    transition: {
      duration: 0.35,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 2.5,
    },
  },
};
