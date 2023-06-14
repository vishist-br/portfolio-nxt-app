"use client"
import React from 'react'
import {motion} from 'framer-motion'
import Js from '../../assets/js.png'

type Props = {
  logoUrl: string

}

const ExperienceCard = ({logoUrl}: Props) => {
  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#262626] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden mt-5'>
        <motion.img initial={{
            y: -100,
            opacity: 0
        }} transition={{ duration: 1.2}} whileInView={{ opacity: 1, y:0}} viewport={{once: true}}  className="w-32 h-32 xl:w-[200px] xl:h-[200px] 
        object-contain" src={logoUrl} alt="" />

        <div className='px-0 md:px-10 '>
            <h5 className='text-4xl font-light'>Senior Engineer</h5>
            <p className='font-bold text-2xl mt-1'>Rakuten</p>
            <p className='uppercase py-5 text-gray-500 '>Started Work Aug 2019</p>
            <ul className='list-disc space-y-4 ml-5 text-lg'>
                <li>FrontEnd Developer: Experienced in leveraging technologies to build responsive and user-friendly interfaces, manage state, handle data fetching, and ensure code scalability and maintainability.</li>
                <li>Backend Developer: Worked on 2 Projects Proficient and Created complete backend from the scratch using proper layered architecture to make the code readable and scalable. </li>
            </ul>
        </div>
    </article>
  )
}

export default ExperienceCard;