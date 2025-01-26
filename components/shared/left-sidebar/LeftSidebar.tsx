import { cn } from '@/lib/utils'
import ProfileCard from './ProfileCard'
import { auth } from '@/lib/auth'
import {
  PenTool,
  Activity,
  Store,
  Calendar,
  Image,
  Video,
  Newspaper,
  GraduationCap,
  List,
  Settings,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const LeftSidebar = async ({ className }: { className?: string }) => {
  const session = await auth()
  if (!session?.user) return null

  const leftSidebarLinks = [
    { label: 'My Posts', href: '/my-posts', icon: PenTool },
    { label: 'Activity', href: '/activity', icon: Activity },
    { label: 'Marketplace', href: '/marketplace', icon: Store },
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Albums', href: '/albums', icon: Image },
    { label: 'Videos', href: '/videos', icon: Video },
    { label: 'News', href: '/news', icon: Newspaper },
    { label: 'Courses', href: '/courses', icon: GraduationCap },
    { label: 'Lists', href: '/lists', icon: List },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className={cn('py-6', className)}>
      <div className='flex flex-col gap-y-6'>
        <ProfileCard user={session.user} />
        <Card className='rounded-xl pt-4'>
          <CardContent className='flex flex-col gap-y-4'>
            {leftSidebarLinks.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className='flex items-center gap-2'>
                <Icon className='size-5' />
                <span className='text-sm font-medium'>{label}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default LeftSidebar
