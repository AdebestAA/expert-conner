"use client"
import Navbar from '@/components/static/Navbar'
import { CaseContextProvider } from '@/lib/context/caseContext'
import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
  return (
    <CaseContextProvider>
      <Navbar />
      {children}
    </CaseContextProvider>
  )
}
