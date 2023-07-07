import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/ui/theme/theme-provider"
import { ModeToggle } from "@/components/ui/theme/toogleDarkMode"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FormStep Register - NextJS',
  description: 'NextJS + TailwindCSS + FramerMotion + Typescript + ReactHookForm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <ModeToggle className="fixed top-4 right-4" />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
