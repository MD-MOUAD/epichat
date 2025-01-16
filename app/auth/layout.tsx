import { ModeToggle } from '@/components/ui/ModeToggle'
import { Spotlight } from '@/components/ui/spotlight'
import { caveat } from '@/fonts'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='relative w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]' />
      <nav className='h-navbar bg-background shadow-sm dark:shadow-foreground/10'>
        <div className='container flex h-full items-center justify-between px-2'>
          <Link href='/auth/login'>
            <h1
              className={`${caveat.className} bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text p-1 text-2xl font-bold text-transparent xl:text-3xl`}
            >
              Epichat
            </h1>
          </Link>
          <ModeToggle />
        </div>
      </nav>
      <Spotlight
        className='-z-20 blur-3xl dark:bg-zinc-700'
        size={64}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      <section className='flex h-[calc(100vh-var(--navbar-height))] items-center justify-center p-5'>
        {children}
      </section>
    </main>
  )
}
