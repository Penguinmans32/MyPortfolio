'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const AboutMe = () => {
  const [visibleSections, setVisibleSections] = useState([])
  const sectionRefs = useRef([])
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2])

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => [...prev, index])
            } else {
              setVisibleSections(prev => prev.filter(i => i !== index))
            }
          },
          { threshold: 0.1 }
        )
        observer.observe(ref)
        return observer
      }
      return null
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  const sections = [
    {
      title: "Who Am I?",
      content: "I'm a passionate developer with a love for creating innovative solutions. My journey in tech started with a curiosity about how things work, and it has evolved into a fulfilling career.",
      image: "/Me.jpg?height=300&width=300"
    },
    {
      title: "My Family",
      content: "Family is my anchor and source of inspiration. They've supported me through every step of my journey, and their love fuels my drive to succeed.",
      image: "/Family.jpg?height=300&width=300"
    },
    {
      title: "My Friends",
      content: "I'm blessed with an amazing circle of friends who challenge me to grow, both personally and professionally. They're my sounding board and my cheer squad.",
      image: "/Frie.jpg?height=300&width=300"
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Me
        </motion.h1>
        
        {sections.map((section, index) => (
          <motion.div
            key={index}
            ref={el => sectionRefs.current[index] = el}
            className="mb-24 flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 50 }}
            animate={visibleSections.includes(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-semibold mb-4">{section.title}</h2>
              <p className="text-lg leading-relaxed">{section.content}</p>
            </div>
            <motion.div
              className="md:w-1/2 flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-pink-500 rounded-full opacity-50"
        animate={{
          y: [0, -30, 0],
          x: [0, 30, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-yellow-500 rounded-lg opacity-50"
        animate={{
          y: [0, 40, 0],
          x: [0, -40, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-12 h-12 border-4 border-green-500 opacity-50"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default AboutMe