'use client'

import { useState, useEffect } from 'react'
import type { Resource, ResourceType } from '@/types/resource'
import type { AppError } from '@/types/error'
import Loading from '@/components/ui/Loading'
import { useToast } from '@/contexts/ToastContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import AnimatedResourcesContent from '@/components/resources/AnimatedResourcesContent'

const resourceTypes: ResourceType[] = ['article', 'video', 'course', 'project', 'other']

interface NewResource {
  title: string
  url: string
  type: ResourceType
  description: string
  completed: boolean
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState<NewResource>({
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
      const response = await fetch(`/api/resources?userId=${user?.id}`)
      if (!response.ok) {
        const error = new globalThis.Error('Failed to fetch resources') as AppError
        error.status = response.status
        throw error 
      }
      const data = await response.json()
      setResources(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleAddResource = async (newResource: Omit<Resource, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
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
        const error = new globalThis.Error('Failed to add resource') as AppError
        error.status = response.status
        throw error
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
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
        const error = new globalThis.Error('Failed to update resource') as AppError
        error.status = response.status
        throw error
      }

      const data = await response.json()
      setResources((prev) =>
        prev.map((r) => (r.id === id ? data : r))
      )
      showToast(
        `Resource marked as ${data.completed ? 'completed' : 'incomplete'}`,
        'success'
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
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
      <AnimatedResourcesContent
        resources={resources}
        error={error}
        onRetry={fetchResources}
        onToggleComplete={toggleComplete}
        onAddResource={handleAddResource}
      />
    </div>
  )
} 