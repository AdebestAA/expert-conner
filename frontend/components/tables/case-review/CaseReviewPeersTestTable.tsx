import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React from 'react'
import { Progress } from '@/components/ui/progress'

const CASE_REVIEW_PEERS_TEST_DATA = [
  {
    item: 'Glycated Hemoglobin (HbA1C)',
    percentage: 87
  },
  {
    item: 'Lipids',
    percentage: 92
  },
  {
    item: 'Electrocardiogram (ECG)',
    percentage: 78
  },
  {
    item: 'Serum Creatinine',
    percentage: 82
  },
  {
    item: 'Complete Blood Count (CBC)',
    percentage: 90

  }
]

export const CaseReviewPeersTestTable = () => {
  return (
    <>
      <h3>Tests</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>% OF PEERS CHOSE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {CASE_REVIEW_PEERS_TEST_DATA.map((peersSelection) => (
          <TableRow key={peersSelection.item}>
            <TableCell className="font-medium w-3/5">{peersSelection.item}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <Progress value={peersSelection.percentage} />
                <p>{peersSelection.percentage}%</p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>

  )
};
