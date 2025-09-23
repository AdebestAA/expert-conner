import { Button } from '@/components/ui/button'
import React from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { RenderHTML } from '@/components/RenderHTML'
import { ActionFindingTable } from '@/components/tables/ActionFindingTable'
import { ActionResultTable } from '@/components/tables/ActionResultTable'
import { useCaseContext } from '@/lib/context/caseContext'
import { GuidanceIcon, GuidanceTitle } from '@/components/GuidanceTitle'

export function resolveActionTextSelection(item: any): any {
  if (!item) return null

  const components = []

  if (item?.findings?.html) {
    components.push(<RenderHTML htmlString={item?.findings.html} />)
  }

  if (item?.guidanceText?.html) {
    components.push(<RenderHTML htmlString={item?.guidanceText.html} />)
  }

  if (item?.actionText?.length > 0) {
    const text = item?.actionText[0]?.text.html
    components.push(<RenderHTML htmlString={text} />)
  }

  if (item?.actionFinding?.length > 0) {
    components.push(<ActionFindingTable actionFinding={item?.actionFinding} />)
  }

  if (item?.actionResult?.length > 0) {
    components.push(<ActionResultTable actionResult={item?.actionResult} />)
  }

  return components.length > 0 ? components : null
}

export const DecisionsToConsiderTable = ({ decisionsToConsider }: { decisionsToConsider: any[] }) => {
  const [selectedDecision, setSelectedDecision] = React.useState<any>(null)
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview } = useCaseContext()

  function handleDecisionClick(decision: any) {
    setSelectedDecision(decision)
    updateItemToReview(decision)
    onToggle()
  }

  return (
    <>
      <ul>
        {decisionsToConsider.map((decision, index) => (
          <li key={index} className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
              <span className="text-textGray opacity-50 text-xs uppercase">
                {decision.type}
              </span>
                <span className="font-medium">{decision.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => handleDecisionClick(decision)}>
                  Add
                </Button>

                {/* TODO: These should not show, on decisions reviewed?? */}
                {/*                <div className="flex items-center justify-center">
                  <GuidanceIcon guidance={decision.guidance} />
                </div>*/}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={<GuidanceTitle guidance={selectedDecision?.guidance} />}
        icon={<GuidanceIcon guidance={selectedDecision?.guidance} />}
        content={resolveActionTextSelection(selectedDecision)}
      />
    </>
  )
}
