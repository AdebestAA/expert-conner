import { Suspense } from 'react'
import { LoadingPage } from '@/components/loading-page'
import LanguageDropDown from '@/components/LanguageDropDown'

export default function SingleCaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div>
      <LanguageDropDown/>
        {children}
      </div>
    </Suspense>
  )
}
