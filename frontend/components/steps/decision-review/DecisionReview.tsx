import React from 'react'
import { DecisionsToConsiderTable } from '@/components/tables/decisions/DecisionsToConsiderTable'
import { DecisionsReviewedTable } from '@/components/tables/decisions/DecisionsReviewedTable'
import { useCaseContext } from '@/lib/context/caseContext'
import { H2, Label, Title } from '@/components/Title'

export const DecisionReview = () => {
  const { medicalCase } = useCaseContext()

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
      <Title title={'Decision Review'} />
      <Label title="Click icons to review your decisions" />
      <DecisionsToConsiderTable decisionsToConsider={decisionsToConsider} />

      <div className="mt-12">
        <H2 title="Reviewed Decisions" />
        <DecisionsReviewedTable reviewedDecisions={reviewedDecisions} />
      </div>
    </div>
  )
}
