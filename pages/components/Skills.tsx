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
    }} className='h-screen y-spacing-2 flex relative flex-col text-center  min-height-screen justify-center mx-auto items-center xl:space-y-10'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>Skills</h3>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/ynYpV6b/js.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/yP6htM8/react-2-icon.jpg"'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/C1Hycc9/html-logo.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/R4m7Gbk/redux-icon-fotor-bg-remover-20230614221645.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/JCQQRFt/typescript.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/fxwDcKm/python-icon-fotor-bg-remover-20230614222650.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/JjvC6TS/mysql-logo-modified.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/vcyHptf/98717277-9d273f80-236b-11eb-94f0-67267d62a591-modified.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/xj55mkh/download-1.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/F3H5F0J/tailwind-css-logo-modified.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/fpfvy5q/firebase.png'} />
        <Skill direntionLeft={false} iconUrl={'https://i.ibb.co/JphwjN0/download-2.png'} />
        </div>
    </motion.div>
  )
}

export default Skills