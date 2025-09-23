"use client";

import { createContext, ReactNode, useContext, useState } from 'react'


type CreateAccountValuesType = {
  firstName: string
  lastName: string
  countryOfPractice: string

  licenseNumber: string
  qualifications: string
  occupation: string
  primarySpecialization: string
  secondarySpecialization: string

  email: string
  password: string
  phoneNumber: string
}

type CreateAccountContextType = {
  formValues: CreateAccountValuesType
  updateFormValues: (values: Partial<CreateAccountValuesType>) => void
  step: number
  prevStep: () => void
  nextStep: () => void
}

const CreateAccountContext = createContext<CreateAccountContextType | undefined>(undefined)

export const CreateAccountProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState<CreateAccountValuesType>({
    firstName: '',
    lastName: '',
    countryOfPractice: '',

    licenseNumber: '',
    qualifications: '',
    occupation: '',
    primarySpecialization: '',
    secondarySpecialization: '',

    email: '',
    password: '',
    phoneNumber: '',
  })

  function updateFormValues(values: Partial<CreateAccountValuesType>) {
    setFormValues({
      ...formValues,
      ...values,
    })
  }

  const [step, setStep] = useState(0)

  const prevStep = () => {
    if (step === 0) return
    setStep(step - 1)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const contextValue = {
    formValues,
    updateFormValues,
    step,
    prevStep,
    nextStep
  }

  return (
    <CreateAccountContext.Provider value={contextValue}>
      {children}
    </CreateAccountContext.Provider>
  )
}


export const useCreateAccountContext = () => {
  const context = useContext(CreateAccountContext)

  if (!context) {
    throw new Error('useCreateAccountContext must be used within a CreateAccountProvider')
  }

  return context
}
