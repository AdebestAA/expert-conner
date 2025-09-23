'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { MedicationSelection } from '@/interface'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { RenderHTML } from '@/components/RenderHTML'
import { Asterisk, Check } from 'lucide-react'
import { useCaseContext } from '@/lib/context/caseContext'
import { H2, Label, Subtitle, Title } from '@/components/Title'
import { GuidanceIconStrings } from '@/components/GuidanceTitle'

export const AddMedicationsTable = ({ medicationsSelections }: { medicationsSelections?: MedicationSelection[] }) => {
  const { isOpen, onToggle } = useDisclose()
  const [selectedMedication, setSelectedMedication] = React.useState<MedicationSelection | null>(null)

  const handleToggle = React.useCallback(() => {
    if (selectedMedication) {
      onToggle()
    }
  }, [selectedMedication, onToggle])
  
  useEffect(() => {
    handleToggle()
  }, [handleToggle])

  return (
    <div>
      <H2 title="Add Medications" />
      <Label title="Select appropriate medications for the patient." />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-medium">Name</TableCell>
            <TableCell className="font-medium">Action</TableCell>
            <TableCell className="font-medium">Guidance</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Treatment Intensification</TableCell>
            <TableCell>
              <MedicationsSelect
                options={medicationsSelections}
                setSelectedMedication={setSelectedMedication} />
            </TableCell>

            {selectedMedication && (
              <TableCell>
                <GuidanceIconStrings guidanceType={selectedMedication?.guidanceType} />
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={
          {
            correct: 'This is consistent with the guidance',
            incorrect: 'This is inconsistent with the guidance',
            partiallyCorrect: 'This is less optimal according to the guidance',
          }[selectedMedication?.guidanceType || '']
        }
        content={<RenderHTML htmlString={selectedMedication?.actionText[0]?.text.html || ''} />} />
    </div>
  )
}

type MedicationsSelectProps = {
  options?: MedicationSelection[]
  setSelectedMedication: Dispatch<SetStateAction<MedicationSelection | null>>
}
const MedicationsSelect = ({ options, setSelectedMedication }: MedicationsSelectProps) => {
  const { updateItemToReview } = useCaseContext()
  return (
    <Select onValueChange={value => {
      const option = options?.find(option => option.name === value)

      if (option) {
        setSelectedMedication(option)
        updateItemToReview(option)
      } else {
        setSelectedMedication(null)
      }
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a drug" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Drugs</SelectLabel>
          {options?.map((option, index) => (
            <SelectItem
              key={index}
              value={option.name}
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
