import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Resource } from '@/types'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(resources)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const resource = await request.json()

    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const resource = await request.json()

    const { data, error } = await supabase
      .from('resources')
      .update(resource)
      .eq('id', resource.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { id } = await request.json()

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    )
  }
} 