'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Resource, ResourceType } from '@/types/resource'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { useToast } from '@/contexts/ToastContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const resourceTypes: ResourceType[] = ['article', 'video', 'course', 'project', 'other']

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    title: '',
    url: '',
    type: 'article',
    description: '',
    completed: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    fetchResources()
  }, [user, router])

  const fetchResources = async () => {
    try {
      setError(null)
      const response = await fetch('/api/resources')
      if (!response.ok) {
        throw new Error('Failed to fetch resources')
      }
      const data = await response.json()
      setResources(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleAddResource = async () => {
    if (!newResource.title || !newResource.url) return

    try {
      setError(null)
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newResource,
          user_id: user?.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add resource')
      }

      const data = await response.json()
      setResources((prev) => [...prev, data])
      setNewResource({
        title: '',
        url: '',
        type: 'article',
        description: '',
        completed: false,
      })
      showToast('Resource added successfully', 'success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      setError(message)
      showToast(message, 'error')
    }
  }

  const toggleComplete = async (id: string) => {
    const resource = resources.find((r) => r.id === id)
    if (!resource) return

    try {
      setError(null)
      const response = await fetch('/api/resources', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...resource,
          completed: !resource.completed,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update resource')
      }

      const data = await response.json()
      setResources((prev) =>
        prev.map((r) => (r.id === id ? data : r))
      )
      showToast(
        `Resource marked as ${data.completed ? 'completed' : 'incomplete'}`,
        'success'
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      setError(message)
      showToast(message, 'error')
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Loading />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>

        {error && (
          <div className="mb-8">
            <Error message={error} onRetry={fetchResources} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) =>
                      setNewResource((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
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
                  />
                </div>

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

                <button
                  onClick={handleAddResource}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Add Resource
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Your Resources</h2>
              <div className="space-y-4">
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
                      className="p-4 border rounded-md"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </p>
                          {resource.description && (
                            <p className="text-sm mt-1">{resource.description}</p>
                          )}
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-1 inline-block"
                          >
                            Visit Resource
                          </a>
                        </div>
                        <button
                          onClick={() => toggleComplete(resource.id)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            resource.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {resource.completed ? 'Completed' : 'Mark Complete'}
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 