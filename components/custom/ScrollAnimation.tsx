"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  variant: keyof typeof variants;
}

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  zoomInLeft: {
    hidden: { opacity: 0, scale: 0.8, x: -100 },
    visible: { opacity: 1, scale: 1, x: 0 },
  },
  zoomInRight: {
    hidden: { opacity: 0, scale: 0.8, x: 100 },
    visible: { opacity: 1, scale: 1, x: 0 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
};

const AnimateOnScroll = ({
  children,
  className,
  variant,
}: AnimateOnScrollProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={variants[variant]}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInUp = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="fadeInUp" {...props} />
);
export const FadeIn = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="fadeIn" {...props} />
);
export const ZoomIn = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="zoomIn" {...props} />
);
export const ZoomInLeft = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="zoomInLeft" {...props} />
);
export const ZoomInRight = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="zoomInRight" {...props} />
);
export const SlideInLeft = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="slideInLeft" {...props} />
);
export const SlideInRight = (props: Omit<AnimateOnScrollProps, "variant">) => (
  <AnimateOnScroll variant="slideInRight" {...props} />
);
