import React, { forwardRef } from 'react'
import { Order, NonMedicationOrder, MedicationSelection } from '@/interface'
import { Accordion } from '@/components/Accordion'
import OrdersTable from '@/components/tables/orders/OrdersTable'
type CombinedOrder = Order | NonMedicationOrder | MedicationSelection;


export const NewOrders = forwardRef<HTMLDivElement, { orders: CombinedOrder[] }>(
  ({ orders }, ref) => {
    return (
      <div ref={ref}>
        <Accordion title="New Orders">
          <OrdersTable orders={orders} type={'new'} />
        </Accordion>
      </div>
    )
  },
)

NewOrders.displayName = 'NewOrders'
