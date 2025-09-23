import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { NonMedicationOrder } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { GuidanceIcon, GuidanceTitle } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'
import { H2, Label } from '@/components/Title'

type AddNonMedicationOrdersProps = {
  nonMedicationOrderData?: NonMedicationOrder[]
  setDisabledNext: (state: boolean) => void
}

type ExtendedOrder = NonMedicationOrder & { showGuidance?: boolean }

export const AddNonMedicationOrders = ({ nonMedicationOrderData, setDisabledNext }: AddNonMedicationOrdersProps) => {
  const [currentSelectedOrder, setCurrentSelectedOrder] = React.useState<NonMedicationOrder | null>(null)
  const [orders, setOrders] = React.useState<ExtendedOrder[]>(nonMedicationOrderData as ExtendedOrder[])
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview, removeItemFromReview } = useCaseContext()

  // Check if any non-medication order requires guidance and update the "Next" button state
  useEffect(() => {
    const anyRequiresGuidance = orders?.some(order => order?.showGuidance && !order?.guidance)
    setDisabledNext(anyRequiresGuidance)
  }, [orders, setDisabledNext])

  function handleIconClick(order: NonMedicationOrder) {
    setCurrentSelectedOrder(order)
    onToggle()
  }

  function handleOrderButtonClick(order: ExtendedOrder) {
    setCurrentSelectedOrder(order)

    const currentOrders = orders.map((o) => {
      if (o.name === order.name) {
        return { ...o, showGuidance: !order.showGuidance }
      }
      return o
    })

    setOrders(currentOrders)

    if (order?.showGuidance) {
      removeItemFromReview(order, 'nonMedicationOrder')
    } else {
      updateItemToReview(order, 'nonMedicationOrder')
    }

    if (!order?.showGuidance) {
      onToggle()
    }
  }

  return (
    <div className="mt-8">
      <H2 title="Add Non-Medication Orders" />
      <Label title="Select appropriate additional orders for the patient." />

      <ul>
        {orders?.map((order) => (
          <li key={order.name} className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-textGray opacity-50 text-xs uppercase">{order.category}</span>
                <span className="font-medium text-black text-md">{order.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleOrderButtonClick(order)}
                >
                  {order.showGuidance ? 'Remove' : 'Add'}
                </Button>

                {order.showGuidance && (
                  <div onClick={() => handleIconClick(order)} className="hover:cursor-pointer">
                    <GuidanceIcon guidance={order.guidance} />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={<GuidanceTitle guidance={currentSelectedOrder?.guidance} />}
        icon={<GuidanceIcon guidance={currentSelectedOrder?.guidance} />}
        content={<RenderHTML htmlString={currentSelectedOrder?.actionText[0]?.text.html} />} />
    </div>
  )
}