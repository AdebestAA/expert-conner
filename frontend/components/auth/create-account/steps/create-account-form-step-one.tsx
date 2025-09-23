'use client'

import { useCreateAccountContext } from '@/components/auth/create-account/create-account-context'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAccountSchemaOne } from '@/lib/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CountrySelector } from '@/components/auth/create-account/country-selector'

export const CreateAccountFormStepOne = () => {
  const { updateFormValues, nextStep } = useCreateAccountContext()

  const form = useForm<z.infer<typeof createAccountSchemaOne>>({
    resolver: zodResolver(createAccountSchemaOne),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryOfPractice: '',
    },
  })

  async function onSubmit(values: z.infer<typeof createAccountSchemaOne>) {
    updateFormValues(values)
    nextStep()
  }


  return (
    <div className="space-y-4 w-full">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your first name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input  {...field} placeholder="Doe" />
                </FormControl>
                <FormDescription>
                  Enter your last name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOfPractice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of practice</FormLabel>
                <CountrySelector field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="primary" className="py-8 w-full" type="submit">
           Proceed
          </Button>
        </form>
      </Form>

      <div>
        <Link href={'/login'} className="text-blue-500">
          Already have an account? Log in here.
        </Link>
      </div>

    </div>
  )
}
