'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Resource, ResourceType, ResourceStatus, ResourcePriority } from '@/types/resource'
import ErrorComponent from '@/components/ui/Error'

const resourceTypes: ResourceType[] = ['article', 'video', 'course', 'project', 'other']

interface AnimatedResourcesContentProps {
  resources: Resource[]
  error: string | null
  onRetry: () => void
  onToggleComplete: (id: string) => void
  onAddResource: (resource: Omit<Resource, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => void
}

interface NewResource {
  title: string
  url: string
  type: ResourceType
  description: string
  completed: boolean
  status: ResourceStatus
  priority: ResourcePriority
  tags: string[]
  estimated_time_minutes?: number
  progress_percentage?: number
}

export default function AnimatedResourcesContent({
  resources,
  error,
  onRetry,
  onToggleComplete,
  onAddResource,
}: AnimatedResourcesContentProps) {
  const [newResource, setNewResource] = useState<NewResource>({
    title: '',
    url: '',
    type: 'article',
    description: '',
    completed: false,
    status: 'not_started',
    priority: 'medium',
    tags: [],
    estimated_time_minutes: undefined,
    progress_percentage: undefined
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResource.title || !newResource.url) return
    onAddResource(newResource)
    setNewResource({
      title: '',
      url: '',
      type: 'article',
      description: '',
      completed: false,
      status: 'not_started',
      priority: 'medium',
      tags: [],
      estimated_time_minutes: undefined,
      progress_percentage: undefined
    })
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Learning Resources</h1>

      {error && (
        <div className="mb-6 sm:mb-8">
          <ErrorComponent message={error} onRetry={onRetry} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Resource</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) =>
                      setNewResource((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) =>
                      setNewResource((prev) => ({ ...prev, url: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={newResource.type}
                    onChange={(e) =>
                      setNewResource((prev) => ({
                        ...prev,
                        type: e.target.value as ResourceType,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {resourceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={newResource.priority}
                    onChange={(e) =>
                      setNewResource((prev) => ({
                        ...prev,
                        priority: e.target.value as ResourcePriority,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Estimated Time (minutes)</label>
                  <input
                    type="number"
                    value={newResource.estimated_time_minutes || ''}
                    onChange={(e) =>
                      setNewResource((prev) => ({
                        ...prev,
                        estimated_time_minutes: e.target.value ? parseInt(e.target.value) : undefined,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Progress (%)</label>
                  <input
                    type="number"
                    value={newResource.progress_percentage || ''}
                    onChange={(e) =>
                      setNewResource((prev) => ({
                        ...prev,
                        progress_percentage: e.target.value ? parseInt(e.target.value) : undefined,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Add Resource
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Resources</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {resources.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No resources added yet
                  </p>
                ) : (
                  resources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 border rounded-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </p>
                          {resource.description && (
                            <p className="text-sm mt-1">{resource.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {resource.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            Visit Resource
                          </a>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onToggleComplete(resource.id)}
                            className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                              resource.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {resource.completed ? 'Completed' : 'Mark Complete'}
                          </button>
                          {resource.progress_percentage !== undefined && (
                            <div className="text-sm text-muted-foreground">
                              Progress: {resource.progress_percentage}%
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 