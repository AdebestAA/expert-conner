'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Order, PastOrderWithChecked } from '@/interface'
import { Button } from '@/components/ui/button'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { RenderHTML } from '@/components/RenderHTML'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { GuidanceIcon, GuidanceTitle } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'
import React, { useEffect, useState } from 'react'
import languageTexts from '@/lib/utils/language'
import Cookies from 'js-cookie'
type ContinueDiscontinueTableProps = {
  orderData: PastOrderWithChecked[]
  setStateOrderData: (orderData: Order[]) => void
  setDisabledNext: (state: boolean) => void
}

export const ContinueDiscontinueList = ({
  orderData,
  setStateOrderData,
  setDisabledNext,
}: ContinueDiscontinueTableProps) => {

  const allIsChecked = orderData?.every((order) => order.isChecked !== undefined)
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview } = useCaseContext()
  const [selectedOrder, setSelectedOrder] = React.useState<String>('');
  const [isMounted,setIsMounted] = useState<boolean>(false)

  
  const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined
  
  
  
    useEffect(()=>{
      setIsMounted(true)
        },[])

  const showSingleToggle = (id: string) => {
    setSelectedOrder(id)
    onToggle()
  }

  useEffect(() => {
    if (!isOpen) {
      setSelectedOrder('')
    }
  }, [isOpen])

  useEffect(() => {
    const shouldDisableNext = orderData?.some(
      (order) => order?.isChecked !== undefined && (order?.isChecked !== order?.continue)
    )
    setDisabledNext(shouldDisableNext) // Disable Next if any order is checked but continue doesn't match
  }, [orderData, setDisabledNext])

  const allOrderHtml = () => {
    return orderData?.map((order, index) => {
      const guidance = order.continue === order.isChecked
      return (
        <div key={index} className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <GuidanceIcon guidance={guidance} />
            <GuidanceTitle guidance={guidance} />
          </div>
          <h1 className="text-lg font-semibold">{order.name}</h1>
          <RenderHTML key={order.name} htmlString={order.actionText?.[1]?.text.html} />
        </div>
      )
    })
  }

  const singleOrderHtml = () => {
    return orderData?.map((order, index) => {
      if (order.id === selectedOrder) {
        const guidance = order.continue === order.isChecked
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <GuidanceIcon guidance={guidance} />
              <GuidanceTitle guidance={guidance} />
            </div>
            <h1 className="text-lg font-semibold">{order.name}</h1>
            <RenderHTML key={order.name} htmlString={order.actionText?.[1]?.text.html} />
          </div>
        )
      }
    })
  }

  return (
    <>
      <ul>
        {orderData?.map((test) => (
          <li
            key={test.name}
            className="flex justify-between items-center border-b border-gray-300 py-4"
          >
            <span className="font-medium">{test.name}</span>
            <div className="flex flex-row items-center gap-4">
              <RadioGroup
                className="flex items-center"
                onValueChange={(checked) => {
                  const currentFromOrderData = orderData?.map((order) => {
                    if (order.name === test.name) {
                      return {
                        ...order,
                        isChecked: checked === 'continue',
                      }
                    }
                    return order
                  })
                  setStateOrderData(currentFromOrderData as Order[])
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="continue" id={`continue-${test.name}`} />
                  <Label htmlFor={`continue-${test.name}`}>{isMounted && languageTexts(lang).continue}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discontinue" id={`discontinue-${test.name}`} />
                  <Label htmlFor={`discontinue-${test.name}`}>{isMounted && languageTexts(lang).disContinue}</Label>
                </div>
              </RadioGroup>
              {test.isChecked !== undefined && <GuidanceIcon clickEvent={() => showSingleToggle(test.id)} guidance={test.continue === test.isChecked} />}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button
          variant="primary"
          onClick={() => {
            if (allIsChecked) {
              orderData?.map((order) => {
                if(order.continue === order.isChecked){
                  updateItemToReview(order, 'order')
                }
              })
              
              onToggle()
              return
            }
          }}
        >
         {isMounted && languageTexts(lang).applySelections}
        </Button>
      </div>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={<h1>{isMounted && languageTexts(lang).clinicalGuidance}</h1>}
        content={selectedOrder === '' ? allOrderHtml() : singleOrderHtml()}
      />
    </>
  )
}