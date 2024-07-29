import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
const Footer = () => {
    return (
        <div className='bg-white w-full flex flex-col md:flex-row text-center  items-center justify-between px-3 lg:px-32 py-8 gap-4   text-secondary'>
            <p className='font-inspiration text-5xl font-bold'>MFU</p>
            <p className='text-lg font-bold'>"This project is a front-end test case for Invent Analytics"</p>
            <div className='flex gap-4 items-center'>
                <a href="https://github.com/mfurkanuygur/" target="_blank" rel="noopener noreferrer">
                    <FaGithub className='text-3xl' />
                </a>
                <a href="https://www.linkedin.com/in/mfurkanuygur1/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='text-3xl' />
                </a>
                <a href="https://mfurkanuygur.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <TfiWorld className="text-3xl" />
                </a>
            </div>

        </div>
    )
}

export default Footer