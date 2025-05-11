import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Skill } from '@/types'

interface SkillSuggestionsProps {
  onAddSkill: (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void
}

export default function SkillSuggestions({ onAddSkill }: SkillSuggestionsProps) {
  const [goal, setGoal] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getSuggestions = async () => {
    if (!goal.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal,
          currentSkills: [], // TODO: Get current skills from context/state
        }),
      })

      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Error getting suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Get Skill Suggestions</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your learning goal..."
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          onClick={getSuggestions}
          disabled={loading || !goal.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <h4 className="font-medium">Suggested Skills:</h4>
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 border rounded-md bg-background"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{suggestion.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.category}
                    </p>
                    <p className="text-sm mt-1">{suggestion.description}</p>
                  </div>
                  <button
                    onClick={() => onAddSkill({
                      name: suggestion.name,
                      category: suggestion.category,
                      progress: 0,
                      description: suggestion.description,
                    })}
                    className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 