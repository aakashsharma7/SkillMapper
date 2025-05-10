'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SkillMap from '@/components/skill-map/SkillMap'
import SkillSuggestions from '@/components/skill-map/SkillSuggestions'
import type { Skill } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

export default function SkillMapPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const { user } = useAuth()

  const handleAddSkill = async (skillData: Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...skillData,
          user_id: user.id,
        }),
      })

      const newSkill = await response.json()
      setSkills((prev) => [...prev, newSkill])
    } catch (error) {
      console.error('Error adding skill:', error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Your Skill Map</h1>
        <p className="text-muted-foreground">
          Visualize and manage your learning journey. Add skills, track progress, and connect related skills.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <SkillMap />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SkillSuggestions onAddSkill={handleAddSkill} />
        </motion.div>
      </div>
    </div>
  )
} 