import React, { forwardRef } from 'react'
import { MedicalCase } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { Accordion } from '@/components/Accordion'

export const CaseDescription = forwardRef<HTMLDivElement, { medicalCase: MedicalCase }>(({ medicalCase }, ref) => {
  return (
    <div ref={ref}>
      <Accordion title="Case Description">
        <div className="richtext">
          <RenderHTML htmlString={medicalCase?.caseDescription?.html!} />
        </div>
      </Accordion>
    </div>
  )
})

CaseDescription.displayName = 'CaseDescription'
