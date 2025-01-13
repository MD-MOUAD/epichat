'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { newVerification } from '@/actions/new-verification'

const NewVerificationForm = () => {
  const token = useSearchParams().get('token')
  const [formError, setFormError] = useState<string | undefined>()
  const [formSuccess, setFormSuccess] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    setFormError('')
    setFormSuccess('')

    if (!token) {
      setFormError(
        'The verification link is invalid. Please check the link or request a new one.'
      )
      return
    }

    try {
      setLoading(true)
      const res = await newVerification(token)
      if (res.success) {
        setFormSuccess(res.success)
      } else {
        setFormError(
          res.error ||
            'Verification failed. Please try again later or contact support for assistance.'
        )
      }
    } catch {
      setFormError(
        'An unexpected error occurred while processing your verification request. Please refresh the page and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!loading && !formError && !formSuccess && (
        <Button onClick={onSubmit}>Verify Your Email</Button>
      )}
      {/* Show loader during loading */}
      {loading && (
        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='text-center text-lg text-muted-foreground'>
            Confirming your verification
          </p>
          <BeatLoader />
        </div>
      )}
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
    </>
  )
}

export default NewVerificationForm
