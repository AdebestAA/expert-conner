'use client'

import React from 'react';
import { Order, NonMedicationOrder, MedicationSelection } from '@/interface';
import OrdersTableRow from './OrdersTableRow';
type CombinedOrder = Order | NonMedicationOrder | MedicationSelection;

type OrdersTableProps = {
  orders?: CombinedOrder[];
  type?: string;
};

const OrdersTable = ({ orders, type }: OrdersTableProps) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
            <tr>
              <th className="w-1/3 py-3 text-left text-xs font-semibold text-textGray opacity-50 uppercase tracking-wider">
                Name
              </th>
              <th className="w-1/3 py-3 text-left text-xs font-semibold text-textGray opacity-50  uppercase tracking-wider">
                Start Date
              </th>
              <th className="w-1/3 py-3 text-left text-xs font-semibold text-textGray opacity-50  uppercase tracking-wider">
                End Date
              </th>
            </tr>
            </thead>
            <tbody>
            {orders?.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-sm text-gray-500">
                  { type !== 'past' ? 'No new orders' : 'No past Orders'}
                </td>
              </tr>
            )}
            {orders?.map((item) => (
              <OrdersTableRow key={item.name} item={item} />
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
