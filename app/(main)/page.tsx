import HomeStories from '@/components/home/HomeStories'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()
  if (!session?.user) return null
  return (
    <div className='flex flex-col gap-y-6 px-1 py-6 sm:p-6'>
      <HomeStories user={session.user} />
      <span>AddPost</span>
      <span>Posts</span>
    </div>
  )
}
