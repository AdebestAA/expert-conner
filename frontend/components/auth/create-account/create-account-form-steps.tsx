'use client'

import { useCreateAccountContext } from '@/components/auth/create-account/create-account-context'
import { CreateAccountFormStepOne } from '@/components/auth/create-account/steps/create-account-form-step-one'
import { CreateAccountFormStepTwo } from '@/components/auth/create-account/steps/create-account-form-step-two'
import { CreateAccountFormStepThree } from '@/components/auth/create-account/steps/create-account-form-step-three'
import Image from 'next/image'
import { StepIndicator } from '@/components/page-content/account/forms/step-indicator'
import Link from 'next/link'

export const CreateAccountFormSteps = () => {
  const { step } = useCreateAccountContext()

  function renderStep() {
    switch (step) {
      case 0:
        return <CreateAccountFormStepOne />
      case 1:
        return <CreateAccountFormStepTwo />
      case 2:
        return <CreateAccountFormStepThree />
    }
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <Link href="/">
        <div className='flex flex-col gap-1 absolute top-10 lg:top-20'>
                  <Image src={'/experts-corner-new.png'} alt={'Logo'} style={{ objectFit: 'contain' }} width={149} height={46}
                        />
                </div>
      </Link>
      <StepIndicator step={step} />
      <h1 className="text-textPrimary font-normal">Create Account</h1>
      {renderStep()}
    </div>
  )
}


