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
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { newPassword } from '@/actions/new-password'
import {
  newPasswordSchema,
  newPasswordValues,
} from '@/validations/new-password.validation'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export function NewPasswordForm() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const token = useSearchParams().get('token') || ''
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const form = useForm<newPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  async function onSubmit(values: newPasswordValues) {
    setFormError('')
    setFormSuccess('')

    try {
      const res = await newPassword(values, token)
      if (res?.success) {
        setFormSuccess(res.success)
      } else {
        setFormError(
          res?.error ||
            'Reset failed. Please try again later or contact support for assistance.'
        )
      }
    } catch {
      setFormError('An unexpected error occurred. Please try again.')
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
          name='password'
          render={({ field }) => {
            const handleTogglePassword = () => {
              setShowPassword((prev) => !prev)
              inputRef.current?.focus()
            }
            return (
              <FormItem>
                <FormLabel className='font-semibold'>New Password</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...field}
                      className='peer rounded-md border px-10 text-sm transition-colors duration-300'
                      ref={inputRef}
                    />
                  </FormControl>
                  <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground' />

                  <button
                    type='button'
                    className='absolute right-2 top-1/2 -translate-y-1/2 transform'
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <Eye className='size-5 text-primary' />
                    ) : (
                      <EyeOff className='size-5' />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* Submit Button */}
        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          className='mt-2 font-semibold'
        >
          Reset password
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
