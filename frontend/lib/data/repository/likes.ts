'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getSafeUser } from '@/lib/auth/safe-user'

export async function createLikeAction(caseId: string, liked: boolean) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (error || !user) throw error || new Error('User not found')

    const { id } = user

    if (liked) {
      const { error: deleteError } = await supabase.from('likes').delete().match({ user_id: id, case_id: caseId })
      if (deleteError) throw deleteError
    } else {
      const { error: insertError } = await supabase.from('likes').insert({
        user_id: id,
        case_id: caseId,
      })

      if (insertError) throw insertError
    }

    revalidatePath('/', 'layout')
    return {
      status: 'success',
      message: 'Like added',
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}

export async function getAllLikes() {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (error || !user) throw error || new Error('User not found')

    const { id } = user

    const { data: likes, error: likesError } = await supabase.from('likes').select('*').eq('user_id', id)

    if (likesError) throw likesError

    return {
      status: 'success',
      message: 'Likes fetched',
      data: likes,
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}

export async function getLikesByMedicalCaseId(caseId: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (error || !user) throw error || new Error('User not found')

    const { id } = user

    const { data: likes, error: likesError } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', id)
      .eq('case_id', caseId)

    if (likesError) throw likesError

    return {
      status: 'success',
      message: 'Likes fetched',
      data: likes,
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}
