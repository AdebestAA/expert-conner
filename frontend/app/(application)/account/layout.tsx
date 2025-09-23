import { ReactNode } from 'react'
import Container from '@/components/general/Container'
import { AccountNavigation } from '@/components/page-content/account/account-navigation'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-8 min-h-screen">
        <AccountNavigation />
        <div className="col-span-3">
          {children}
        </div>
      </div>
    </Container>
  )
}

