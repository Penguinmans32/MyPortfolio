import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Introduction() {
  const phrases = [
    'Developer | Student | Innovator',
    'Developer | Student | Designer',
    'Student | Tambay | Backend'
  ];

  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullPhrase = phrases[i];

      setCurrentPhrase(
        isDeleting
          ? fullPhrase.substring(0, currentPhrase.length - 1)
          : fullPhrase.substring(0, currentPhrase.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && currentPhrase === fullPhrase) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && currentPhrase === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentPhrase, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
        <div className="galaxy"></div>
        <div className="shooting-stars"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center"
      >
        <figure className="mb-8 relative">
          <div className="lightning-container">
            <div className="lightning"></div>
            <div className="lightning"></div>
            <div className="lightning"></div>
          </div>
          <img 
            className="relative w-40 h-40 rounded-full mx-auto border-4 border-white shadow-lg object-cover z-10" 
            src="/CAPURAS VANESS (1).jpg?height=160&width=160" 
            alt="Vaness Leonard C. Capuras" 
          />
          <figcaption className="mt-4 text-sm text-gray-300 italic">This is me!</figcaption>
        </figure>

        <h1 className="text-4xl font-bold mb-4">
          Hello, I'm{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Vaness Leonard C. Capuras
          </span>
        </h1>
        
        <p className="text-xl mb-8">
          <span className="typing-animation">{currentPhrase}</span>
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Explore My Work
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.div>

      <style jsx>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        .typing-animation {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid;
          animation: blink-caret 0.75s step-end infinite;
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white }
        }

        .lightning-container {
          position: absolute;
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .lightning {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          filter: blur(1px);
          background: radial-gradient(circle, rgba(135,206,235,0.8) 0%, rgba(0,0,255,0) 70%);
          animation: lightning 5s infinite;
        }

        .lightning:nth-child(2) {
          animation-delay: -2.5s;
        }

        .lightning:nth-child(3) {
          animation-delay: -3.75s;
        }

        @keyframes lightning {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }

        .galaxy {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: animateGalaxy 100s linear infinite;
          opacity: 0.5;
        }

        @keyframes animateGalaxy {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }

        .shooting-stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-45deg);
        }

        .shooting-stars::before,
        .shooting-stars::after {
          content: "";
          position: absolute;
          top: -10%;
          left: 50%;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
                      0 0 0 8px rgba(255, 255, 255, 0.1),
                      0 0 20px rgba(255, 255, 255, 1);
          animation: shootingStar 5s linear infinite;
        }

        .shooting-stars::after {
          animation-delay: 2.5s;
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}