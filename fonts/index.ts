import { Inter, Lusitana, Caveat } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
})

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
})
export const caveat = Caveat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})
