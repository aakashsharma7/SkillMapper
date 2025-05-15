'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: theme === 'dark'
            ? 'linear-gradient(to-br, hsl(240 10% 3.9%), hsl(240 10% 3.9% / 0.95), hsl(240 10% 3.9% / 0.9))'
            : 'linear-gradient(to-br, hsl(0 0% 100%), hsl(0 0% 100% / 0.95), hsl(0 0% 100% / 0.9))'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: theme === 'dark' ? 0.1 : 0.15,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </motion.div>

      {/* Dynamic gradient overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          className="absolute inset-0 opacity-[0.03]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)'
              : 'radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)'
          }}
        />
      </AnimatePresence>

      {/* Floating particles */}
      <AnimatePresence mode="wait">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-64 h-64 rounded-full backdrop-blur-3xl"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
              ],
              y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
              ],
              opacity: theme === 'dark' ? 0.05 : 0.1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: theme === 'dark'
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(59, 130, 246, 0.2)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Animated gradient orbs */}
      <AnimatePresence mode="wait">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
              ],
              y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
              ],
              opacity: theme === 'dark' ? 0.1 : 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: theme === 'dark'
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(59, 130, 246, 0.3)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Subtle noise texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        animate={{
          opacity: theme === 'dark' ? 0.02 : 0.03,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </motion.div>
    </div>
  )
} 