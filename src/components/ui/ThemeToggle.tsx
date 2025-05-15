'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-background border shadow-lg hover:bg-muted transition-colors z-50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: theme === 'light' ? 0 : 180 }}
          animate={{ y: 0, opacity: 1, rotate: theme === 'light' ? 0 : 180 }}
          exit={{ y: 20, opacity: 0, rotate: theme === 'light' ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
} 