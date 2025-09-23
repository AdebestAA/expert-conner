"use client";

import Button from '@/components/general/Button';
import { PastTest } from '@/interface'
import React from 'react';
import { GenericDialog } from '@/components/custom/GenericDialog'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { RenderHTML } from '@/components/RenderHTML'
import dayjs from 'dayjs'
import { calculateDate } from '@/lib/utils'

interface Props {
  item: PastTest
}

const PastTestsTableRow = ({ item }: Props) => {
  const { isOpen, onToggle } = useDisclose()
  const htmlString = item.findingsText.html

  return (
    <>
      <tr key={item.startDate} className="mb-2 rounded-lg shadow-sm">
        <td className="w-2/5 py-4 px-6 text-textGray rounded-l-lg bg-white">
          <p className="text-gray-800 font-medium opacity-50">{calculateDate(item.startDate)}</p>
        </td>
        <td className="w-1/2 py-4 px-6 text-gray-800 bg-white">
          <p className="font-medium">{item.name}</p>
        </td>
        <td className="w-1/4 py-4 px-6 text-right bg-white rounded-r-lg">
          <Button onClick={onToggle}>
            View
          </Button>
        </td>
      </tr>

      {/* Dialog for showing details */}
      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={"Findings"}
        content={<RenderHTML htmlString={htmlString} />}
      />
    </>
  );
};

export default PastTestsTableRow;
