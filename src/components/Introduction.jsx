import React from 'react';

function Introduction() {   
  return (
    <div className='flex flex-col items-center justify-center h-screen text-4xl'>
        <figure className='mb-8'>
            <img className='h-30 w-40 rounded-lg mx-auto' src='src/images/Profile.jpg' alt='Profile' />
            <figcaption className='mt-2 text-sm text-center text-gray-500 dark:text-gray-400'>Example Caption</figcaption>
        </figure>
        <h1>Hello My Name is <a className='hover:text-blue-600 text-5xl'> Vaness Leonard C. Capuras</a></h1>
    </div>
  );
}

export default Introduction;