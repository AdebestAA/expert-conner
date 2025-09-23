'use client'

import { CreateAccountProvider } from '@/components/auth/create-account/create-account-context'
import { CreateAccountFormSteps } from '@/components/auth/create-account/create-account-form-steps'


export const CreateAccountForm = () => {
  return (
    <CreateAccountProvider>
      <CreateAccountFormSteps />
    </CreateAccountProvider>
  )
}

