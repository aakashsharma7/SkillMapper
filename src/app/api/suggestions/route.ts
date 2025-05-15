import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface SkillSuggestion {
  name: string
  category: string
  description: string
}

// Predefined skill suggestions based on common learning paths
const skillSuggestions: Record<string, SkillSuggestion[]> = {
  'web development': [
    {
      name: 'HTML & CSS',
      category: 'Frontend',
      description: 'Learn the fundamentals of web markup and styling',
    },
    {
      name: 'JavaScript',
      category: 'Frontend',
      description: 'Master the programming language of the web',
    },
    {
      name: 'React',
      category: 'Frontend Framework',
      description: 'Build modern user interfaces with React',
    },
    {
      name: 'Node.js',
      category: 'Backend',
      description: 'Create server-side applications with JavaScript',
    },
  ],
  'data science': [
    {
      name: 'Python',
      category: 'Programming',
      description: 'Learn Python for data analysis and machine learning',
    },
    {
      name: 'Pandas',
      category: 'Data Analysis',
      description: 'Master data manipulation and analysis with Pandas',
    },
    {
      name: 'NumPy',
      category: 'Data Analysis',
      description: 'Learn numerical computing with NumPy',
    },
    {
      name: 'Scikit-learn',
      category: 'Machine Learning',
      description: 'Build machine learning models with scikit-learn',
    },
  ],
  'mobile development': [
    {
      name: 'Swift',
      category: 'iOS Development',
      description: 'Learn iOS app development with Swift',
    },
    {
      name: 'Kotlin',
      category: 'Android Development',
      description: 'Build Android apps with Kotlin',
    },
    {
      name: 'React Native',
      category: 'Cross-platform',
      description: 'Create mobile apps for iOS and Android with React Native',
    },
    {
      name: 'Flutter',
      category: 'Cross-platform',
      description: 'Build beautiful native apps with Flutter',
    },
  ],
  'cloud computing': [
    {
      name: 'AWS',
      category: 'Cloud Platform',
      description: 'Learn Amazon Web Services cloud platform',
    },
    {
      name: 'Docker',
      category: 'Containerization',
      description: 'Master containerization with Docker',
    },
    {
      name: 'Kubernetes',
      category: 'Container Orchestration',
      description: 'Learn container orchestration with Kubernetes',
    },
    {
      name: 'Terraform',
      category: 'Infrastructure as Code',
      description: 'Manage infrastructure as code with Terraform',
    },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { goal } = await request.json()

    // Convert goal to lowercase for case-insensitive matching
    const normalizedGoal = goal.toLowerCase()

    // Find matching suggestions based on the goal
    let suggestions: SkillSuggestion[] = []
    for (const [key, value] of Object.entries(skillSuggestions)) {
      if (normalizedGoal.includes(key)) {
        suggestions = [...suggestions, ...value]
      }
    }

    // If no specific matches found, return general suggestions
    if (suggestions.length === 0) {
      suggestions = [
        {
          name: 'Problem Solving',
          category: 'Core Skills',
          description: 'Develop strong problem-solving abilities',
        },
        {
          name: 'Communication',
          category: 'Soft Skills',
          description: 'Improve your communication skills',
        },
        {
          name: 'Time Management',
          category: 'Productivity',
          description: 'Learn effective time management techniques',
        },
      ]
    }

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error processing suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to process suggestions' },
      { status: 500 }
    )
  }
} 