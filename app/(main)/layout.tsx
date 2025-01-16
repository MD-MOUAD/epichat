import Navbar from '@/components/shared/navbar/Navbar'
import LeftSidebar from '@/components/shared/left-sidebar/LeftSidebar'
import RightSidebar from '@/components/shared/right-sidebar/RightSidebar'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      <div className='mx-auto flex min-h-[calc(100vh-var(--navbar-height))] max-w-screen-2xl xl:gap-10'>
        <LeftSidebar className='hidden w-[72px] max-w-[244px] sm:block xl:w-full' />
        <div className='flex w-full flex-1 justify-center gap-10'>
          <main className='w-full max-w-[632px]'>{children}</main>
          <RightSidebar className='hidden max-w-[384px] flex-1 lg:block' />
        </div>
      </div>
    </div>
  )
}
