'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAccountSchemaThree } from '@/lib/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAccountAction } from '@/lib/actions/userActions'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PopupPrivacy } from '../popup_privacy'
import { PopupTerms } from '../popup_terms'
import { Button } from '@/components/ui/button'
import { useCreateAccountContext } from '@/components/auth/create-account/create-account-context'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const CreateAccountFormStepThree = () => {
  const { formValues } = useCreateAccountContext()
  const [message, setMessage] = useState('')
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
  const isProceedEnabled = isTermsChecked && isPrivacyChecked
  const form = useForm<z.infer<typeof createAccountSchemaThree>>({
    resolver: zodResolver(createAccountSchemaThree),
    defaultValues: {
      email: '',
      password: '',
      phoneNumber: '',
    },
  })

  async function onSubmit(values: z.infer<typeof createAccountSchemaThree>) {
    const allFormValues = {
      ...formValues,
      ...values,
    }


    const formData = new FormData()
    formData.append('firstName', allFormValues.firstName)
    formData.append('lastName', allFormValues.lastName)
    formData.append('countryOfPractice', allFormValues.countryOfPractice)

    formData.append('licenseNumber', allFormValues.licenseNumber)
    formData.append('qualifications', allFormValues.qualifications)
    formData.append('occupation', allFormValues.occupation)
    formData.append('primarySpecialization', allFormValues.primarySpecialization)
    formData.append('secondarySpecialization', allFormValues.secondarySpecialization)

    formData.append('email', allFormValues.email)
    formData.append('password', allFormValues.password)
    formData.append('phoneNumber', allFormValues.phoneNumber)

    const response = await createAccountAction(formData)

    if (response && response?.status === 'error') {
      form.setError('email', {
        type: 'manual',
        message: response.message,
      })

      return
    }

    if (response?.message && response.status === 'success') {
      setMessage(response?.message)
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {message && (
          <Alert>
            <AlertTitle>Application sent</AlertTitle>
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your email address?</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Please use your institutional email address for faster approval.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password"  {...field} />
              </FormControl>
              <FormDescription>
                Enter your password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormDescription>
                Enter your phone number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isTermsChecked}
            onChange={(e) => setIsTermsChecked(e.target.checked)}
            required
          />
            <span>
              I agree to the <span className="text-blue-600 cursor-pointer" 
              onClick={(e) => {
                e.preventDefault()
                setShowTerms(true)
              }}>Terms and Conditions</span>
            </span>
          </label>
          <label className="flex items-center space-x-3 mt-2">
          <input
            type="checkbox"
            checked={isPrivacyChecked}
            onChange={(e) => setIsPrivacyChecked(e.target.checked)}
            required
          />
            <span>
              I agree to the <span className="text-blue-600 cursor-pointer" 
              onClick={(e) => {
                e.preventDefault()
                setShowPrivacy(true)
              }}>Privacy Policy</span>
            </span>
          </label>
        </div>
        <Button variant="primary" className="py-8 w-full" type="submit" disabled={!isProceedEnabled}>
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin mr-2" size={20} />
          )}
          {
            form.formState.isSubmitting ? 'Creating account...' : 'Proceed'
          }
        </Button>
      </form>
      {showTerms && (
      <PopupTerms
        onClose={() => setShowTerms(false)}
      />
    )}
    {showPrivacy && (
      <PopupPrivacy
        onClose={() => setShowPrivacy(false)}
      />
    )}
    </Form>
  )
}
