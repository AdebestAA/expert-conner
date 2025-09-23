'use client'

import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { createBookmarkAction } from '@/lib/data/repository/bookmarks'

export const BookmarkButton = ({
  caseId,
  bookmarked,
  caseTitle,
}: {
  caseId: string | null
  bookmarked: boolean
  caseTitle: string
}) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleBookmark() {
    if (!caseId) {
      return {
        status: 'error',
        message: 'Case ID is required',
      }
    }
    setIsLoading(true)
    try {
      await createBookmarkAction(caseId, bookmarked, caseTitle)

      toast({
        variant: 'default',
        description: bookmarked ? 'Bookmark removed' : 'Bookmark added',
      })
    } catch (e: any) {
      console.error('Failed to update bookmark', e)
      return {
        status: 'error',
        message: e.message,
      }
    }

    setIsLoading(false)
  }

  return (
    <Button
      variant="link"
      onClick={handleBookmark}
      className="m-0 p-0"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : bookmarked ? (
        <BookmarkCheck color="#454A6C" />
      ) : (
        <Bookmark color="#454A6C" />
      )}
    </Button>
  )
}
