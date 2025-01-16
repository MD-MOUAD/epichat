'use client'

import { getSession, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect } from 'react'

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

  return (
    <Avatar className='size-8'>
      <AvatarImage
        src={userImage || undefined}
        alt='avatar'
        referrerPolicy='no-referrer'
        className='hover:brightness-110'
      />
      <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
