'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Initial update
    updateDimensions()

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions)

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (dimensions.width === 0) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-gradient" />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full bg-primary/5 backdrop-blur-3xl"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Animated gradient orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
          }}
          transition={{
            duration: Math.random() * 30 + 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Track Your Learning Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            Visualize your skills, track your progress, and discover new learning paths
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href="/skill-map" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden min-h-[300px]"
              >
                {/* Animated lines */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute inset-0"
                    initial={{
                      background: `linear-gradient(${Math.random() * 360}deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)`,
                      x: '-100%',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                      background: [
                        `linear-gradient(${Math.random() * 360}deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)`,
                        `linear-gradient(${Math.random() * 360}deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)`,
                        `linear-gradient(${Math.random() * 360}deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)`,
                      ],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 2,
                    }}
                  />
                ))}
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-6 text-primary">{feature.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

const features = [
  {
    title: "Interactive Skill Maps",
    description: "Create visual mind maps of your skills using React Flow, with progress tracking and dependencies. Build your learning journey step by step."
  },
  {
    title: "AI-Powered Suggestions",
    description: "Get personalized learning paths and skill suggestions based on your goals and current progress. Let AI guide your learning journey."
  },
  {
    title: "Resource Management",
    description: "Add notes, links, and projects to each skill, keeping all your learning resources in one place. Stay organized and focused."
  }
] 