import { motion } from "framer-motion";
import React from "react";

export const LoadingContent: React.FC = () => {
    const range = (n: number) => Array.from(Array(n).keys())
    return (

        <div className="flex justify-center items-center my-8 space-x-1">
            {range(3).map((i) => (
                <motion.div
                    key={i}
                    className="w-3 h-3 bg-gray-500 rounded-full "
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}
        </div>

    );
}