import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchInput = () => {
  return (
    <div className='relative'>
      <Input
        className='peer h-8 rounded-full pl-8 pr-4 text-sm'
        placeholder='Search Epichat'
      />
      <Search className='pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground' />
    </div>
  )
}
export default SearchInput
