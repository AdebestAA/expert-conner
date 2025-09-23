import { ChangePasswordForm } from '@/components/page-content/account/forms/change-password-form'
import { Suspense } from 'react'

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ChangePasswordForm />
      </Suspense>
    </div>
  )
}
