import React, { useEffect, useState } from 'react'
import { useCaseContext } from '@/lib/context/caseContext'
import { NewDiagnosesTable } from '@/components/tables/diagnoses/NewDiagnosesTable'
import { OldDiagnosesTable } from '@/components/tables/diagnoses/OldDiagnosesTable'
import { Label, Title } from '@/components/Title'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

const Diagnoses = ({ setDisabledNext }: { setDisabledNext: (state: boolean) => void }) => {

  const [isMounted,setIsMounted] = useState<boolean>(false)

  
  const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined
  
  
  
    useEffect(()=>{
      setIsMounted(true)
        },[])
  const { medicalCase } = useCaseContext()
  const diagnoses = medicalCase?.diagnose
  const exisitingDiagnoses = diagnoses?.filter(diagnose => diagnose.isExisting)
  const newDiagnoses = diagnoses?.filter(diagnose => (!diagnose.isExisting || diagnose.reviewed))
  return (
    <div className="flex flex-col gap-2 mb-8">
      <Title title={isMounted ? languageTexts(lang).diagnoses : "Diagnoses"} />
      {(newDiagnoses && newDiagnoses?.length > 0 || exisitingDiagnoses?.some(diagnose => diagnose.reviewed)) && (
        <>
          <Label title={isMounted ? languageTexts(lang).selectBestDiagnoses : "Select the best diagnoses."} />
          <NewDiagnosesTable
            setDisabledNext={setDisabledNext}
            newDiagnoses={newDiagnoses as any}
          />
        </>
      )}
      {exisitingDiagnoses && exisitingDiagnoses?.length > 0 && (
        <OldDiagnosesTable exisitingDiagnoses={exisitingDiagnoses as any} />
      )}
    </div>
  )
}


export default Diagnoses
