import React from 'react'
import {motion} from 'framer-motion'

type Props = {}

function Projects({}: Props) {
    const Projects = [1,2,3,4,5]
  return (
    <div className='relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>Projects</h3>
        <div className='relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20'>
        {Projects.map((project, i) =>(

                <div className='w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen'>
                    <motion.img initial={{
                            y: -300,
                            opacity: 0

                    }}
                    transition={{
                        duration: 1.2
                    }}
                    whileInView={{
                        y:0,
                        opacity: 1
                    }}
                    viewport={{
                        once :true
                    }}
                    src="https://i.ibb.co/5sZqT4V/reactjs-word-counter.png" />
                    <div className='space-y-10 px-0 md:px-10 max-w-6xl'>
                        <h4 className='text-2xl font-semibold text-center'>Project {i+1} Text Analyzer</h4>
                        <p className="text-lg text-center md:text-left">It is an easy challenge in which you have to build logic for a text analyzer that will count the number of words, letters, paragraphs, and more of the text written in the textarea.</p>
                    </div>
                </div>
        ))}
        </div>
       
        <div className='w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12' / >
    </div>
  )
}

export default Projects