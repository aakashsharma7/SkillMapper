import { NextResponse } from 'next/server'
import { getSkillSuggestions, getResourceSuggestions } from '@/lib/openai/suggestions'
import type { Skill } from '@/types/skill'

export async function POST(request: Request) {
  try {
    const { goal, currentSkills, skillId } = await request.json()

    if (skillId) {
      const skill = currentSkills.find((s: Skill) => s.id === skillId)
      if (!skill) {
        throw new Error('Skill not found')
      }
      const resources = await getResourceSuggestions(skill)
      return NextResponse.json({ resources })
    }

    const suggestions = await getSkillSuggestions(goal, currentSkills)
    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error in suggestions API:', error)
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    )
  }
} 