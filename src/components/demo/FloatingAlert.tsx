import React from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Send } from "lucide-react";

export const FloatingAlert: React.FC = () => (
    <div className="space-y-4 p-4 z-10">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="fixed bottom-5 right-5"
        >
            <Alert className="bg-teal-50 dark:bg-teal-900 border-l-4 border-teal-500 shadow-lg">
                <div className="flex items-center">
                    <Send className="mr-2 text-teal-500" />
                    <div>
                        <AlertTitle>Thank you for reaching out to me!</AlertTitle>
                        <AlertDescription>I’ve received your message and will get back to you shortly.</AlertDescription>
                    </div>
                </div>
            </Alert>
        </motion.div>
    </div>
);