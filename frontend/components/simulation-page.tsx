'use client'

import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/general/Card'
import Introduction from '@/components/steps/Introduction'
import PatientInterview from '@/components/steps/PatientInterview'
import Tests from '@/components/steps/Tests'
import Diagnoses from '@/components/steps/Diagnoses'
import { FormStepsAndProgress } from '@/components/custom/FormStepsAndProgress'
import { Orders } from '@/components/steps/Orders'
import { DecisionReview } from '@/components/steps/decision-review/DecisionReview'
import { CaseReview } from '@/components/steps/CaseReview'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { Button } from '@/components/ui/button'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { MedicalCase, PatientCase } from '@/interface'
import { useCaseContext } from '@/lib/context/caseContext'
import { DialogTitle } from '@/components/Title'
import { PatientCaseCard } from '@/components/custom/PatientCaseCard'
import { Tables } from '@/lib/types/database.types'
import { checkEmptyRichText } from '@/lib/utils'
import Quiz from './steps/Quiz'
import AlarmDirtyForm from './AlarmDirtyForm'

interface Props {
  medicalCase: MedicalCase | null
  patientCase: PatientCase | null
  medicalCaseId: string
  bookmark: Tables<'bookmarks'>
  likes: Tables<'likes'>
}

export const SimulationPage: FC<Props> = ({ medicalCase, patientCase, medicalCaseId, bookmark, likes }) => {
  const { setMedicalCase, setPatientCase, setBookmark, setMedicalCaseId, setLikes } = useCaseContext()
  const [disabledNext, setDisabledNext] = useState(false)
  const [isPatientCardOpen, setPatientCardOpen] = useState(false)
  const [diagnosisUrl, setDiagnosisUrl] = useState('')
  const { isFormDirty } = useCaseContext()
  let allSteps: any[]
  const router = useRouter()

  const hasIntroduction = () => {
    return (
      (medicalCase?.historyOfPresentIllness && !checkEmptyRichText(medicalCase?.historyOfPresentIllness.html)) ||
      (medicalCase?.familyAndSocialHistory && !checkEmptyRichText(medicalCase?.familyAndSocialHistory.html)) ||
      (medicalCase?.physicalExaminationNotes && !checkEmptyRichText(medicalCase?.physicalExaminationNotes.html))
    )
  }

  const hasOrders = () => {
    return (
      medicalCase?.medicationSelection?.length || medicalCase?.nonMedicationOrder?.length || medicalCase?.order?.length
    )
  }

  const hasTests = () => {
    return medicalCase?.tests?.length && medicalCase?.tests?.length > 0
  }
  const hasPatientInterview = () => {
    return medicalCase?.videoUrl && medicalCase?.videoUrl.length > 0
  }

  const hasDiagnoses = () => {
    return medicalCase?.diagnose && medicalCase?.diagnose.length > 0
  }

  const hasCaseReview = () => {
    return (
      (medicalCase?.closingRemarks && !checkEmptyRichText(medicalCase?.closingRemarks.html)) ||
      (medicalCase?.literatureReview && !checkEmptyRichText(medicalCase?.literatureReview.html)) ||
      (medicalCase?.references && !checkEmptyRichText(medicalCase?.references.html))
    )
  }

  const baseSteps = [
    { component: <Introduction key="Introduction" />, key: 'Introduction', isStep: hasIntroduction() },
    { component: <PatientInterview key="PatientInterview" />, key: 'Consultation', isStep: hasPatientInterview() },
    {
      component: (
        <Tests
          setDisabledNext={setDisabledNext}
          key="Tests"
        />
      ),
      key: 'Tests',
      isStep: hasTests(),
    },
    {
      component: (
        <Diagnoses
          setDisabledNext={setDisabledNext}
          key="Diagnoses"
        />
      ),
      key: 'Diagnoses',
      isStep: hasDiagnoses(),
    },
    {
      component: (
        <Orders
          setDisabledNext={setDisabledNext}
          key="Orders"
        />
      ),
      key: 'Treatment',
      isStep: hasOrders(),
    },
    { component: <DecisionReview key="DecisionReview" />, key: 'Decisions', isStep: true },
    {
      component: (
        <CaseReview
          setDiagnosisUrl={setDiagnosisUrl}
          key="CaseReview"
        />
      ),
      key: 'Summary',
      isStep: hasCaseReview(),
    },
    ,
  ]

  const filteredSteps = baseSteps.filter((step) => step?.isStep)
  const filteredComponents = filteredSteps.map((step) => step?.component)
  const filteredTitles = filteredSteps.map((step) => step?.key)

  if (medicalCase?.quizStepPosition != null) {
    // Check for null or undefined
    const quizStepPosition = medicalCase?.quizStepPosition
    allSteps = [
      ...filteredComponents.slice(0, quizStepPosition - 1),
      <Quiz
        key="Quiz"
        data={medicalCase?.quizHtml?.html}
      />,
      ...filteredComponents.slice(quizStepPosition - 1),
    ]
  } else {
    allSteps = filteredComponents
  }

  useEffect(() => {
    if (medicalCase) {
      setMedicalCase(medicalCase)
    }

    if (patientCase) {
      setPatientCase(patientCase)
    }

    setMedicalCaseId(medicalCaseId)
    setBookmark(bookmark)
    setLikes(likes)
  }, [
    medicalCase,
    patientCase,
    medicalCaseId,
    bookmark,
    likes,
    setMedicalCaseId,
    setBookmark,
    setLikes,
    setMedicalCase,
    setPatientCase,
  ])

  const [currentStep, setCurrentStep] = useState(0)
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()
  const isOrdersStep = currentStep === 4
  const hasConfirmed = currentStep > 4

  function nextStep() {
    if (currentStep === allSteps.length - 1) {
      if (diagnosisUrl && diagnosisUrl.length > 0) {
        router.push(diagnosisUrl)
      }
      return
    }

    if (isOrdersStep) {
      // Show alert and don't go to the next step.
      onConfirmationToggle()
      return
    }

    setCurrentStep(currentStep + 1)
  }

  const disableBack = hasConfirmed && currentStep <= 5

  function prevStep() {
    if (currentStep === 0) {
      return
    }

    // Should not be able to back after confirmation, but should be able to back from case review.
    if (disableBack) {
      return
    }

    setCurrentStep(currentStep - 1)
  }

  const onConfirmationContinue = () => {
    onConfirmationToggle()
    setCurrentStep(currentStep + 1)
  }

  const progress = (currentStep / allSteps.length) * 100

  if (!medicalCase || !patientCase) {
    return <div>Medical case not found</div>
  }

  const prescribingInformation = medicalCase.prescribingInformation

  return (
    <section className="flex flex-col px-4">
      <div
        className={`grid grid-rows-1 lg:grid-cols-3 gap-4 lg:gap-6 w-full h-full mt-8 ${
          medicalCase === null ? 'block lg:hidden' : ''
        }`}
      >
        <PatientCaseCard
          isOpen={isPatientCardOpen}
          setIsOpen={setPatientCardOpen}
        />
        {medicalCase === null && (
          <div className="visible lg:hidden">
            <Button onClick={() => setPatientCardOpen(true)}>Patient Details</Button>
          </div>
        )}
        <div className="flex flex-col-reverse md:flex-col w-full col-span-2 h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)]">
          {' '}
          {/* Ensures it takes the full height of the viewport */}
          {/* TODO: Ads */}
          {/*<AdBanner />*/}
          <StepCard
            currentStep={currentStep}
            allSteps={allSteps}
          />
          <FormStepsAndProgress
            progress={progress}
            nextStep={nextStep}
            prevStep={prevStep}
            currentStep={currentStep}
            disabledBack={disableBack}
            disabledNext={disabledNext}
            stepTitles={filteredTitles}
          />
        </div>
      </div>

      {/* This is the warning dialog that shows before going to decision review */}
      <GenericDialog
        open={isConfirmationOpen}
        onOpenChange={onConfirmationToggle}
        title={<DialogTitle title="Before you proceed" />}
        icon={null}
        content={
          <div>
            <p>Would you like to make any adjustments to your decisions?</p>
            <div className="flex flex-row gap-4 items-center w-full mt-4">
              <Button
                variant="primary"
                onClick={onConfirmationToggle}
                className="p-6 flex-1"
              >
                Add Orders
              </Button>
              <Button
                variant="outline"
                onClick={onConfirmationContinue}
                className="p-6 flex-1"
              >
                Proceed
              </Button>
            </div>
          </div>
        }
      />
      <AlarmDirtyForm isFormDirty={isFormDirty} />
    </section>
  )
}

const StepCard = ({ currentStep, allSteps }: { currentStep: number; allSteps: ReactElement[] }) => (
  <Card className="col-span-2 w-full flex-grow flex flex-col overflow-y-scroll bg-white border-none rounded-xl p-4 lg:p-8">
    {allSteps[currentStep]}
  </Card>
)

// TODO: What to do with banner when responsive?
const AdBanner = () => {
  return <div className="w-full h-40 bg-[#E8ECFE] rounded-md mb-4 flex-shrink-0"></div>
}
