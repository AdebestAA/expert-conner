import { Suspense } from 'react'
import { LoadingPage } from '@/components/loading-page'

export default function SingleCaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div>
        {children}
      </div>
    </Suspense>
  )
}
