// Resource Types
export type ResourceType = 'article' | 'video' | 'course' | 'project' | 'other'

export interface Resource {
  id: string
  title: string
  url: string
  type: ResourceType
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
  user_id: string
}

// Skill Types
export interface Skill {
  id: string
  name: string
  category: string
  progress: number
  description?: string
  resources?: Resource[]
  dependencies?: string[]
  created_at: string
  updated_at: string
  user_id: string
}

export interface SkillNode {
  id: string
  type: 'skill'
  data: {
    label: string
    category: string
    progress: number
    description?: string
  }
  position: {
    x: number
    y: number
  }
}

export interface SkillEdge {
  id: string
  source: string
  target: string
}

// User Types
export interface User {
  id: string
  email?: string
  created_at?: string
  last_sign_in_at?: string
  [key: string]: any // Allow for additional Supabase user properties
}

// UI Types
export interface ErrorProps {
  message: string
  onRetry?: () => void
}

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

// Context Types
export interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

export interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
} 