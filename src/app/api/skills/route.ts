import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import type { Skill } from '@/types/skill'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const skill: Skill = await request.json()

    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const skill: Skill = await request.json()

    const { data, error } = await supabase
      .from('skills')
      .update(skill)
      .eq('id', skill.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
} 