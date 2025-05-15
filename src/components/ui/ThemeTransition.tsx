'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeTransition() {
  const { theme } = useTheme()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)'
            : 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
        }}
      />
    </AnimatePresence>
  )
} 