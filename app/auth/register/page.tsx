import { RegisterForm } from '@/components/forms/register-form'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import signupImage from '@/public/assets/women-using-tablet.jpg'
import SocialButtons from '@/components/auth/SocialButtons'
export const metadata: Metadata = {
  title: 'Register',
}

export default function Page() {
  return (
    <div className='flex h-full w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl md:max-h-[40rem]'>
      <div className='flex w-full flex-col justify-between overflow-y-auto p-8 md:w-1/2 md:p-10'>
        <div className='flex flex-col gap-y-10'>
          <h1 className='text-center text-2xl font-bold md:text-3xl'>
            Create your account
          </h1>

          <Image
            src={signupImage}
            alt='epichat-signup-image'
            className='aspect-video rounded-md object-cover md:hidden'
            priority
          />
          <div className='flex flex-col gap-2'>
            <SocialButtons signup />

            {/* Spacer */}
            <div className='mx-4 mt-2 flex items-center gap-3'>
              <div className='h-1 flex-1 bg-muted' />
              <span className='text-sm font-medium text-muted-foreground'>
                or
              </span>
              <div className='h-1 flex-1 bg-muted' />
            </div>

            <RegisterForm />
          </div>
        </div>
        <Link
          href='/login'
          className='block text-center text-sm font-semibold hover:underline'
        >
          Already have an account? Log in
        </Link>
      </div>
      <Image
        src={signupImage}
        alt='epichat-signup-image'
        className='hidden w-7/12 object-cover md:block'
        priority
      />
    </div>
  )
}
