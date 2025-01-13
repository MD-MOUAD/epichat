'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { resetSchema, resetValues } from '@/validations/reset.validation'
import { passwordReset } from '@/actions/password-reset'
import { useState } from 'react'

export function PasswordResetForm() {
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const form = useForm<resetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: resetValues) {
    setFormError('')
    setFormSuccess('')

    const res = await passwordReset(values)
    if (res?.success) {
      setFormSuccess(res.success)
    } else {
      setFormError(
        res?.error || 'An unexpected error occurred. Please try again.'
      )
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4 sm:w-10/12'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Email</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input
                    placeholder='Enter your email'
                    {...field}
                    className='peer rounded-md border px-10 text-sm transition-colors duration-300'
                  />
                </FormControl>
                <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground' />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          className='mt-2 font-semibold'
        >
          Send reset email
        </Button>
        <div aria-live='polite' aria-atomic='true'>
          {formError && (
            <div className='space-x-1'>
              <ExclamationCircleIcon className='inline size-5 text-red-500' />
              <span className='text-sm text-red-500'>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div className='space-x-1'>
              <CheckCircleIcon className='inline size-5 text-emerald-600' />
              <span className='text-sm text-emerald-600'>{formSuccess}</span>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}
