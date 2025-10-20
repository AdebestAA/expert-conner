import React from 'react'
import { FiCheck, FiPlus } from 'react-icons/fi'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { treatment } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { GuidanceIconStrings, GuidanceTitleStrings } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'
import { RationalesDialog } from '@/components/custom/RationalesDialog'
import { Button } from '@/components/ui/button'

type AddCidpTreatmentProps = {
  cidpTreatmentData?: treatment[]
}

type ExtendedOrder = treatment & { showGuidance?: boolean }

export const AddCidpTreatment = ({ cidpTreatmentData = [] }: AddCidpTreatmentProps) => {
  const [currentCidpTreatment, setCurrentCidpTreatment] = React.useState<treatment | null>(null)
  const [medications, setMedications] = React.useState<ExtendedOrder[]>(cidpTreatmentData)
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview, removeItemFromReview } = useCaseContext()

  function handleIconClick(medication: ExtendedOrder) {
    setCurrentCidpTreatment(medication)
    onToggle()
  }

  function handleMedicationButtonClick(medication: ExtendedOrder) {
    const toggledShowGuidance = !medication.showGuidance

    const updated = medications.map((m) =>
      m.name === medication.name ? { ...m, showGuidance: toggledShowGuidance } : m
    )

    setMedications(updated)

    const updatedMed = { ...medication, showGuidance: toggledShowGuidance }

    if (toggledShowGuidance) {
      updateItemToReview(updatedMed, 'selectedMedication')
      setCurrentCidpTreatment(updatedMed)
      onToggle()
    } else {
      removeItemFromReview(updatedMed, 'selectedMedication')
    }
  }

  return (
    <div className="mt-8">
      <ul>
        {medications.map((medication) => {
          const isAdded = medication.showGuidance && medication.guidanceType !== 'wrong'
          const isRemoved = medication.showGuidance && medication.guidanceType === 'wrong'

          return (
            <li
              key={medication.name}
              className={`flex justify-between items-center rounded-xl px-4 py-3 mb-3 bg-white ${
                isAdded ? 'border border-green' : isRemoved ? 'border border-red' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                {medication.showGuidance && (
                  <div
                    onClick={() => handleIconClick(medication)}
                    className="hover:cursor-pointer rounded-full bg-green-50 p-1"
                  >
                    <GuidanceIconStrings guidanceType={medication.guidanceType} />
                  </div>
                )}
                <span className="font-medium text-gray-900 text-md">{medication.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className="ml-auto"
                  onClick={() => handleMedicationButtonClick(medication)}
                  variant={isAdded || isRemoved ? 'default' : 'borderBlueButton'}
                >
                  {isAdded ? (
                    <div className="flex items-center gap-1">
                      Added <FiCheck className="text-green-600 text-md" />
                    </div>
                  ) : isRemoved ? (
                    <div className="flex items-center gap-1">
                      Removed <FiCheck className="text-red-600 text-md" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      Add <FiPlus className="text-blue-600 text-md" />
                    </div>
                  )}
                </Button>
              </div>
            </li>
          )
        })}
      </ul>

      <RationalesDialog
        open={isOpen}
        onOpenChange={onToggle}
        isRationale={
          currentCidpTreatment?.guidanceType === 'partiallyCorrect' || currentCidpTreatment?.guidanceType === 'correct'
        }
        rationales={currentCidpTreatment?.rationales}
        title={<GuidanceTitleStrings guidanceType={currentCidpTreatment?.guidanceType} />}
        icon={<GuidanceIconStrings guidanceType={currentCidpTreatment?.guidanceType} />}
        content={<RenderHTML htmlString={currentCidpTreatment?.actionText?.[0]?.text?.html ?? ''} />}
      />
    </div>
  )
}
