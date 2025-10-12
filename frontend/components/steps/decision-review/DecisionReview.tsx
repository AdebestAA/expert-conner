import React, { useEffect, useState } from 'react'
import { DecisionsToConsiderTable } from '@/components/tables/decisions/DecisionsToConsiderTable'
import { DecisionsReviewedTable } from '@/components/tables/decisions/DecisionsReviewedTable'
import { useCaseContext } from '@/lib/context/caseContext'
import { H2, Label, Title } from '@/components/Title'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const DecisionReview = () => {
  const { medicalCase } = useCaseContext()
  const [isMounted,setIsMounted] = useState<boolean>(false)

  
  const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined
  
 
  
    useEffect(()=>{
      setIsMounted(true)
        },[])

  const testsDecision = medicalCase?.tests?.map((test) => {
    return {
      ...test,
      type: 'Tests',
    }
  })

  const diagnosesDecision = medicalCase?.diagnose?.map((diagnose) => {
    return {
      ...diagnose,
      type: 'Diagnoses',
    }
  })

  const orderDecisions = medicalCase?.order?.map((order) => {
    return {
      ...order,
      type: 'Orders',
    }
  })

  const nonMedicationOrderDecisions = medicalCase?.nonMedicationOrder?.map((order) => {
    return {
      ...order,
      type: 'Other Orders',
    }
  })

  const medicationSelectionDecisions = medicalCase?.medicationSelection?.map((order) => {
    return {
      ...order,
      type: 'Other Orders',
    }
  })

  const allDecisions = [
    ...(testsDecision || []),
    ...(diagnosesDecision || []),
    ...(orderDecisions || []),
    ...(nonMedicationOrderDecisions || []),
    ...(medicationSelectionDecisions || []),
  ]

  const decisionsToConsider = allDecisions.filter((decision: any) => !decision.reviewed)
  const reviewedDecisions = allDecisions.filter((decision: any) => decision.reviewed)

  return (
    <div>
      <Title title={isMounted ? languageTexts(lang).decisionReview : "Decisions Review"} />
      <Label title={isMounted ? languageTexts(lang).clickIcons : "Click icons to review your decisions"} />
      <DecisionsToConsiderTable decisionsToConsider={decisionsToConsider} />

      <div className="mt-12">
        <H2 title={isMounted ? languageTexts(lang).reviewedDecisions : "Reviewed Decisions"} />
        <DecisionsReviewedTable reviewedDecisions={reviewedDecisions} />
      </div>
    </div>
  )
}
