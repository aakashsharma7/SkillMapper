'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SkillMap from '@/components/skill-map/SkillMap'
import SkillSuggestions from '@/components/skill-map/SkillSuggestions'
import type { Skill } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'

export default function SkillMapPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const { user } = useAuth()
  const { showToast } = useToast()

  // Fetch skills when the page loads or when user changes
  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/skills?userId=${user.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch skills')
        }
        const data = await response.json()
        setSkills(data)
      } catch (error) {
        console.error('Error fetching skills:', error)
        showToast('Failed to load skills', 'error')
      }
    }

    fetchSkills()
  }, [user, showToast])

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
      showToast('Skill added successfully', 'success')
    } catch (error) {
      console.error('Error adding skill:', error)
      showToast('Failed to add skill', 'error')
    }
  }

  const handleEditSkill = async (skillId: string) => {
    const skill = skills.find(s => s.id === skillId)
    if (skill) {
      setEditingSkill(skill)
    }
  }

  const handleUpdateSkill = async (skillData: Partial<Skill>) => {
    if (!editingSkill) return

    try {
      let response
      let updatedSkill

      if (editingSkill.id) {
        // Update existing skill
        response = await fetch(`/api/skills/${editingSkill.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skillData),
        })
        updatedSkill = await response.json()
      } else {
        // Add new skill
        response = await fetch('/api/skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...skillData,
            user_id: user?.id,
          }),
        })
        updatedSkill = await response.json()

        // Dispatch event for new skill
        window.dispatchEvent(new CustomEvent('skillAdded', {
          detail: updatedSkill
        }))
      }

      if (!response.ok) {
        throw new Error('Failed to save skill')
      }

      setSkills((prev) => {
        if (editingSkill.id) {
          return prev.map(s => s.id === updatedSkill.id ? updatedSkill : s)
        } else {
          return [...prev, updatedSkill]
        }
      })

      setEditingSkill(null)
      showToast(
        editingSkill.id ? 'Skill updated successfully' : 'Skill added successfully',
        'success'
      )
    } catch (error) {
      console.error('Error saving skill:', error)
      showToast('Failed to save skill', 'error')
    }
  }

  const handleDeleteSkill = async (skillId: string) => {
    try {
      await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE',
      })

      setSkills((prev) => prev.filter(s => s.id !== skillId))
      showToast('Skill deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting skill:', error)
      showToast('Failed to delete skill', 'error')
    }
  }

  const handleAddChildSkill = async (parentId: string) => {
    const parentSkill = skills.find(s => s.id === parentId)
    if (!parentSkill) return

    setEditingSkill({
      id: '',
      name: '',
      category: parentSkill.category,
      progress: 0,
      description: '',
      user_id: user?.id || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    // After the skill is added, we'll need to update the parent-child relationship
    const handleNewSkillAdded = async (newSkill: Skill) => {
      try {
        // Update the parent skill to include the new child skill as a dependency
        await fetch(`/api/skills/${parentId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dependencies: [...(parentSkill.dependencies || []), newSkill.id],
          }),
        })

        // Refresh the skills list
        const response = await fetch(`/api/skills?userId=${user?.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch updated skills')
        }
        const data = await response.json()
        setSkills(data)
      } catch (error) {
        console.error('Error updating parent-child relationship:', error)
        showToast('Failed to update skill relationship', 'error')
      }
    }

    // Add event listener for the new skill
    window.addEventListener('skillAdded', ((event: CustomEvent) => {
      handleNewSkillAdded(event.detail)
    }) as EventListener)
  }

  const handleAddRelatedSkill = async (skillId: string) => {
    const skill = skills.find(s => s.id === skillId)
    if (!skill) return

    // Here you would typically open a modal or form to select/create a related skill
    // For now, we'll just show a toast
    showToast('Add related skill functionality coming soon', 'info')
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
          <SkillMap
            skills={skills}
            onEditSkill={handleEditSkill}
            onDeleteSkill={handleDeleteSkill}
            onAddChildSkill={handleAddChildSkill}
            onAddRelatedSkill={handleAddRelatedSkill}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SkillSuggestions onAddSkill={handleAddSkill} />
        </motion.div>
      </div>

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleUpdateSkill({
                name: formData.get('name') as string,
                category: formData.get('category') as string,
                progress: Number(formData.get('progress')),
                description: formData.get('description') as string,
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Skill Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingSkill.name}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingSkill.category}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Progress (%)</label>
                  <input
                    type="number"
                    name="progress"
                    defaultValue={editingSkill.progress || 0}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingSkill.description}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingSkill(null)}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
} 