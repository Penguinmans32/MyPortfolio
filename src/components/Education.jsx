"use client"

import React from 'react'
import { motion } from 'framer-motion'

const educationData = [
  {
    year: '2023',
    degree: 'Master of Science in Computer Science',
    institution: 'Tech University',
    description: 'Specialized in Artificial Intelligence and Machine Learning',
  },
  {
    year: '2021',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'Code Academy',
    description: 'Graduated with honors, focused on web technologies',
  },
  {
    year: '2019',
    degree: 'Associate Degree in Information Technology',
    institution: 'Digital Institute',
    description: 'Learned fundamentals of programming and networking',
  },
  {
    year: '2017',
    degree: 'High School Diploma',
    institution: 'Innovation High',
    description: 'Participated in various coding competitions',
  },
]

const EducationTimeline = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-12">My Education Journey</h1>
      <div className="relative max-w-4xl mx-auto">
        {/* Animated gradient line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-center mb-12 ${
              index % 2 === 0 ? 'flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
              <h2 className="text-2xl font-bold mb-2">{item.degree}</h2>
              <h3 className="text-xl text-purple-300 mb-2">{item.institution}</h3>
              <p className="text-gray-300">{item.description}</p>
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