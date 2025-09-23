'use client'

import React from 'react'
import { PastTest } from '@/interface'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { formatDate } from '@/lib/utils'
import { RenderHTML } from '@/components/RenderHTML'
import { Button } from '@/components/ui/button'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { calculateDate } from '@/lib/utils'

type PastTestsTableProps = {
  pastTests?: PastTest[];
}

const PastTestsTable = ({ pastTests }: PastTestsTableProps) => {
  return (
    <div className="mt-4 space-y-1">
      {(!pastTests || pastTests?.length === 0) && (
        <div className="py-4 text-sm text-gray-500">No previous tests</div>
      )}
      {pastTests?.map((item, index) => (
        <PastTestsCard key={index} item={item} />
      ))}
    </div>
  )
}


const PastTestsCard = ({ item }: { item: PastTest }) => {
  const { isOpen, onToggle } = useDisclose()
  const htmlString = item.findingsText.html

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ">
        {/* Date */}
        <div className="text-gray-500 text-sm w-1/4">
          {calculateDate(item.startDate)}
        </div>

        <div className="text-gray-900 text-sm w-1/2">
          {item.name}
        </div>

        <Button onClick={onToggle} variant="outline">
          View
        </Button>
      </div>

      {/* Dialog for showing details */}
      {isOpen && (
        <GenericDialog
          open={isOpen}
          onOpenChange={onToggle}
          title={'Labs/Imaging'}
          content={
            <RenderHTML htmlString={htmlString} />
          }
        />
      )}
    </>
  )
}

export default PastTestsTable
