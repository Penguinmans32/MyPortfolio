import React from 'react';
import './lightning.css';  
import './Animation.css';  

function Introduction() {
  return (
    <div className='relative flex flex-col items-center justify-center h-screen text-4xl font-body fade-in intro-background'>
        {}
        <figure className='mb-8'>
            <img className='profile-img rounded-lg mx-auto lightning-border' src='src/images/CAPURAS VANESS.jpg' alt='Profile' />
            <figcaption className='mt-4 text-base text-center text-gray-300 italic'>This is me!</figcaption>
        </figure>

        {}
        <p className='text-center text-white leading-relaxed tracking-wide'>
          Hello, my name is <a className='hover:text-blue-400 text-4xl font-display font-bold'>Vaness Leonard C. Capuras</a>. <br />
          I am a developer and a student. <br />
          Welcome to my portfolio!
        </p>

        {}
        <button className='learn-more-btn mt-8'>Learn More</button>
    </div>
  );
}

export default Introduction;
