'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { User, GraduationCap, Mail, Calendar, MapPin, Briefcase, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-background bg-muted overflow-hidden">
                  <img
                    src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                  <User className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || 'Your Name'}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">
                {user?.user_metadata?.bio || 'Add a brief description about yourself and your learning goals.'}
              </p>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Education</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Your University</h3>
                    <p className="text-sm text-muted-foreground">Degree in Computer Science</p>
                    <p className="text-sm text-muted-foreground">2020 - 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Experience</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Your Position</h3>
                    <p className="text-sm text-muted-foreground">Company Name</p>
                    <p className="text-sm text-muted-foreground">2022 - Present</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Your Location</span>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'TypeScript'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 