"use client";

import { motion } from "motion/react";
import { cardVariants } from "@/lib/animations";

interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function AnimatedCard({
    children,
    className,
}: AnimatedCardProps) {
    return (
        <motion.div
            variants={cardVariants}
            className={className}
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