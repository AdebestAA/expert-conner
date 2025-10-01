import getMedicalCaseById from '@/lib/hygraph/getMedicalCaseById'
import React, { FC } from 'react'
import getPatientById from '@/lib/hygraph/getPatientById'
import { SimulationPageWrapper } from '@/components/simulation-page-wrapper'
import { getBookmarkByCaseIdAction } from '@/lib/data/repository/bookmarks'
import { getLikesByMedicalCaseId } from '@/lib/data/repository/likes'
import { cookies } from 'next/headers'
import languageTexts from '@/lib/utils/language'

interface Props {
  params: {
    id: string;
  }
}
async function Page({searchParams, params}: {  searchParams: Promise<{password: string, email: string }>, params: Promise<{ id: string}>})
{  
  const { id } = await params
  const { email, password } = await searchParams; 

const lang = cookies().get("language")?.value as "en" | "fr" | "de"| undefined

  const medicalCase = await getMedicalCaseById(id, {email, password})
  // console.log(medicalCase);
  
  if (!medicalCase) {
    return <div>{languageTexts(lang).casesDynamicPage.medicalCaseNotFound}</div>
  }

  const patientId = medicalCase?.patient?.id
  if (!patientId) {
    return (
      <div className="flex items-center justify-center">
        <h3>{languageTexts(lang).casesDynamicPage.forgotToAddPatient}</h3>
      </div>
    )
  }

  const patientCase = medicalCase?.patient || null;
  if (!patientCase) {
    return <div className="min-h-screen">{languageTexts(lang).casesDynamicPage.patientCaseNotFound}</div>
  }

  const { data: bookmark, error } = await getBookmarkByCaseIdAction(id)

  if (error) {
    return <div className="min-h-screen">{languageTexts(lang).casesDynamicPage.somethingWentWrong}</div>
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
