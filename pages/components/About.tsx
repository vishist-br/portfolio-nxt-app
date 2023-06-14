"use client"
import React from 'react'
import Profile from '../assets/profile.png'
import {motion} from 'framer-motion'


type Props = {}

function About({}: Props) {
  return (
    <motion.div initial={{ opacity: 0}} animate={{opacity: 1}} transition={{duration: 1.2}}
     className='flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>About</h3>
        <br />
        <br />
        <br />
        <br />
        <motion.img 
        initial={{
            x: -200,
            opacity: 0
        }}
        transition={{
            duration: 1.2
        }}
        whileInView={{
            x: 0,
            opacity: 1
        }}
        className='mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-96 xl:w-[500px] xl:h-[500px]'
        src={Profile.src}/>
        <div className='space-y-10 px-0 md:px-10'>
            <h4 className='text-4xl font-semibold'> 
             Here is a <span className='underline decoration-[#F7AB0A]/50'>little</span> background
            </h4>
            <p className='text-sm'>
            A Full Stack Developer with 4 years of experience in Front-End Engineering, Backend Development, and Automation. Proficient in JavaScript, Typescript, HTML, CSS, React, Redux, Python, Flask, Postgres, and Snowflake. Experienced in creating responsive and user-friendly interfaces, managing state, handling data fetching, and ensuring code scalability and maintainability. Has experience in managing and mentoring team members.
            </p>
        </div>
    </motion.div>
  )
}

export default About