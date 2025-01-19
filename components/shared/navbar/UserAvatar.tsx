'use client'

import { getSession, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const UserAvatar = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') {
      const fetchSession = async () => {
        await getSession()
      }
      fetchSession()
    }
  }, [status])

  const userImage = session?.user?.image
  const userName = session?.user?.name

  if (status === 'loading') {
    return (
      <Avatar className='size-8'>
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className='relative'>
      <Avatar className='size-8'>
        <AvatarImage
          src={userImage || '/assets/default-avatar'}
          alt='avatar'
          referrerPolicy='no-referrer'
          className='object-cover hover:brightness-110'
        />
        <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <ChevronDown
        size={12}
        className='absolute bottom-0 right-0 rounded-full bg-card'
      />
    </div>
  )
}

export default UserAvatar
