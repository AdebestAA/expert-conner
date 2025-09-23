import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { MedicationSelection } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { GuidanceIconStrings, GuidanceTitleStrings } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'
import { H2, Label, MedicationLabel } from '@/components/Title'
import { RationalesDialog } from '@/components/custom/RationalesDialog'

type AddMedicationSelectionProps = {
  medicationSelectionData?: MedicationSelection[]
  setDisabledNext: (state: boolean) => void
  medicationAmount: number
}

type ExtendedOrder = MedicationSelection & { showGuidance?: boolean }

export const AddMedicationSelection = ({
  medicationSelectionData,
  setDisabledNext,
  medicationAmount,
}: AddMedicationSelectionProps) => {
  const [currentMedicationSelection, setCurrentMedicationSelection] = React.useState<MedicationSelection | null>(null)
  const [medications, setMedications] = React.useState<ExtendedOrder[]>(medicationSelectionData as ExtendedOrder[])
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview, removeItemFromReview } = useCaseContext()

  function handleIconClick(medication: ExtendedOrder) {
    setCurrentMedicationSelection(medication)
    onToggle()
  }

  function handleMedicationButtonClick(medication: ExtendedOrder) {
    setCurrentMedicationSelection(medication)

    const currentOrders = medications.map((o) => {
      if (o.name === medication?.name) {
        return { ...o, showGuidance: !medication?.showGuidance }
      }
      return o
    })

    setMedications(currentOrders)

    if (medication?.showGuidance) {
      removeItemFromReview(medication, 'selectedMedication')
    } else {
      updateItemToReview(medication, 'selectedMedication')
    }

    if (!medication?.showGuidance) {
      onToggle()
    }
  }

  return (
    <div className="mt-8">
      <H2 title="Add Medications" />
      <div className="flex justify-end font-bold">
        <MedicationLabel
          title={
            medicationAmount > 0
              ? 'Please select ' +
                medicationAmount +
                (medicationAmount > 1 ? ' medications' : ' medication') +
                ' to proceed to the next page.'
              : "Please don't select any medication to proceed to the next page."
          }
        />
      </div>

      <ul>
        {medications?.map((medication) => (
          <li
            key={medication.name}
            className="border-b border-gray-300 py-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-black text-md">{medication?.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleMedicationButtonClick(medication)}
                >
                  {medication.showGuidance ? 'Remove' : 'Add'}
                </Button>

                {medication.showGuidance && (
                  <div
                    onClick={() => handleIconClick(medication)}
                    className="hover:cursor-pointer"
                  >
                    <GuidanceIconStrings guidanceType={medication.guidanceType} />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <RationalesDialog
        open={isOpen}
        onOpenChange={onToggle}
        isRationale={
          currentMedicationSelection?.guidanceType === 'partiallyCorrect' ||
          currentMedicationSelection?.guidanceType === 'correct'
        }
        rationales={currentMedicationSelection?.rationales}
        title={<GuidanceTitleStrings guidanceType={currentMedicationSelection?.guidanceType} />}
        icon={<GuidanceIconStrings guidanceType={currentMedicationSelection?.guidanceType} />}
        content={<RenderHTML htmlString={currentMedicationSelection?.actionText[0]?.text.html} />}
      />
    </div>
  )
}
