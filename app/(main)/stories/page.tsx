'use client'
import { useRef } from 'react'

export default function Stories() {
  const containerRef = useRef(null)

  const scrollStories = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 250 // Adjust for the story size
      containerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const stories = [
    { username: 'hatim_sehm', image: '/images/story1.jpg' },
    { username: 'areamiz', image: '/images/story2.jpg' },
    { username: 'vexza1990', image: '/images/story3.jpg' },
    { username: 'mambahfit', image: '/images/story4.jpg' },
    { username: 'aleee_ariasz', image: '/images/story5.jpg' },
    { username: 'otmvn_ofc', image: '/images/story6.jpg' },
    { username: 'guimaster', image: '/images/story7.jpg' },
    { username: 'vvvilyass_3', image: '/images/story8.jpg' },
    { username: 'hatim_sehm', image: '/images/story1.jpg' },
    { username: 'areamiz', image: '/images/story2.jpg' },
    { username: 'vexza1990', image: '/images/story3.jpg' },
    { username: 'mambahfit', image: '/images/story4.jpg' },
    { username: 'aleee_ariasz', image: '/images/story5.jpg' },
    { username: 'otmvn_ofc', image: '/images/story6.jpg' },
    { username: 'guimaster', image: '/images/story7.jpg' },
    { username: 'vvvilyass_3', image: '/images/story8.jpg' },
    { username: 'hatim_sehm', image: '/images/story1.jpg' },
    { username: 'areamiz', image: '/images/story2.jpg' },
    { username: 'vexza1990', image: '/images/story3.jpg' },
    { username: 'mambahfit', image: '/images/story4.jpg' },
    { username: 'aleee_ariasz', image: '/images/story5.jpg' },
    { username: 'otmvn_ofc', image: '/images/story6.jpg' },
    { username: 'guimaster', image: '/images/story7.jpg' },
    { username: 'vvvilyass_3', image: '/images/story8.jpg' },
  ]

  return (
    <div className='relative flex w-full items-center'>
      {/* Previous Button */}
      <button
        onClick={() => scrollStories(-1)}
        className='absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none'
      >
        &lt;
      </button>

      {/* Stories Container */}
      <div
        ref={containerRef}
        className='flex w-full gap-4 overflow-x-hidden scroll-smooth px-12'
      >
        {stories.map((story, index) => (
          <div
            key={index}
            className='flex w-20 flex-col items-center justify-center'
          >
            <img
              src={story.image}
              alt={story.username}
              className='border-gradient-to-r h-16 w-16 rounded-full border-4 from-pink-500 via-purple-500 to-yellow-500 object-cover'
            />
            <p className='mt-2 truncate text-sm text-gray-400'>
              {story.username}
            </p>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => scrollStories(1)}
        className='absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none'
      >
        &gt;
      </button>
    </div>
  )
}
