import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <Card>
      <div className='relative aspect-[16/7] rounded-t-xl'>
        <Image
          src='https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='Cover Image'
          width={1200}
          height={600}
          className='aspect-[16/7] overflow-hidden rounded-t-xl object-cover'
          priority
        />
        <Image
          src={user.image || '/assets/default-user-image.jpg'}
          alt='profile'
          width={112}
          height={176}
          className='absolute left-1/2 top-full aspect-square w-20 shrink-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-[3px] border-black object-cover'
          priority
        />
      </div>
      <div className='flex flex-col items-center gap-4 rounded-b-xl px-4 pb-4 pt-6'>
        {/* followers & following */}
        <div className='flex w-full items-center justify-between'>
          <div>
            <p className='text-center font-bold text-foreground/85'>1283</p>
            <p className='text-center text-xs text-muted-foreground'>
              Followers
            </p>
          </div>
          <div>
            <p className='text-center font-bold text-foreground/85'>2564</p>
            <p className='text-center text-xs text-muted-foreground'>
              Following
            </p>
          </div>
        </div>
        {/* name & username */}
        <div>
          <p className='text-center font-bold text-foreground/85'>
            {user.name}
          </p>
          <p className='text-center text-xs text-muted-foreground'>{`@${user.username}`}</p>
        </div>
        {/* bio */}
        <p className='text text-center text-xs dark:text-secondary-foreground/90'>
          Hello👋🏻 I&apos;m fullstack developer🧑🏻‍💻. Open to the time project
        </p>
        {/* Profile button */}
        <div className='w-full space-y-4 pt-2'>
          <div className='h-px bg-secondary' />
          <Button className='w-full bg-primary/80'>My profile</Button>
        </div>
      </div>
    </Card>
  )
}

export default ProfileCard
