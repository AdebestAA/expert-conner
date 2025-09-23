import Button from '@/components/general/Button'
import React from 'react'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { GuidanceIcon, GuidanceTitle, GuidanceIconStrings, GuidanceTitleStrings } from '@/components/GuidanceTitle'
import { resolveActionTextSelection } from '@/components/tables/decisions/DecisionsToConsiderTable'


export const DecisionsReviewedTable = ({ reviewedDecisions }: { reviewedDecisions: any[] }) => {
  const { isOpen, onToggle } = useDisclose()
  const [selectedReviewedDecision, setSelectedReviewedDecision] = React.useState<any>(null)

  return (
    <>
      <ul>
        {reviewedDecisions.map((decision, index) => (
          <li
            key={index}
            className="border-b border-gray-300 py-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-textGray opacity-50 text-xs uppercase">{decision.type}</span>
                <span className="font-medium">{decision.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  className="bg-white"
                  onClick={() => {
                    setSelectedReviewedDecision(decision)
                    onToggle()
                  }}
                >
                  View
                </Button>

                <div className="flex items-center justify-center">
                  {decision.guidanceType ? (
                    <GuidanceIconStrings guidanceType={decision.guidanceType} />
                  ) : (
                    <GuidanceIcon guidance={decision.guidance} />
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={
          selectedReviewedDecision?.guidanceType ? (
            <GuidanceTitleStrings guidanceType={selectedReviewedDecision?.guidanceType} />
          ) : (
            <GuidanceTitle guidance={selectedReviewedDecision?.guidance} />
          )
        }
        icon={
          selectedReviewedDecision?.guidanceType ? (
            <GuidanceIconStrings guidanceType={selectedReviewedDecision?.guidanceType} />
          ) : (
            <GuidanceIcon guidance={selectedReviewedDecision?.guidance} />
          )
        }
        content={resolveActionTextSelection(selectedReviewedDecision)}
      />
    </>
  )
}
