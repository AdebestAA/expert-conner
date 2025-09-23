import getMedicalCaseById from '@/lib/hygraph/getMedicalCaseById'
import React, { FC } from 'react'
import getPatientById from '@/lib/hygraph/getPatientById'
import { SimulationPageWrapper } from '@/components/simulation-page-wrapper'
import { getBookmarkByCaseIdAction } from '@/lib/data/repository/bookmarks'
import { getLikesByMedicalCaseId } from '@/lib/data/repository/likes'

interface Props {
  params: {
    id: string;
  }
}
async function Page({searchParams, params}: {  searchParams: Promise<{password: string, email: string }>, params: Promise<{ id: string}>})
{  
  const { id } = await params
  const { email, password } = await searchParams; 

  const medicalCase = await getMedicalCaseById(id, {email, password})
  if (!medicalCase) {
    return <div>Medical case not found</div>
  }

  const patientId = medicalCase?.patient?.id
  if (!patientId) {
    return (
      <div className="flex items-center justify-center">
        <h3>Woops - seems like you&apos;ve forgot to add a patient, please do so in Hygraph (The CMS).</h3>
      </div>
    )
  }

  const patientCase = medicalCase?.patient || null;
  if (!patientCase) {
    return <div className="min-h-screen">Patient case not found</div>
  }

  const { data: bookmark, error } = await getBookmarkByCaseIdAction(id)

  if (error) {
    return <div className="min-h-screen">Something went wrong, please try again or contact support.</div>
  }

  const { data: likes } = await getLikesByMedicalCaseId(id)

  return <SimulationPageWrapper
    medicalCase={medicalCase}
    patientCase={patientCase}
    medicalCaseId={id}
    bookmark={bookmark as any}
    likes={likes as any}
  />
}

export default Page
