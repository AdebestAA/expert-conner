import React, { forwardRef } from 'react'
import { MedicalCase } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { Accordion } from '@/components/Accordion'
import { Button } from '@/components/ui/button'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { useDisclose } from '@/lib/hooks/useDisclose'

export const ImportantInformation = forwardRef<HTMLDivElement, { medicalCase: MedicalCase }>(({ medicalCase }, ref) => {
  const { isOpen, onToggle } = useDisclose()

  return (
    <div ref={ref}>
      <Accordion title="Important Information">
        <div className="flex flex-row justify-between md:justify-normal items-center md:gap-4">
          <div className="richtext md:grow">
            <RenderHTML
              htmlString={medicalCase?.importantInformation.html!}
              className="max-h-[100px] max-w-[200px] lg:max-w-[400px] overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [&_a]:break-all [&_ul]:inline [&_li]:inline [&_li]:mr-2"
            />
          </div>
          <div className="mr-4">
            <Button
              onClick={onToggle}
              variant="outline"
            >
              View
            </Button>
          </div>
        </div>
      </Accordion>
      {isOpen && (
        <GenericDialog
          open={isOpen}
          onOpenChange={onToggle}
          title={'Important Information'}
          content={<RenderHTML htmlString={medicalCase?.importantInformation.html!} />}
        />
      )}
    </div>
  )
})

ImportantInformation.displayName = 'ImportantInformation'
