import React, { forwardRef } from 'react'
import { Order, NonMedicationOrder, MedicationSelection } from '@/interface'
import { Accordion } from '@/components/Accordion'
import OrdersTable from '@/components/tables/orders/OrdersTable'
type CombinedOrder = Order | NonMedicationOrder | MedicationSelection;


export const PastOrders = forwardRef<HTMLDivElement, { orders: CombinedOrder[] }>(
  ({ orders }, ref) => {
    return (
      <div ref={ref}>
        {orders && orders.length > 0 && 
        <>
          <Accordion title="Past Orders">
            <OrdersTable orders={orders} type={'past'}  />
          </Accordion>
        </>}
        
      </div>
    )
  },
)

PastOrders.displayName = 'PastOrders'
