import { cn } from '@/lib/utils'
import UserDropdownMenu from '@/components/shared/navbar/UserMenu'

const NavbarRightSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn('items-center justify-end gap-2 pr-2', className)}>
      <UserDropdownMenu />
    </div>
  )
}
export default NavbarRightSection
