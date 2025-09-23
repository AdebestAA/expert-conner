import React, { forwardRef } from 'react'
import { Diagnose } from '@/interface'
import { Accordion } from '@/components/Accordion'
import PastDiagnosesList from '@/components/tables/diagnoses/PastDiagnosesTable'


export const Diagnoses = forwardRef<HTMLDivElement, { pastDiagnoses: Diagnose[] }>(
  ({ pastDiagnoses }, ref) => {
    return (
      <div ref={ref}>
        <Accordion title="Diagnoses">
          <PastDiagnosesList pastDiagnoses={pastDiagnoses} />
        </Accordion>
      </div>
    )
  },
)

Diagnoses.displayName = 'Diagnoses'
