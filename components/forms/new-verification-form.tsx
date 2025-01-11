'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { BeatLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import epichatLogo from '@/public/assets/epichat-logo.png'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { newVerification } from '@/actions/new-verification'

const NewVerificationForm = () => {
  const token = useSearchParams().get('token')
  const [formError, setFormError] = useState<string | undefined>()
  const [formSuccess, setFormSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const onSubmit = useCallback(async () => {
    setFormError('')
    setFormSuccess('')

    if (!token) {
      setFormError(
        'The verification link is invalid. Please check the link or request a new one.'
      )
      return
    }

    try {
      const res = await newVerification(token)
      startTransition(() => {
        if (res.success) {
          setFormSuccess(res.success)
        } else {
          setFormError(
            res.error ||
              'Verification failed. Please try again later or contact support for assistance.'
          )
        }
      })
    } catch {
      setFormError(
        'An unexpected error occurred while processing your verification request. Please refresh the page and try again.'
      )
    }
  }, [token])

  useEffect(() => {
    startTransition(() => {
      onSubmit()
    })
  }, [onSubmit])

  return (
    <div className='flex max-w-[400px] flex-col gap-2 rounded-lg border bg-card p-6 shadow-lg lg:w-[500px]'>
      <div className='mb-4 flex flex-col items-center gap-2'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-3xl font-bold'>Epichat</h2>
          <Image src={epichatLogo} alt='Next.js logo' className='size-7' />
        </div>
        <p className='text-center text-lg text-muted-foreground'>
          Confirming your verification
        </p>
        {/* Show loader during the transition */}
        {isPending && <BeatLoader />}
        <div className='my-6'>
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
        <Button
          variant='link'
          size='sm'
          className='text-base font-bold'
          asChild
        >
          <Link href='/auth/login'>Back to login</Link>
        </Button>
      </div>
    </div>
  )
}

export default NewVerificationForm
