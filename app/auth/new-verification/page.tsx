import NewVerificationForm from '@/components/forms/new-verification-form'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import epichatLogo from '@/public/assets/epichat-logo.png'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className='flex max-w-[400px] flex-col gap-2 rounded-lg border bg-card p-6 shadow-lg lg:w-[500px]'>
      <div className='mb-4 flex flex-col items-center gap-8'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-3xl font-bold'>Epichat</h2>
          <Image src={epichatLogo} alt='Next.js logo' className='size-7' />
        </div>
        <Suspense>
          <NewVerificationForm />
        </Suspense>
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
