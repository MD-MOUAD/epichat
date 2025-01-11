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
  type registerValues,
  registerSchema,
} from '@/validations/register.validation'
import { Eye, EyeOff } from 'lucide-react'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { useRef, useState } from 'react'
import { register } from '@/actions/register'

export function RegisterForm() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const form = useForm<registerValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: registerValues) => {
    setFormError('')
    setFormSuccess('')

    const res = await register(values)
    if (res.success) {
      setFormSuccess(res.message || 'Confirmation email sent!')
      form.reset()
    } else {
      switch (res.statusCode) {
        case 400:
          // Handle form-level errors
          if (res.error.formErrors.length > 0) {
            setFormError(res.error.formErrors[0])
          }
          // Handle field-specific errors
          Object.keys(res.error.fieldErrors).forEach((field) => {
            form.setError(field as keyof registerValues, {
              message:
                res.error.fieldErrors[
                  field as keyof typeof res.error.fieldErrors
                ]?.[0],
            })
          })
          break

        case 409:
          setFormError(
            res.error || 'User already exists or another conflict occurred.'
          )
          break

        case 500:
          setFormError(
            res.error || 'Internal Server Error. Please try again later.'
          )
          break

        default:
          setFormError('An unexpected error occurred. Please try again.')
          break
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        {/* Username */}
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Username</FormLabel>
              <div className='relative'>
                <FormControl className='-mt-1'>
                  <Input
                    autoComplete='on'
                    placeholder='Enter your username'
                    className='peer rounded-md border px-10 text-sm transition-colors duration-300'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <UserIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground' />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Email</FormLabel>
              <div className='relative'>
                <FormControl className='-mt-1'>
                  <Input
                    type='email'
                    autoComplete='on'
                    placeholder='Enter your email'
                    className='peer rounded-md border px-10 text-sm transition-colors duration-300'
                    {...field}
                  />
                </FormControl>
                <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground' />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
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
                <FormLabel className='font-semibold'>Password</FormLabel>
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
          className='mt-4 font-semibold'
        >
          Sign Up <ArrowRightIcon className='ml-auto size-6' />
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
