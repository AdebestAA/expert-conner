import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { formatDate } from '@/lib/utils'
import { H2, Title } from '@/components/Title'
import { calculateDate } from '@/lib/utils'

type OldDiagnoseTableProps = {
  exisitingDiagnoses: {
    name: string;
    startDate: number;
    endDate: number;
  }[]
}
export const OldDiagnosesTable = ({ exisitingDiagnoses }: OldDiagnoseTableProps) => {
  return (
    <>
      <H2 title="Existing Diagnoses" />
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/4">NAME</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exisitingDiagnoses.map((diagnose, index) => (
            <TableRow key={index}>
              <TableCell>{diagnose.name}</TableCell>
              <TableCell>{calculateDate(diagnose.startDate)}</TableCell>
              <TableCell>{diagnose.endDate <= 0 ? calculateDate(diagnose.endDate) : 'Ongoing'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

  )
}
