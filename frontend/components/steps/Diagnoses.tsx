import React from 'react'
import { useCaseContext } from '@/lib/context/caseContext'
import { NewDiagnosesTable } from '@/components/tables/diagnoses/NewDiagnosesTable'
import { OldDiagnosesTable } from '@/components/tables/diagnoses/OldDiagnosesTable'
import { Label, Title } from '@/components/Title'

const Diagnoses = ({ setDisabledNext }: { setDisabledNext: (state: boolean) => void }) => {
  const { medicalCase } = useCaseContext()
  const diagnoses = medicalCase?.diagnose
  const exisitingDiagnoses = diagnoses?.filter(diagnose => diagnose.isExisting)
  const newDiagnoses = diagnoses?.filter(diagnose => (!diagnose.isExisting || diagnose.reviewed))
  return (
    <div className="flex flex-col gap-2 mb-8">
      <Title title="Diagnoses" />
      {(newDiagnoses && newDiagnoses?.length > 0 || exisitingDiagnoses?.some(diagnose => diagnose.reviewed)) && (
        <>
          <Label title="Select the best diagnoses." />
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
