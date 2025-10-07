'use client'

import React, { useEffect, useState } from 'react';
import { Diagnose } from '@/interface';
import { formatDate } from '@/lib/utils'
import { calculateDate } from '@/lib/utils'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

type PastDiagnosesListProps = {
  pastDiagnoses?: Diagnose[];
};

const PastDiagnosesList = ({ pastDiagnoses }: PastDiagnosesListProps) => {
      const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined

    const [isMounted,setIsMounted] = useState<boolean>(false)
    useEffect(()=>{
        setIsMounted(true)
          },[])
  
  return (
    <div className="mt-4 space-y-2">
      {(!pastDiagnoses || pastDiagnoses?.length === 0) && (
        <div className="text-sm text-textGray">{isMounted && languageTexts(lang).noPastDiagnoses}</div>
      )}
      {pastDiagnoses?.map((item, index) => (
        <PastDiagnosesCard key={index} item={item} />
      ))}
    </div>
  );
};


const PastDiagnosesCard = ({ item }: { item: Diagnose }) => {
  const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined

  const [isMounted,setIsMounted] = useState<boolean>(false)
  useEffect(()=>{
      setIsMounted(true)
        },[])

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm  mb-4">
      <p className="text-gray-900 font-semibold text-lg mb-2">{item.name}</p>

      <div className="flex justify-between text-sm text-textGray">
        {isMounted && <p>{`${languageTexts(lang).since}: ${calculateDate(item.startDate)}`}</p>}
        {isMounted && <p>{`${languageTexts(lang).till}: ${item.endDate <= 0 ? calculateDate(item.endDate) : languageTexts(lang).ongoing}`}</p>}
      </div>
    </div>
  );
};

export default PastDiagnosesList;
