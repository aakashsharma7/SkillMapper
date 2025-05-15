export interface Skill {
  id: string
  name: string
  category: string
  progress: number
  description?: string
  resources?: Resource[]
  dependencies?: string[] // IDs of dependent skills
  createdAt: string
  updatedAt: string
}

export interface Resource {
  id: string
  title: string
  url: string
  type: 'article' | 'video' | 'course' | 'project' | 'other'
  description?: string
  completed: boolean
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