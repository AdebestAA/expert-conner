import React from 'react'
import PastVisitsTableRow from './PastVisitsTableRow'
import { PastVisit } from '@/interface'

const thClassName = 'py-2 text-left text-xs font-semibold text-textGray opacity-50 uppercase tracking-wide'
const PastVisitsTable = ({ pastVisits }: { pastVisits?: PastVisit[] }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full shadow-sm rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
          <tr>
            <th className={thClassName}>Date</th>
            <th className={thClassName}>RR</th>
            <th className={thClassName}>KG</th>
            <th className={thClassName}>BMI</th>
            <th className="py-2" /> {/* Empty for dropdown icon */}
          </tr>
          </thead>
          <tbody className="text-sm">
          {pastVisits?.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No data
              </td>
            </tr>
          )}
          {pastVisits?.map((item, index) => (
            <PastVisitsTableRow key={index} item={item} />
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PastVisitsTable
