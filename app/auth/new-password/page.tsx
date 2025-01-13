import Link from 'next/link'
import Image from 'next/image'
import epichatLogo from '@/public/assets/epichat-logo.png'
import { Button } from '@/components/ui/button'
import { NewPasswordForm } from '@/components/forms/new-password-form'
import { Suspense } from 'react'

export default function Page() {
  return (
    <div className='flex w-full max-w-[500px] flex-col gap-2 rounded-lg border bg-card p-6 shadow-lg'>
      <div className='flex flex-col items-center gap-5'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-3xl font-bold'>Epichat</h2>
            <Image src={epichatLogo} alt='Next.js logo' className='size-7' />
          </div>
          <p className='text-sm font-semibold text-muted-foreground'>
            Reset Your Password
          </p>
        </div>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
        <Button
          variant='link'
          size='sm'
          className='text-base font-semibold'
          asChild
        >
          <Link href='/auth/login'>Back to login</Link>
        </Button>
      </div>
    </div>
  )
}
