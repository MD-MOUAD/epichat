import { User } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CalendarDays, Images, Video, Vote } from 'lucide-react'

const actions = [
  { label: 'Picture', icon: Images },
  { label: 'Video', icon: Video },
  { label: 'Event', icon: CalendarDays },
  { label: 'Poll', icon: Vote },
]

function AddPost({ user }: { user: User }) {
  const userImage = user.image
  const userName = user.username
  return (
    <Card>
      <CardContent className='px-4 py-2'>
        <div className='flex gap-2'>
          <Avatar className='mt-2 size-8'>
            <AvatarImage
              src={userImage || '/assets/default-avatar'}
              alt='avatar'
              referrerPolicy='no-referrer'
              className='object-cover hover:brightness-110'
            />
            <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Textarea placeholder="What's on your mind?" />
        </div>
        <div className='mt-3 flex flex-wrap items-center gap-4 justify-center'>
          {actions.map(({ label, icon: Icon }, i) => {
            return (
              <div key={i} className='flex items-center justify-center gap-1 flex-1'>
                <Icon className='size-5' />
                <span>{label}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
export default AddPost
