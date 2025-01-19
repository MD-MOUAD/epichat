'use client'
import { stories } from '@/mock/stories'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CircleFadingPlus } from 'lucide-react'
import { User } from 'next-auth'
import { caveat } from '@/fonts'

const HomeStories = ({ user }: { user: User }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollAmount, setScrollAmount] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const calculateScrollAmount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const remainingSpace = containerWidth % (112 + 12) // Story width + gap
        setScrollAmount(containerWidth - remainingSpace)
      }
    }

    const updateScrollButtons = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      calculateScrollAmount()
      updateScrollButtons()
    })

    const container = containerRef.current
    if (container) {
      resizeObserver.observe(container)
      container.addEventListener('scroll', updateScrollButtons)
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container)
        container.removeEventListener('scroll', updateScrollButtons)
      }
    }
  }, [])

  const scrollStories = (direction: 1 | -1) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div className='relative flex w-full items-center'>
      {/* Previous Button */}
      {canScrollLeft && (
        <Button
          onClick={() => scrollStories(-1)}
          className='absolute left-0 z-10 hidden size-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-75 sm:flex'
        >
          <ChevronLeft />
        </Button>
      )}

      {/* Stories Container */}
      <div
        ref={containerRef}
        className='no-scrollbar flex w-full gap-3 overflow-scroll text-xs'
      >
        {/* Add Story */}
        <div className='group flex h-44 w-28 shrink-0 flex-col rounded-lg border opacity-85 transition-all duration-500 hover:cursor-pointer hover:opacity-100'>
          <Image
            src={user.image || '/assets/new-story.png'}
            alt='profile'
            width={176}
            height={112}
            className='aspect-square w-28 shrink-0 overflow-hidden rounded-t-lg object-cover'
            priority
          />

          <div className='relative flex flex-1 items-end justify-center rounded-b-lg bg-secondary/90 dark:bg-secondary/60'>
            <p
              className={`${caveat.className} p-2 text-center text-lg font-bold text-primary`}
            >
              New Story
            </p>
            <CircleFadingPlus className='absolute left-1/2 top-0 z-10 size-8 -translate-x-1/2 -translate-y-1/3 transform rounded-full bg-secondary text-primary group-hover:scale-105' />
          </div>
        </div>

        {stories.map((story, i) => {
          return (
            <div
              key={i}
              className='relative shrink-0 rounded-lg border hover:cursor-pointer'
            >
              <Image
                src={story.media.source}
                alt={`${story.user.username}'s story`}
                width={176}
                height={112}
                className='h-44 w-28 overflow-hidden rounded-lg object-cover brightness-90 transition-all duration-500 hover:brightness-75'
                priority
              />

              <Image
                src={story.user.image}
                alt={`${story.user.username}'s profile`}
                width={32}
                height={32}
                className='absolute right-2 top-2 aspect-square size-8 rounded-full object-cover shadow-lg ring-2 ring-primary'
                priority
              />
              <div className='absolute bottom-0 left-0 right-0'>
                <p className='max-w-full overflow-hidden text-ellipsis whitespace-nowrap break-all p-2 text-center font-bold text-white brightness-200'>
                  {story.user.username}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      {/* Next Button */}
      {canScrollRight && (
        <Button
          onClick={() => scrollStories(1)}
          className='absolute right-0 z-10 hidden size-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-75 sm:flex'
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  )
}
export default HomeStories
