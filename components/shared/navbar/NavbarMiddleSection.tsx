import { cn } from '@/lib/utils'
import { CircleFadingPlus, Home, UsersRound } from 'lucide-react'
import Link from 'next/link'
import SearchInput from './SearchInput'

const navbarLinks = [
  { Label: 'Home', href: '/', icon: Home },
  { Label: 'Friends', href: '/friends', icon: UsersRound },
  { Label: 'Stories', href: 'stories', icon: CircleFadingPlus },
]
const NavbarMiddleSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('flex items-center justify-center gap-4 px-2', className)}
    >
      <SearchInput />
      <div className='flex items-center gap-5'>
        {navbarLinks.map((link) => {
          const { Label, href, icon: Icon } = link
          return (
            <Link key={href} href={href} className='flex items-center gap-1'>
              <Icon className='size-5' />
              <span className='text-sm font-medium'>{Label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default NavbarMiddleSection
