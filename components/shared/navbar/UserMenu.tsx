'use client'

import UserAvatar from '@/components/shared/navbar/UserAvatar'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogOut, Monitor, Moon, MoonIcon, Sun, SunIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

const UserDropdownMenu = () => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='flex items-center gap-2'>
            <span>Theme</span>
            <Sun className='size-4 transition-all dark:hidden' />
            <Moon className='hidden size-4 transition-all dark:block' />
            <span className='sr-only'>Toggle theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <SunIcon />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <MoonIcon />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor />
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={(event) => event.preventDefault()}>
          <AlertDialog>
            <AlertDialogTrigger className='flex w-full items-center justify-between'>
              <span>Logout</span>
              <LogOut size={15} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ready to leave?</AlertDialogTitle>
                <AlertDialogDescription>
                  We&apos;re sad to see you go! Come back anytime to reconnect
                  with your friends.{' '}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-destructive hover:bg-destructive hover:brightness-125 dark:text-foreground'
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                >
                  Sign out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu
