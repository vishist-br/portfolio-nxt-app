import React from 'react'
import {motion} from 'framer-motion'

type Props = {
    direntionLeft: boolean
}

export default function Skill({ direntionLeft }: Props) {
  return (
    <div className='group relative flex cursor-pointer'>
        <motion.img initial={{
            x: direntionLeft ? -200: 200,
            opacity: 0
        }} transition={{
            duration: 0.5
        }}
        whileInView={{
            x: 0,
            opacity: 1
        }}
        className='rounded-full border-gray-500 object-cover w-24 h-24 xl:w-32 xl:h-32'
        src="https://i.ibb.co/ynYpV6b/js.png" />

    </div>
  )
}