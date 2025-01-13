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
import { type loginValues, loginSchema } from '@/validations/login.validation'
import { Eye, EyeOff } from 'lucide-react'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { useRef, useState } from 'react'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export function LoginForm() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const searchParams = useSearchParams()
  const UrlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'This email is already linked to another account. Please use the original provider.'
      : ''

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  })

  async function onSubmit(values: loginValues) {
    setFormError('')

    const res = await login(values)
    if (res?.success) {
      // This will not happened because of login redirect
      window.location.href = '/'
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
        className='flex flex-col gap-4'
      >
        {/* Username or Email */}
        <FormField
          control={form.control}
          name='usernameOrEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Username or Email</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input
                    placeholder='Enter your username or email'
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
                <div className='!mt-1 flex items-center justify-end'>
                  <Button
                    size='sm'
                    variant='link'
                    className='mr-1 h-auto px-0 font-medium text-foreground'
                  >
                    <Link href='/auth/password-reset'>Forgot password?</Link>
                  </Button>
                </div>
                <FormMessage className='!mt-0' />
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
          Login <ArrowRightIcon className='ml-auto size-6' />
        </Button>
        <div aria-live='polite' aria-atomic='true'>
          {(formError || UrlError) && (
            <div className='space-x-1'>
              <ExclamationCircleIcon className='inline size-4 text-red-500' />
              <span className='text-sm text-red-500'>
                {formError || UrlError}
              </span>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}
