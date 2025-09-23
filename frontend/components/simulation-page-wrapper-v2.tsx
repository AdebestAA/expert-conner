'use client'

import { MedicalCaseV2, PatientCase } from '@/interface'
import { Tables } from '@/lib/types/database.types'
import { SimulationPageV2 } from './simulation-page-v2'

type SimulationPageWrapperV2Props = {
  medicalCaseV2: MedicalCaseV2 | null
  patientCase: PatientCase | null
  medicalCaseV2Id: string
  bookmark: Tables<'bookmarks'>
  likes: Tables<'likes'>
}

export const SimulationPageWrapperV2 = ({
  medicalCaseV2,
  patientCase,
  medicalCaseV2Id,
  bookmark,
  likes,
}: SimulationPageWrapperV2Props) => (
  <SimulationPageV2
    medicalCaseV2={medicalCaseV2}
    patientCase={patientCase}
    medicalCaseV2Id={medicalCaseV2Id}
    bookmark={bookmark as any}
    likes={likes as any}
  />
)
