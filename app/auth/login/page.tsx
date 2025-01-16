import { LoginForm } from '@/components/forms/login-form'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import signinImage from '@/public/assets/smiley-friends-outdoors.jpg'
import SocialButtons from '@/components/auth/SocialButtons'
import { Suspense } from 'react'
import { caveat } from '@/fonts'

export const metadata: Metadata = {
  title: 'Log In',
}

export default function Page() {
  return (
    <div className='flex h-full w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl md:max-h-[40rem]'>
      <div className='flex w-full flex-col justify-between overflow-y-auto p-8 sm:p-10 md:w-1/2'>
        <div className='flex flex-col gap-y-10'>
          <div className='space-y-1 text-center'>
            <h1 className='text-center text-2xl font-semibold'>
              Login to{' '}
              <span
                className={`${caveat.className} bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text font-bold text-transparent xl:text-3xl`}
              >
                Epichat
              </span>
            </h1>
            <p className='text-muted-foreground'>Welcome back!</p>
          </div>

          <Image
            src={signinImage}
            alt='epichat-signin-image'
            className='aspect-video rounded-md object-cover md:hidden'
            priority
          />
          <div className='space-y-3 md:space-y-6'>
            <SocialButtons />

            {/* Spacer */}
            <div className='mx-4 mt-2 flex items-center gap-3'>
              <div className='h-1 flex-1 bg-muted' />
              <span className='text-sm font-medium text-muted-foreground'>
                or
              </span>
              <div className='h-1 flex-1 bg-muted' />
            </div>
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
        <Link
          href='/auth/register'
          className='mt-5 block text-center text-sm font-semibold hover:underline'
        >
          Don&apos;t have an account? Sign up
        </Link>
      </div>
      <Image
        src={signinImage}
        alt='epichat-signin-image'
        className='hidden w-7/12 object-cover md:block'
        priority
      />
    </div>
  )
}
