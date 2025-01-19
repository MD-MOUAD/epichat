import { OctagonAlert } from 'lucide-react'

enum Error {
  Configuration = 'Configuration',
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please check your network
      settings or contact us if this error persists. Unique error code:{' '}
      <code className='rounded-sm bg-muted p-1 text-xs'>Configuration</code>
    </p>
  ),
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const error = (await searchParams).error as Error

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <a
        href='#'
        className='block max-w-sm rounded-lg border bg-card p-6 text-center shadow hover:bg-secondary/60'
      >
        <h5 className='mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          <OctagonAlert />
          Something went wrong
        </h5>
        <div className='font-normal text-gray-700 dark:text-gray-400'>
          {errorMap[error] ||
            'Please check your network settings or contact us if this error persists.'}
        </div>
      </a>
    </div>
  )
}
