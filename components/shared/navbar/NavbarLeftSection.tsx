import { cn } from '@/lib/utils'
import { caveat } from '@/fonts'

const NavbarLeftSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn('pl-2', className)}>
      <h1
        className={`${caveat.className} bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent xl:text-3xl`}
      >
        Epichat
      </h1>
    </div>
  )
}
export default NavbarLeftSection
