'use client'

import React from 'react';
import { Diagnose } from '@/interface';
import { formatDate } from '@/lib/utils'
import { calculateDate } from '@/lib/utils'


type PastDiagnosesListProps = {
  pastDiagnoses?: Diagnose[];
};

const PastDiagnosesList = ({ pastDiagnoses }: PastDiagnosesListProps) => {
  return (
    <div className="mt-4 space-y-2">
      {(!pastDiagnoses || pastDiagnoses?.length === 0) && (
        <div className="text-sm text-textGray">No past diagnoses</div>
      )}
      {pastDiagnoses?.map((item, index) => (
        <PastDiagnosesCard key={index} item={item} />
      ))}
    </div>
  );
};


const PastDiagnosesCard = ({ item }: { item: Diagnose }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm  mb-4">
      <p className="text-gray-900 font-semibold text-lg mb-2">{item.name}</p>

      <div className="flex justify-between text-sm text-textGray">
        <p>{`Since: ${calculateDate(item.startDate)}`}</p>
        <p>{`Till: ${item.endDate <= 0 ? calculateDate(item.endDate) : 'Ongoing'}`}</p>
      </div>
    </div>
  );
};

export default PastDiagnosesList;
