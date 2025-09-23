import React, { forwardRef } from 'react'
import { PastVisit } from '@/interface'
import PastVisitsTable from '@/components/tables/visits/PastVisitsTable'
import { Accordion } from '@/components/Accordion'

export const PastVisits = forwardRef<HTMLDivElement, { pastVisits: PastVisit[] }>(
  ({ pastVisits }, ref) => {
    return (
      <div ref={ref}>
        <Accordion title="Past Visits">
          <PastVisitsTable pastVisits={pastVisits} />
        </Accordion>
      </div>
    )
  },
)

PastVisits.displayName = 'PastVisits'
