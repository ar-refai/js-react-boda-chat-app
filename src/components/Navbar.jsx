import React from 'react'
import {AnimatePresence, motion } from 'framer-motion'
const Navbar = () => {    

return (
    <AnimatePresence>
    <motion.div
    initial={{y:-100}}
    animate={{y:-2}}
    whileHover={{y:-10}}
    transition={{type:'spring',duration:1,stiffness:44,damping:4}}
    className='w-screen flex justify-center mt-10 origin-center items-center rounded-br-[200px] rounded-bl-[200px] py-4'>
        <a href='/' className='border-2 border-black px-8 py-4 rounded-xl'>
            <img src='/logo.png' alt='logo' width={200} height={'auto'}/>
        </a>
    </motion.div>
    </AnimatePresence>

)
}

export default Navbar