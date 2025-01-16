import NavbarLeftSection from './NavbarLeftSection'
import NavbarMiddleSection from './NavbarMiddleSection'
import NavbarRightSection from './NavbarRightSection'

const Navbar = () => {
  return (
    <nav className='h-navbar shadow-md'>
      <div className='mx-auto flex h-full max-w-screen-2xl items-center xl:gap-10'>
        <NavbarLeftSection className='hidden w-[72px] max-w-[244px] sm:block xl:w-full' />
        <div className='flex w-full flex-1 justify-center gap-10'>
          <NavbarMiddleSection className='w-full max-w-[632px]' />
          <NavbarRightSection className='hidden max-w-[384px] flex-1 lg:flex' />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
