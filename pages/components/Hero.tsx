"use client"
import React from 'react'
import { Cursor, useTypewriter} from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'
import Profile from '../assets/profile2.jpg'
import Link from 'next/link'

type Props = {}

function Hero({}: Props) {
    const [text, count] = useTypewriter({
        words: ["Hi, The Name's Vishist ", "Front End Developer", "Toastmaster"],
        loop: true,
        delaySpeed: 2000
    })
  return (
    <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <BackgroundCircles />
        <img className="relative rounded-full h-32 w-32 mx-auto object-cover"src={Profile.src}/>
        <div className='z-20'>
            <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">Software Engineer </h2>
            <h1>
                <span className="text-5xl lg:text-6xl font-semibold px-10 ">{text}</span>
                <Cursor cursorColor='grey' />
            </h1>

            <div className="pt-5">
                <a href="#About">
                <button className='heroButton'>About</button>
                </a> 
                <a href="#experience">
                <button className='heroButton'>Experience</button>
                </a>
                <a href="#skills">    
                <button className='heroButton'>Skills</button>
                </a>
                <a href="#Projects">   
                <button className='heroButton'>Projects</button>
                </a>
             
            </div>
        </div>
    </div>
  )
}

export default Hero