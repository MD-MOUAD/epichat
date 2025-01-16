import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SessionProvider } from '@/components/providers/sessionProvider'
import { inter } from '@/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s | epichat',
    default: 'epichat',
  },
  description:
    'Epichat: Your social hub for connection and community. Discover a world of endless possibilities, from sharing your passions to connecting with like-minded individuals. Join the conversation, explore trending topics, and stay updated with real-time notifications. Experience the future of social interaction, all in one place.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
