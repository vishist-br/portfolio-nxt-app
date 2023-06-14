"use client";
import React from 'react'
import {motion} from 'framer-motion'
import ExperienceCard from './ExperienceCard';

type Props = {}

function WorkExperience({}: Props) {
  return (
    <motion.div initial={{
        opacity: 0
    }} animate = {{
        opacity: 1
    }} transition = {{
        duration: 1.2
    }} className='h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center space-y-3'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl mb-2'>Experience</h3>
        <br />
        <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory'>
            <ExperienceCard logoUrl={'https://i.ibb.co/SR0mYW6/Rakuten-Logo.png'} />
        </div>
    </motion.div>
  )
}

export default WorkExperience