import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import { H2, Title } from '@/components/Title'
import { calculateDate } from '@/lib/utils'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

type OldDiagnoseTableProps = {
  exisitingDiagnoses: {
    name: string;
    startDate: number;
    endDate: number;
  }[]
}
export const OldDiagnosesTable = ({ exisitingDiagnoses }: OldDiagnoseTableProps) => {
  

  const [isMounted,setIsMounted] = useState<boolean>(false)

  
  const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined
  
  
  
    useEffect(()=>{
      setIsMounted(true)
        },[])

  
  return (
    <>
      <H2 title="Existing Diagnoses" />
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/4 uppercase">{isMounted && languageTexts(lang).name}</TableHead>
            <TableHead className='uppercase'>{isMounted && languageTexts(lang).startDate}</TableHead>
            <TableHead className='uppercase'>{isMounted && languageTexts(lang).endDate}</TableHead>
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
