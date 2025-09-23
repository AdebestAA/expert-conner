import { Asterisk, Check, CheckCheck } from 'lucide-react'
import React from 'react'
import { IonAlert } from '@/components/icons/ion_alert'

export const GuidanceTitle = ({ guidance }: { guidance?: boolean }) => (
  <div className="flex items-center">
    <p className="ml-2">{guidance ? 'This is consistent with the guidance' : 'This is inconsistent with the guidance'}</p>
  </div>
)

export const GuidanceIcon = ({ guidance, clickEvent }: { guidance?: boolean, clickEvent?: any }) => (
<div onClick={clickEvent ? clickEvent : undefined} className="flex items-center">
      {guidance ? <CheckIcon /> : <AsteriskIcon />}
  </div>
)

export const GuidanceTitleStrings = ({ guidanceType }: { guidanceType?: string }) => (
  <div className="flex items-center">
    <p className="ml-2">
      {guidanceType === 'correct' ? 'This is consistent with the guidance' :
      guidanceType === 'incorrect' ? 'This is inconsistent with the guidance' :
      guidanceType === 'partiallyCorrect' ? 'This is less optimal according to the guidance' : ''}
    </p>
  </div>
)

export const GuidanceIconStrings = ({ guidanceType, clickEvent }: { guidanceType?: string, clickEvent?: any }) => (
  <div onClick={clickEvent ? clickEvent : undefined} className="flex items-center">
        {guidanceType === 'correct' ? <CheckCheckIcon /> : guidanceType === 'incorrect' ? <AsteriskIcon /> : <PartiallyCorrectIcon />}
    </div>
  )

const CheckIcon = () => <Check className="text-green bg-greenBg rounded-full p-0.5 cursor-pointer" />
const AsteriskIcon = () => <IonAlert className="text-red bg-redBg rounded-full p-0.5 cursor-pointer" />
const PartiallyCorrectIcon = () => <Check className="text-orange-500 bg-orange-100 rounded-full p-0.5 cursor-pointer" />
const CheckCheckIcon = () => <CheckCheck className="text-green bg-greenBg rounded-full p-0.5 cursor-pointer" />
