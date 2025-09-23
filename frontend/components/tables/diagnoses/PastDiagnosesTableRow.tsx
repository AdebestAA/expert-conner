'use client'
import React from 'react'
import { Diagnose } from '@/interface'
import dayjs from 'dayjs'
import { calculateDate } from '@/lib/utils'

interface Props {
  item: Diagnose
}

const PastDiagnosesTableRow = ({ item }: Props) => {

  return (
    <>
      <tr>
        <td className="w-1/3 py-3 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
        </td>
        <td className="w-1/3 py-3 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{calculateDate(item.startDate)}</p>
        </td>
        <td className="w-1/3 py-3 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item.endDate <= 0 ? calculateDate(item.endDate) : 'Ongoing'}</p>
        </td>
      </tr>
    </>
  )
}

export default PastDiagnosesTableRow
