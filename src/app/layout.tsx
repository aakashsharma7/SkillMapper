import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/contexts/ToastContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkillMapper - Visualize Your Learning Journey',
  description: 'Create and manage your skill development roadmap with interactive visualizations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <Navigation />
            <main className="min-h-screen bg-background">
              {children}
            </main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 