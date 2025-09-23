import React, { forwardRef } from 'react'
import { PastTest } from '@/interface'
import PastTestsTable from '@/components/tables/tests/PastTestsTable'
import { Accordion } from '@/components/Accordion'

export const LabsImaging = forwardRef<HTMLDivElement, { pastTests: PastTest[] }>(
  ({ pastTests }, ref) => {
    return (
      <div ref={ref}>
        <Accordion title="Labs/Imaging">
          <PastTestsTable pastTests={pastTests} />
        </Accordion>
      </div>
    )
  },
)

LabsImaging.displayName = 'LabsImaging'
