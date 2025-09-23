'use client'

import { useCreateAccountContext } from '@/components/auth/create-account/create-account-context'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAccountSchemaTwo } from '@/lib/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OccupationSelector, SpecializationSelector } from '@/components/auth/create-account/custom-selectors'

export const CreateAccountFormStepTwo = () => {
  const { updateFormValues, nextStep } = useCreateAccountContext()
  const form = useForm<z.infer<typeof createAccountSchemaTwo>>({
    resolver: zodResolver(createAccountSchemaTwo),
    defaultValues: {
      licenseNumber: '',
      qualifications: '',
      occupation: '',
      primarySpecialization: '',
      secondarySpecialization: '',
    },
  })

  async function onSubmit(values: z.infer<typeof createAccountSchemaTwo>) {
    if (values.otherOccupation) {
      values.occupation = values.otherOccupation
      delete values.otherOccupation
    }

    updateFormValues(values)
    nextStep()
  }

  return (
    <div className="w-full">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License number</FormLabel>
                <FormControl>
                  <Input placeholder="XX1235653" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualifications</FormLabel>
                <FormControl>
                  <Input placeholder="MD, PhD, MBBS, BMBS, MBChB, MBBCh, B.Med, MB, BM, RN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <OccupationSelector field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('occupation') === 'Other' && (
            <FormField
              control={form.control}
              name="otherOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your occupation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          </div>

          <div className="space-y-2">
          <FormField
            control={form.control}
            name="primarySpecialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary specialization</FormLabel>
                <SpecializationSelector field={field} isSecondary={false}  />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('primarySpecialization') && (
            <FormField
              control={form.control}
              name="secondarySpecialization"
              render={({ field }) => (
                <FormItem >
                  <SpecializationSelector
                    field={field}
                    isSecondary={true}
                    selectedPrimarySpecialization={form.watch('primarySpecialization')} />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          </div>

          <Button variant="primary" className="py-8 w-full" type="submit">
            Proceed
          </Button>
        </form>
      </Form>
    </div>
  )
}



