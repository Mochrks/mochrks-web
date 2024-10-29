import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom';

export default function ComponentNotFound() {
    const [isEntering, setIsEntering] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (isEntering) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isEntering, navigate]);
    return (
        <div className="relative h-screen w-screen flex overflow-hidden flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-slate-900">
            {/* Container untuk circle */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-cyan-600 to-blue-900"
                    animate={{
                        scale: isEntering ? [1, Math.max(window.innerWidth / 300, window.innerHeight / 300) * 1.2] : 1,
                        opacity: isEntering ? [1, 0.8, 0] : 1,
                    }}
                    transition={{
                        duration: 1.5,
                        scale: {
                            type: "tween",
                            ease: "easeInOut"
                        }
                    }}
                />
            </div>
            <motion.div
                className='absolute overflow-hidden'
                animate={{ opacity: isEntering ? 0 : 1 }}
                transition={{ duration: 0.5 }}>
                <svg width="600" height="700" viewBox="0 0 200 200">
                    <motion.path
                        d="M50,100 C50,72 72,50 100,50 C128,50 150,72 150,100"
                        fill="none"
                        stroke="#AC94F4"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M50,100 C50,128 72,150 100,150 C128,150 150,128 150,100"
                        fill="none"
                        stroke="#A14ED4"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>
            <motion.div
                className="absolute text-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                animate={{ opacity: isEntering ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="text-9xl overflow-hidden font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-600"
                    style={{
                        WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                    }}
                    animate={{
                        filter: isHovering ? [
                            'hue-rotate(0deg)',
                            'hue-rotate(360deg)',
                        ] : 'hue-rotate(0deg)',
                    }}
                    transition={{
                        duration: isHovering ? 2 : 0,
                        repeat: isHovering ? Infinity : 0,
                        ease: 'linear',
                    }}
                >
                    404
                </motion.div>
                <motion.div
                    className="absolute overflow-hidden inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-xl"
                    animate={{
                        opacity: isHovering ? [0.5, 0.8, 0.5] : 0.5,
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
                <h1 className="text-4xl font-bold mt-8 mb-4"></h1>
            </motion.div>
            <motion.div className='absolute pt-[120px] text-center overflow-hidden'
                animate={{ opacity: isEntering ? 0 : 1 }}
                transition={{ duration: 0.5 }}>
                <Button
                    className="text-xl"
                    onClick={() => setIsEntering(true)}
                    variant='link'
                >
                    Go to Home
                </Button>
                <p className="text-sm mb-8 text-white">The page you're looking for has a broken connection</p>
            </motion.div>

            {isEntering && (
                <motion.div
                    className="absolute inset-0  flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 0.5 }}
                >
                    <Loading />
                </motion.div>
            )}
        </div>
    )

}
