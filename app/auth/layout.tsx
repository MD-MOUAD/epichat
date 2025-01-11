import { ModeToggle } from '@/components/ModeToggle'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='relative w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]' />
      <div className='absolute right-1 top-1'>
        <ModeToggle />
      </div>
      <section className='flex h-screen items-center justify-center p-5'>
        {children}
      </section>
    </main>
  )
}
