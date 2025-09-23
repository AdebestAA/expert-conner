import { createSupabaseServerClient } from '@/lib/supabase/server'

// Cache for user data to prevent multiple simultaneous calls
let userDataCache: { user: any; timestamp: number } | null = null
const CACHE_DURATION = 1000 // 1 second cache

export async function getCachedUser() {
  try {
    // Check if we have valid cached data
    if (userDataCache && Date.now() - userDataCache.timestamp < CACHE_DURATION) {
      return {
        data: userDataCache.user,
        error: null,
      }
    }

    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return {
        data: null,
        error,
      }
    }

    // Update cache
    userDataCache = {
      user: data.user,
      timestamp: Date.now(),
    }

    return {
      data: data.user,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error occurred'),
    }
  }
}

export function clearUserCache() {
  userDataCache = null
}
