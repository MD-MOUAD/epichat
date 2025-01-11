import NewVerificationForm from '@/components/forms/new-verification-form'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  )
}
