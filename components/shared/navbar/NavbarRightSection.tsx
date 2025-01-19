import { cn } from '@/lib/utils'
import UserDropdownMenu from '@/components/shared/navbar/UserDropdownMenu'
import { Bell, MessageCircleMore } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const NavbarRightSection = ({ className }: { className?: string }) => {
  return (
    <TooltipProvider>
      <div className={cn('items-center justify-end gap-4 pr-2', className)}>
        <Tooltip>
          <TooltipTrigger>
            <MessageCircleMore className='size-5 cursor-pointer' />
          </TooltipTrigger>
          <TooltipContent className='mt-1 bg-secondary text-secondary-foreground'>
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Bell className='size-5 cursor-pointer' />
          </TooltipTrigger>

          <TooltipContent className='mt-1 bg-secondary text-secondary-foreground'>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>

        <UserDropdownMenu />
      </div>
    </TooltipProvider>
  )
}
export default NavbarRightSection
