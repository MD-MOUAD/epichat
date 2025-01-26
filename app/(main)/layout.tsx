import Navbar from '@/components/shared/navbar/Navbar'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
