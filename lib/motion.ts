export const revealViewport = {
  once: true,
  margin: "-80px"
};

export const revealTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
