"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const educationData = [
  {
    year: '2023',
    degree: 'Master of Science in Computer Science',
    institution: 'Tech University',
    description: 'Upcoming or maybe not',
    imageUrl: '/upcoming.png?height=200&width=200'
  },
  {
    year: '2020',
    degree: '⭐ Bachelor of Science in Information Technology',
    institution: 'Cebu Institute of Technology University',
    description: 'Graduated with honors, focused on web technologies',
    imageUrl: '/CIT.jpg?height=200&width=200'
  },
  {
    year: '2016',
    degree: '⭐ High School Diploma',
    institution: 'Don Vicente Rama Memorial National High School',
    description: 'Learned fundamentals of programming and networking',
    imageUrl: '/Donnational.jpg?height=200&width=200'
  },
  {
    year: '2010',
    degree: '⭐ Elementary School Diploma',
    institution: 'Don Vicente Rama Memorial National Elementary School',
    description: 'Participated in various academic and contests',
    imageUrl: '/Donvicente.jpg?height=200&width=200'
  },
]

const EducationTimeline = () => {
  const [visibleItems, setVisibleItems] = useState([])
  const itemRefs = useRef([])
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const gradientHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => [...prev, index])
            } else {
              setVisibleItems(prev => prev.filter(i => i !== index))
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

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-center mb-12">My Education Journey</h1>
      <div className="relative max-w-6xl mx-auto">
        {}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500"
          style={{ height: gradientHeight }}
        />
        
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            ref={el => itemRefs.current[index] = el}
            className={`flex items-center mb-24 ${
              index % 2 === 0 ? 'flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
              <h2 className="text-2xl font-bold mb-2">{item.degree}</h2>
              <h3 className="text-xl text-purple-300 mb-2">{item.institution}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <motion.div
                className="w-48 h-48 mx-auto overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.institution} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="w-1/2 flex justify-center">
              <motion.div
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-900 font-bold text-xl shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.year}
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-12 h-12 bg-pink-500 rounded-full opacity-50"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-indigo-500 rounded-lg opacity-50"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-8 h-8 border-4 border-purple-500 opacity-50"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}

export default EducationTimeline