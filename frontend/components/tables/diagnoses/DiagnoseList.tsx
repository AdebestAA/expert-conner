import React, { useEffect, useState } from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { RenderHTML } from '@/components/RenderHTML'
import { GuidanceIcon, GuidanceTitle } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'

type DiagnoseListProps = {
  newDiagnoses: {
    name: string
    guidanceText: {
      html: any
    }
    startDate: number
    endDate: number
    guidance: boolean
    isExisting: boolean
    showGuidance?: boolean
  }[]
  setDisabledNext: (state: boolean) => void
}

export const DiagnoseList = ({ newDiagnoses, setDisabledNext }: DiagnoseListProps) => {
  const [diagnoseHtmlText, setDiagnoseHtmlText] = useState<string>('')
  const [currentSelectedDiagnose, setCurrentSelectedDiagnose] = useState<any>(null)
  const [newDiagnosesState, setNewDiagnosesState] = useState(newDiagnoses)
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview, removeItemFromReview } = useCaseContext()

  useEffect(() => {
    const shouldDisableNext = newDiagnosesState.some((diagnose) => diagnose.showGuidance && !diagnose.guidance)
    setDisabledNext(shouldDisableNext)
  }, [newDiagnosesState, setDisabledNext])

  const handleAddDiagnoseClick = (nD: any) => {
    setDiagnoseHtmlText(nD.guidanceText.html)
    setCurrentSelectedDiagnose(nD)

    const currentDiagnoses = newDiagnosesState.map((o) => {
      if (o.name === nD.name) {
        return { ...o, showGuidance: true }
      }
      return o
    })

    setNewDiagnosesState(currentDiagnoses)
    updateItemToReview(nD, 'diagnose')
    onToggle()
  }

  const handleRemoveDiagnoseClick = (nD: any) => {
    const updatedDiagnoses = newDiagnosesState.map((o) => {
      if (o.name === nD.name) {
        return { ...o, showGuidance: false, isExisting: false }
      }
      return o
    })

    setNewDiagnosesState(updatedDiagnoses)
    removeItemFromReview(nD, 'diagnose')
  }

  return (
    <>
      <ul>
        {newDiagnosesState.map((nD, index) => {
          return (
            <li
              key={index}
              className="flex justify-between gap-2 items-center rounded-xl px-4 py-3 mb-3 bg-white"
            >
              {(nD.showGuidance || (nD.guidance && nD.isExisting)) && (
                <div className="font-medium">
                  <div
                    onClick={onToggle}
                    className="cursor-pointer p-1"
                  >
                    <GuidanceIcon guidance={nD.guidance} />
                  </div>
                </div>
              )}
              <div className="font-medium w-2/3">{nD.name}</div>
              <div className="flex flex-row gap-6 items-center">
                {nD.showGuidance || (nD.guidance && nD.isExisting) ? (
                  <Button
                    className="ml-auto"
                    variant="outline"
                    onClick={() => handleRemoveDiagnoseClick(nD)}
                  >
                    Remove <FiMinus className="text-textPrimary text-lg ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="ml-auto"
                    variant="outline"
                    onClick={() => handleAddDiagnoseClick(nD)}
                  >
                    Add <FiPlus className="text-textPrimary text-lg ml-2" />
                  </Button>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={<GuidanceTitle guidance={currentSelectedDiagnose?.guidance} />}
        icon={<GuidanceIcon guidance={currentSelectedDiagnose?.guidance} />}
        content={<RenderHTML htmlString={diagnoseHtmlText} />}
        showButton
      />
    </>
  )
}
