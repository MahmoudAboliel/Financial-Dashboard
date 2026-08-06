"use client";

import { motion } from "motion/react";
import { pageVariants } from "@/lib/animations";

interface PageAnimationProps {
    children: React.ReactNode;
}

export default function PageAnimation({
    children,
}: PageAnimationProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    );
}