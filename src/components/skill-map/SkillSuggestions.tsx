import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Skill } from '@/types'
import { useToast } from '@/contexts/ToastContext'

interface SkillSuggestion {
  name: string
  category: string
  description: string
}

interface SkillSuggestionsProps {
  onAddSkill: (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void
}

export default function SkillSuggestions({ onAddSkill }: SkillSuggestionsProps) {
  const [goal, setGoal] = useState('')
  const [suggestions, setSuggestions] = useState<SkillSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const getSuggestions = async () => {
    if (!goal.trim()) {
      showToast('Please enter a learning goal', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal }),
      })

      if (!response.ok) {
        throw new Error('Failed to get suggestions')
      }

      const data = await response.json()
      setSuggestions(data.suggestions || [])
      
      if (data.suggestions.length === 0) {
        showToast('No specific suggestions found. Showing general skills.', 'info')
      }
    } catch (error) {
      console.error('Error getting suggestions:', error)
      showToast('Failed to get suggestions. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      getSuggestions()
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
          onKeyPress={handleKeyPress}
          placeholder="Enter your learning goal (e.g., web development, data science)..."
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          onClick={getSuggestions}
          disabled={loading || !goal.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 hover:bg-primary/90 transition-colors"
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
                className="p-3 border rounded-md bg-background hover:border-primary/50 transition-colors"
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
                    onClick={() => {
                      onAddSkill({
                        name: suggestion.name,
                        category: suggestion.category,
                        progress: 0,
                        description: suggestion.description,
                      })
                      showToast('Skill added successfully', 'success')
                    }}
                    className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
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