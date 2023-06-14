import React from 'react'
import Skill from './Skill'
import {motion} from 'framer-motion'

type Props = {}

function Skills({}: Props) {
  return (
  
    <motion.div initial={{
        opacity: 0
    }} whileInView={{
        opacity: 1
    }} transition={{
        duration: 1.5
    }} className='h-screen flex relative flex-col text-center md:text-left xl:flex-row max-width-[2000px] xl:px-10 min-height-screen justify-center xl:space-y-0 mx-auto items-center'>
          <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>Skills</h3>
        <div className='grid grid-cols-4 gap-5'>
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />

        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        <Skill direntionLeft={false} />
        </div>
    </motion.div>
  )
}

export default Skills