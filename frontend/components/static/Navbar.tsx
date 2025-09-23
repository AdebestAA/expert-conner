'use client'
import React, { FC } from 'react'
import Image from 'next/image'
import { UserDropdown } from '@/components/page-content/account/user-dropdown'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { useCaseContext } from '@/lib/context/caseContext'

interface Props {}

const Navbar: FC<Props> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isFormDirty, medicalCase } = useCaseContext()
  const handleNavigation = (isFormDirty: boolean) => {
    const isCases = pathname?.split('/').filter(Boolean).slice(-2, -1)[0] === 'cases'
    if (isCases && isFormDirty) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?')
      if (!confirmLeave && isCases) {
        // Prevent navigation by reverting to current path
        router.push(pathname!)
        return false
      }
      router.push('/')
    }
    router.push('/')
  }
  return (
    <nav className={cn('w-full z-50 lg:max-w-4xl xl:max-w-7xl mx-auto')}>
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-4 lg:py-0 lg:h-24 gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full lg:w-auto mb-4 lg:mb-0">
          <div
            className="cursor-pointer mb-4 sm:mb-0"
            onClick={() => handleNavigation(isFormDirty)}
          >
            <Image
              src={'/experts-corner-new.png'}
              style={{ objectFit: 'contain' }}
              alt="SEI-healthcare-logo"
              width={240}
              height={45}
            />
          </div>
          <div className="flex lg:hidden">
            <UserDropdown />
          </div>
        </div>

        {medicalCase?.showBannerTopBarImage && (
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <Image
              src={medicalCase?.bannerTopBarImage?.url}
              alt="SEI-healthcare-logo"
              width={728}
              height={90}
              className="mx-auto"
            />
          </div>
        )}

        <div className="hidden lg:flex">
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
