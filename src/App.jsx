import { useEffect, useRef } from 'react';
import Appbar from './components/Appbar';
import Introduction from './components/Introduction';
import Education from './components/Education';
import Projects from './components/Project';
import AboutMe from './components/Aboutme';
import ContactMe from './components/Contactme';
import './components/Animation.css';
import './components/StyleBar.css';

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const docElement = document.documentElement;
      const body = document.body;
      const scrollTop = docElement['scrollTop'] || body['scrollTop'];
      const scrollHeight = docElement['scrollHeight'] || body['scrollHeight'];
      const clientHeight = docElement['clientHeight'];

      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="progressBarContainer" className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div id="progressBar" className="h-full bg-blue-500"></div>
      </div>
      <Appbar scrollToSection={scrollToSection} sections={{ homeRef, aboutRef, educationRef, projectsRef, contactRef }} />
      <div ref={homeRef} id="home" className="section">
        <Introduction projectsRef={projectsRef} />
      </div>
      <div ref={aboutRef} id="about" className="section">
        <AboutMe />
      </div>
      <div ref={educationRef} id="education" className="section">
        <Education />
      </div>
      <div ref={projectsRef} id="projects" className="section">
        <Projects />
      </div>
      <div ref={contactRef} id="contact" className="section">
        <ContactMe />
      </div>
    </>
  );
}

export default App;