import React from 'react'
import {motion} from 'framer-motion'

type Props = {
    direntionLeft: boolean,
    iconUrl: string
}

export default function Skill({ direntionLeft, iconUrl }: Props) {
  return (
    <div className='group relative flex cursor-pointer'>
        <img 
        className='rounded-full border-gray-500 object-cover md:w-24 md:h-24 w-16 h-16 xl:w-32 xl:h-32 bg-[#262626]'
        src={iconUrl} />
    </div>
  )
}