import React from 'react'

function Preloader() {
  return (
    <div>
      <div className='h-screen flex justify-center items-center bg-white dark:bg-gray-900'>
        <img 
          src="https://cdn.dribbble.com/users/127211/screenshots/1635050/house-animation-lag.gif" 
          alt="Loading..." width={'100%'}
          className="w-160 h-160 object-contain"
        />
      </div>
    </div>
  )
}

export default Preloader
