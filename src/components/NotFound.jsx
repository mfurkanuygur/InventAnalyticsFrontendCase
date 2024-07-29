import React from 'react'
import notfoundgif from '../assets/notfound.gif'
const NotFound = () => {
    return (
        <div className='min-h-dvh flex flex-col justify-center items-center gap-8 text-white'>
            <img src={notfoundgif} alt="Not Found Gif" />
            <h1 className='uppercase text-2xl font-bold'>404 - Page not founD</h1>
        </div>
    )
}

export default NotFound