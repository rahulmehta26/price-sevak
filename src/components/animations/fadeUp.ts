import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      mass: 0.9,
    },
  },
};
