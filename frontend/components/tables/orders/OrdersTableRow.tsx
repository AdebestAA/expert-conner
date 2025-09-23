'use client'

import { Order, NonMedicationOrder, MedicationSelection } from '@/interface'
import React from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { RenderHTML } from '@/components/RenderHTML'
import { calculateDate } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
type CombinedOrder = Order | NonMedicationOrder | MedicationSelection;

interface Props {
  item: CombinedOrder;
}

  // Type guard to check if item is of type Order
  const isOrder = (order: CombinedOrder): order is Order => {
    return 'startDate' in order && 'endDate' in order;
  }

const OrdersTableRow = ({ item }: Props) => {
  const { isOpen, onToggle } = useDisclose()

  const htmlString = item.actionText[0]?.text.html
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(today);

  return (
    <>
      <tr className="cursor-pointer" onClick={onToggle}>
        {/* Name Column */}
        <td className="w-1/3 py-3  text-sm">
          <p className=" text-black">{item.name}</p>
        </td>

        {/* Start Date Column */}
        <td className="w-1/3 py-3 text-sm">
          {isOrder(item) ? (
            <p className="text-black">{calculateDate(item.startDate)}</p>
          ) : (
            <p className="text-black">{formattedDate}</p>
          )}
        </td>

        {/* End Date Column with Arrow Icon at the end */}
        <td className="w-1/3 py-3 text-sm">
          {isOrder(item) ? (
            <p className="text-black">
              {item.endDate <= 0 ? calculateDate(item.endDate) : 'Ongoing'}
            </p>
          ) : (
            <p className="text-black">Ongoing</p>
          )}
        </td>

        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </td>
      </tr>

      {isOpen && (
        <tr>

          {/* Expandable Content Row */}   <td colSpan={3}>
            <div className="px-4 py-2 bg-white rounded-lg">
              <RenderHTML htmlString={htmlString} className="text-sm " />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default OrdersTableRow
