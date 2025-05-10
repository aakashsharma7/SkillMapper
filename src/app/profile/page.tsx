'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Email</h2>
              <p className="mt-1">{user?.email}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-muted-foreground">User ID</h2>
              <p className="mt-1">{user?.id}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Last Sign In</h2>
              <p className="mt-1">
                {user?.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 