import OpenAI from 'openai'
import type { Skill } from '@/types/skill'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getSkillSuggestions(goal: string, currentSkills: Skill[]) {
  try {
    const prompt = `Given the goal "${goal}" and current skills: ${currentSkills
      .map((s) => s.name)
      .join(', ')}, suggest a learning path with specific skills to acquire. Format the response as a JSON array of skills with name, category, and description.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' },
    })

    const response = JSON.parse(completion.choices[0].message.content || '{}')
    return response.skills || []
  } catch (error) {
    console.error('Error getting skill suggestions:', error)
    return []
  }
}

export async function getResourceSuggestions(skill: Skill) {
  try {
    const prompt = `Suggest learning resources for the skill "${skill.name}" in the category "${skill.category}". Format the response as a JSON array of resources with title, url, type (article/video/course/project), and description.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' },
    })

    const response = JSON.parse(completion.choices[0].message.content || '{}')
    return response.resources || []
  } catch (error) {
    console.error('Error getting resource suggestions:', error)
    return []
  }
} 