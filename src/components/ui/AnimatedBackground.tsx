'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Dynamic gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, #3b82f6 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, #3b82f6 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Subtle moving lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${i * 60}deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2,
          }}
        />
      ))}

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>
    </div>
  )
} 