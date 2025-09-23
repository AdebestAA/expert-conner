import React, { useState, useEffect, useMemo } from 'react'
import { ContinueDiscontinueList } from '@/components/tables/orders/ContinueDiscontinueList'
import { AddMedicationsTable } from '@/components/tables/orders/AddMedicationsTable'
import { AddNonMedicationOrders } from '@/components/tables/orders/NonMedicationOrders'
import { useCaseContext } from '@/lib/context/caseContext'
import { NonMedicationOrder, PastOrderWithChecked } from '@/interface'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { DialogTitle, Subtitle, Title } from '@/components/Title'
import { AddMedicationSelection } from '../tables/orders/MedicationOrders'

export const Orders = ({ setDisabledNext }: { setDisabledNext: (state: boolean) => void }) => {
  const [open, setOpen] = useState(true)
  const { medicalCase } = useCaseContext()
  const [showRest, setShowRest] = useState(false)

  const orderData = medicalCase?.order?.filter(order => !(order.endDate < 0));

  const orderDataCheckedIsExisting = orderData?.map((order) => {
    return {
      ...order,
      isChecked: undefined,
    }
  }).filter(order => order.isExisting)

  const [stateOrderData, setStateOrderData] = useState(orderDataCheckedIsExisting)

  const nonMedicationOrderData = useMemo(() => {
    const nonExistingOrders = orderData?.filter(order => !order.isExisting).map(order => ({
      ...order,
      isChecked: undefined,
      category: 'Medications',
    })) as unknown as NonMedicationOrder[];
  
    return [...(medicalCase?.nonMedicationOrder ?? []), ...(nonExistingOrders ?? [])];
  }, [orderData, medicalCase?.nonMedicationOrder]);
  
  const medicationsSelections = medicalCase?.medicationSelection

  // State for individual child components
  const [isContinueDiscontinueDisabled, setIsContinueDiscontinueDisabled] = useState(false);
  const [isMedicationSelectionDisabled, setIsMedicationSelectionDisabled] = useState(false);
  const [isNonMedicationOrdersDisabled, setIsNonMedicationOrdersDisabled] = useState(false);

  // Function to update `setDisabledNext` based on the rendered components' states
  useEffect(() => {
    const isDisabled =
      (medicationsSelections && isMedicationSelectionDisabled) ||
      (nonMedicationOrderData && isNonMedicationOrdersDisabled) || 
      !(medicalCase?.medicationAmount === medicationsSelections?.filter(item => item?.reviewed).length);

    setDisabledNext(isDisabled);
  }, [
    isContinueDiscontinueDisabled,
    isMedicationSelectionDisabled,
    isNonMedicationOrdersDisabled,
    stateOrderData,
    medicationsSelections,
    nonMedicationOrderData,
    setDisabledNext,
    medicalCase?.medicationAmount
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Title title="Treatment Plans" />
      {orderData && orderData.length > 0 && 
        <>
          <Subtitle title="What adjustments, if any, would you make to the patient’s existing medications?" />
      
          {stateOrderData && (
            <ContinueDiscontinueList
              setDisabledNext={setIsContinueDiscontinueDisabled}
              orderData={stateOrderData as unknown as PastOrderWithChecked[]}
              setStateOrderData={setStateOrderData as any}
            />
          )}
        </>
      }
      

      <div className="flex flex-col gap-8 mt-8">
        {medicationsSelections && medicationsSelections?.length > 0 && (
          <AddMedicationSelection
            medicationSelectionData={medicationsSelections}
            setDisabledNext={setIsMedicationSelectionDisabled}
            medicationAmount={medicalCase?.medicationAmount}
          />
        )}

        {nonMedicationOrderData && nonMedicationOrderData?.length > 0 && (
          <AddNonMedicationOrders
            nonMedicationOrderData={nonMedicationOrderData}
            setDisabledNext={setIsNonMedicationOrdersDisabled}
          />
        )}
      </div>

      <GenericDialog
        open={open}
        onOpenChange={() => setOpen(!open)}
        title={<DialogTitle title="Medication Guide" />}
        content={<p>
          Drug information is provided based on clinical guidelines and current research. Please refer to the package
          insert or summary of product characteristics, validated sources of product information, and clinical
          guidelines
          for further guidance.</p>
        }
        showButton
      />
    </div>
  )
}