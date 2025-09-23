import React, { FC } from 'react'
import { PatientCase } from '@/interface'

interface Props {
  patientCase: PatientCase
}

const PersonalDataTable: FC<Props> = ({ patientCase }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg text-left text-gray-900">
      {/* Age */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">Age</span>
        <span className="font-semibold">
          {patientCase?.age} {patientCase?.showAgeAsMonths ? 'months' : 'years'}
        </span>
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">Gender</span>
        <span className="font-semibold">{patientCase?.gender}</span>
      </div>

      {/* BMI */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">BMI</span>
        <span className="font-semibold">{patientCase?.bmi > 0 ? patientCase?.bmi : ''}</span>
      </div>

      {/* Weight */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">Weight</span>
        <span className="font-semibold">{patientCase?.weight} kg</span>
      </div>

      {/* Height */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">Height</span>
        <span className="font-semibold">{patientCase?.height} cm</span>
      </div>

      {/* Allergies */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">Allergies</span>
        <span className="font-semibold">{patientCase?.allergies || 'None'}</span>
      </div>
    </div>
  )
}

export default PersonalDataTable
