"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { forgotPasswordSchema, loginSchema } from '@/lib/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { resendPasswordResetEmail } from '@/lib/actions/userActions'
import { useToast } from '@/components/ui/use-toast'

export const ForgotPasswordForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    const {status, message} = await resendPasswordResetEmail(values.email);

    if (status === "error") {
      toast({
        variant: "destructive",
        description: message,
      });

      return;
    }

    toast({
      variant: "default",
      description: message,
    })
  }

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-textPrimary mb-8 font-medium">New password</h1>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button variant="primary" type="submit" className="w-full py-8">
            {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
            {form.formState.isSubmitting ? 'Request new password...' : 'Request new password'}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link href={'/login'} className="underline text-textPrimary">
          Back to login
        </Link>
      </div>
    </div>
  )
}
