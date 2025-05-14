'use client'

import { motion } from 'framer-motion'

interface ErrorProps {
  message: string
  onRetry?: () => void
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-destructive/10 text-destructive p-4 rounded-lg"
    >
      <p className="mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium hover:underline"
        >
          Try again
        </button>
      )}
    </motion.div>
  )
} 