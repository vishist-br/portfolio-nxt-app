import React from 'react'
import {motion} from 'framer-motion'

type Props = {}

function Projects({}: Props) {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    const Projects = [{name: 'Text Analyzer', src: 'https://i.ibb.co/6Frprjt/reactjs-word-counter-1-copy.png', github: 'https://github.com/vishist-br/ReactProjects/tree/main/SideProjects/textAnalyzer/text-analyzer'}, {name: 'Password Generator', src: 'https://i.ibb.co/bHcYfzg/Screenshot-2023-06-14-at-11-21-42-PM.png', github: 'https://github.com/vishist-br/ReactProjects/tree/main/SideProjects/password-g'}]
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
                    src={project.src} />
                    <div className='space-y-10 px-0 md:px-10 max-w-6xl'>
                        <h4 className='text-2xl font-semibold text-center'>{project.name}</h4>
                        <button className='bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold' onClick={() => openInNewTab(`${project.github}`)} >Github</button>
                    </div>
                </div>
        ))}
        </div>
       
        <div className='w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12' / >
    </div>
  )
}

export default Projects