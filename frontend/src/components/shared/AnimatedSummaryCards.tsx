"use client";


import { motion } from "motion/react";

import {
    cardVariants,
    containerVariants,
} from "@/lib/animations";

interface AnimatedSummaryCardsProps {
    children: React.ReactNode;
    className?: string;
}

export default function AnimatedSummaryCards({
    children,
    className,
}: AnimatedSummaryCardsProps) {
    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    ); 
}

export function AnimatedSummaryCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -2,
                transition: {
                    duration: 0.15,
                },
            }}
        >
            {children}
        </motion.div>
    );
}