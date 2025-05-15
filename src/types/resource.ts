export type ResourceType = 'article' | 'video' | 'course' | 'project' | 'other'

export type ResourcePriority = 'low' | 'medium' | 'high'

export type ResourceStatus = 'not_started' | 'in_progress' | 'completed'

export interface Resource {
  id: string
  title: string
  url: string
  type: ResourceType
  description: string | null
  completed: boolean
  status: ResourceStatus
  priority: ResourcePriority
  estimated_time_minutes?: number
  tags: string[]
  created_at: string
  updated_at: string
  user_id: string
  last_accessed_at?: string
  progress_percentage?: number
}

export interface CreateResourceDTO {
  title: string
  url: string
  type: ResourceType
  description?: string
  completed?: boolean
  status?: ResourceStatus
  priority?: ResourcePriority
  estimated_time_minutes?: number
  tags?: string[]
  progress_percentage?: number
}

export interface UpdateResourceDTO {
  id: string
  title?: string
  url?: string
  type?: ResourceType
  description?: string
  completed?: boolean
  status?: ResourceStatus
  priority?: ResourcePriority
  estimated_time_minutes?: number
  tags?: string[]
  progress_percentage?: number
  last_accessed_at?: string
}

// Validation functions
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isValidResourceType = (type: string): type is ResourceType => {
  return ['article', 'video', 'course', 'project', 'other'].includes(type)
}

export const isValidPriority = (priority: string): priority is ResourcePriority => {
  return ['low', 'medium', 'high'].includes(priority)
}

export const isValidStatus = (status: string): status is ResourceStatus => {
  return ['not_started', 'in_progress', 'completed'].includes(status)
} 