import { User } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, Images, Video, Vote } from 'lucide-react'

const actions = [
  { label: 'Picture', icon: Images, style: 'text-primary' },
  { label: 'Video', icon: Video, style: 'text-blue-400' },
  { label: 'Event', icon: CalendarDays, style: 'text-orange-300 ' },
  { label: 'Poll', icon: Vote, style: 'text-red-200' },
]

function AddPost({ user }: { user: User }) {
  const userImage = user.image
  const userName = user.username
  return (
    <Card>
      <CardContent className='px-4 pb-1 pt-2'>
        <div className='flex items-center justify-between gap-4'>
          <Avatar className='size-8'>
            <AvatarImage
              src={userImage || '/assets/default-avatar'}
              alt='avatar'
              referrerPolicy='no-referrer'
              className='object-cover hover:brightness-110'
            />
            <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex-1 cursor-pointer rounded-xl bg-muted/60 px-5 py-2.5 text-xs text-card-foreground/50 shadow-sm hover:bg-muted'>
            Tell your friends about your thoughts...
          </div>
        </div>
        <div className='mt-3 flex flex-wrap items-center justify-center gap-1'>
          {actions.map(({ label, icon: Icon, style }, i) => {
            return (
              <div
                key={i}
                className='flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-2xl py-2 hover:bg-muted/50'
              >
                <Icon className={`size-4 ${style} sm:size-5`} />
                <span className='text-xs sm:text-sm'>{label}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
export default AddPost
