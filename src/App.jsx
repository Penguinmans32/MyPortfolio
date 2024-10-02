import Appbar from './components/Appbar'
import Introduction from './components/Introduction'
import Education from './components/Education'
import './components/Animation.css'
import './components/StyleBar.css'
import { useEffect } from 'react'


function App() {
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
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
      <Appbar />
      <Introduction />
      <Education />
    </>
  );
}

export default App;