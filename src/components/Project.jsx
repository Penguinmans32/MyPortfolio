'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "⭐ Adventure Tales",
    description: "✨ This game, developed using Java and JavaGUI, features an interactive and engaging user interface for a fun experience. The backend, powered by MySQL (XAMPP), handles user data and game statistics, ensuring smooth gameplay and secure data management. The combination of Java and GUI elements provides a dynamic and responsive experience for players.",
    technologies: ["Java", "MySql", "JavaGUI"],
    imageUrl: "/AdventureTal.jpg?height=200&width=300",
    color: "from-purple-400 to-pink-600"
  },
  {
    id: 2,
    title: "⭐ Scheduling Task",
    description: "✨ This project is a Scheduling Task system designed to manage and organize tasks efficiently. It provides users with an intuitive interface for scheduling tasks, ensuring optimal time management and prioritization. The frontend design was created using Figma to enhance user experience with clean, responsive visuals.",
    technologies: ["Figma", "Java", "MySql"],
    imageUrl: "/SchedulingTask.jpg?height=200&width=300",
    color: "from-blue-400 to-teal-600"
  },
  {
    id: 3,
    title: "⭐ Recipe Platform",
    description: "✨ Upcoming Project",
    technologies: ["React.js", "SpringBoot", "Mysql"],
    imageUrl: "/ComingSoon.jpg?height=200&width=300",
    color: "from-yellow-400 to-orange-600"
  }
]

const BackgroundBubbles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 10}s`
          }}
        />
      ))}
    </div>
  )
}

function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([])
  const containerRef = useRef(null)
  const projectRefs = useRef([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2])

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleProjects(prev => [...prev, index])
            } else {
              setVisibleProjects(prev => prev.filter(i => i !== index))
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
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <BackgroundBubbles />
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
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-16"
        >
          My Projects
        </motion.h2>
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={visibleProjects.includes(index) ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`flex flex-col md:flex-row items-center bg-gray-800 bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="md:w-1/2 p-8">
                <h3 className={`text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>{project.title}</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-full text-sm font-semibold`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 p-4">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-75 transition-opacity duration-300 rounded-xl flex items-center justify-center`}>
                    <span className="text-white text-lg font-bold">View Project</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>
      </div>
    </div>
  )
}

export default Projects