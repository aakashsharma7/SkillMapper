'use client'

import { motion } from 'framer-motion'
import AuthForm from './AuthForm'

export default function AnimatedAuthContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold"
        >
          Welcome to SkillMapper
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2 text-muted-foreground"
        >
          Sign in to start mapping your learning journey
        </motion.p>
      </div>
      <AuthForm />
    </motion.div>
  )
} 