'use client'

import { Progress } from '@/components/ui/progress'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCaseContext } from '@/lib/context/caseContext'
import { useUser } from '@/lib/context/userContext'
import getSimulationsLog from '@/lib/hygraph/getSimulationsLog'
import updateExport from '@/lib/hygraph/updateExport'
import { checkEmptyRichText } from '@/lib/utils'
export const FormStepsAndProgress = ({
    progress,
    nextStep,
    prevStep,
    currentStep,
    disabledBack,
    disabledNext,
    stepTitles
  }: {
    progress: number,
    nextStep: () => void,
    prevStep: () => void,
    currentStep: number
    disabledBack?: boolean
    disabledNext?: boolean,
    stepTitles: (string | undefined)[]
}) => {
  const router = useRouter()
  const { medicalCase } = useCaseContext()
  const { userProfile } = useUser()
  const quizStepPosition = medicalCase?.quizStepPosition || 0;



  const currentActiveStep = stepTitles[currentStep]
  const isLastStep = currentStep === stepTitles.length - 1

  const saveLog = async () => {
    const newLog =
    {
          user: userProfile?.first_name.concat(' '+userProfile?.last_name) ?? 'Anonymous',
          case_title: medicalCase?.title ?? '-',
          date: new Date().toLocaleDateString('en-US', { day:'2-digit', month: '2-digit', year: 'numeric' })
    }

    const currentSimulationLog = await getSimulationsLog()
    currentSimulationLog?.data.push(newLog)
    const name = currentSimulationLog?.name || null;
    const data = currentSimulationLog?.data || [];
    updateExport({name: name, data: data})
    
  }
  
  const renderSteps = stepTitles.map((step, index) => {
    const isActive = step === currentActiveStep
    return (
      <p key={index}
         className={`flex-1 hidden lg:flex text-[px] xl:text-md mt-2 text-center ${isActive ? 'text-gray-900 font-medium mb-0.5' : 'text-gray-300'}`}>{step}</p>
    )
  })

  const handleNextStep = () => {
    if (isLastStep) {
      const urlParams = new URLSearchParams(window?.location?.search);
      if (urlParams.has('email') && urlParams.has('password')) {
        window?.location?.reload();
      }
      // TODO: What do we want to happen here?
      saveLog()
      router.push(medicalCase?.finishUrl || '/')
    }

    nextStep()
  }

  if (medicalCase === null) {
    return <SkeletonFormStepsAndProgress />;
  }
  return (
    <div
      className="flex-grow-0 px-2 lg:px-12 py-5 flex items-center w-full mx-auto justify-between bg-white">
      <Button variant="default" onClick={() => prevStep()} disabled={disabledBack}>
        <ChevronLeft size={18} className="p-0 m-0 text-textPrimary" />
        Back</Button>
      <div className="px-8 w-full text-center">
        <Progress color="#1026C4" value={progress} className="w-full" />

        <div className="flex justify-between w-full mt-2 text-gray-400 text-sm text-center">
          {renderSteps}
          <p className="flex text-center lg:hidden text-black">{stepTitles[currentStep]}</p>
        </div>
      </div>
      <Button onClick={handleNextStep} variant="primary" disabled={disabledNext}>
        {isLastStep ? 'Finish' : 'Next'}
        <ChevronRight size={18} color="white" className="p-0 m-0" />
      </Button>
    </div>
  )
}


function SkeletonFormStepsAndProgress() {
  return (
        <div className="flex flex-row sm:w-full w-1/2 justify-between my-4 gap-4 items-center">
                <div className="skeleton-loader h-8 w-24"></div>
                <div className="flex flex-col w-full justify-between my-4 gap-2 h-8">
                  <div className="skeleton-loader h-2 w-full"></div>
                  <div className="flex flex-row w-full justify-between h-2">
                  <div className="skeleton-loader sm:w-16 w-8"></div>
                  <div className="skeleton-loader sm:w-16 w-8"></div>
                  <div className="skeleton-loader sm:w-16 w-8"></div>
                  <div className="skeleton-loader sm:w-16 w-8"></div>
                  <div className="skeleton-loader sm:w-16 w-8"></div>
                  <div className="skeleton-loader sm:w-16 w-8"></div>
                  </div>
                </div>
                <div className="skeleton-loader h-8 w-24"></div>
        </div>
  );
}