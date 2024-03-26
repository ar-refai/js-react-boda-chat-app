import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Navbar from './Navbar';
import React, { useState } from 'react'
import useMouse from '@react-hook/mouse-position';
import { motion } from 'framer-motion';
import BackVideo from '../back.mp4';
import { UserAuth } from "../context/AuthContext";

const Login = () => {

    const [cursorText, setCursorText] = useState("");
    const [cursorVariant, setCursorVariant] = useState("default");
    const ref = React.useRef(null);

    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100
    });

    let mouseXPosition = 0;
    let mouseYPosition = 0;

    if (mouse.x !== null) {
        mouseXPosition = mouse.clientX;
    }

    if (mouse.y !== null) {
        mouseYPosition = mouse.clientY;
    }

    const variants = {
        default: {
            opacity: 1,
            height: 10,
            width: 10,
            fontSize: "16px",
            backgroundColor: "rgb(0 ,0 , 0)",
            x: mouseXPosition,
            y: mouseYPosition,
            transition: {
                type: "spring",
                mass: 0.2
            }
        },
        project: {
            opacity: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: 'flex',
            justifyFlex: 'center',
            alignItems: 'center',
            color: "#000",
            fontWeight: "bold",
            height: 50,
            width: 50,
            fontSize: "14px",
            x: mouseXPosition - 32,
            y: mouseYPosition - 32
        }
    };

    const spring = {
        type: "spring",
        stiffness: 600,
        damping: 28
    };

    function projectEnter(event) {
        setCursorText("Sign In");
        setCursorVariant("project");
    }

    function projectLeave(event) {
        setCursorText("");
        setCursorVariant("default");
    }

    const {googleSignIn,facebookSignIn} = UserAuth();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            ///console.log(error)
        }
    }
    const handleFacebookLogin = async () => {
        try {
            await facebookSignIn()
        }
        catch (error) {
            ///console.log(error)
        }
    }

    return (
        <div ref={ref} className="relative w-full h-full">
            <video
                src={BackVideo}
                type='video/mp4'
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover brightness-150'
            />
            <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 w-full h-full bg-blackOverlay overflow-hidden">
                <motion.div
                    variants={variants}
                    className="rounded-full fixed z-50 flex flex-row content-center justify-center top-0 left-0 w-3 h-3 bg-sky-400 pointer-events-none text-white text-center text-lg"
                    animate={cursorVariant}
                    transition={spring}
                >
                    <span className="cursorText">{cursorText}</span>
                </motion.div>

                <div className="relative h-screen w-screen">
                    <div className="absolute top-0 left-0 bg-red-500 opacity-10 h-full w-1/2"></div>
                    <div className="absolute top-0 right-0 bg-sky-500 opacity-10 h-full w-1/2"></div>

                    <Navbar />
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: -1000
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{ type: 'spring', duration: 0.5, stiffness: 44, damping: 4 }}
                        className=" relative font-extralight text-7xl z-20  text-center md:my-8 my-4">
                        <motion.div className="inline">Your </motion.div>
                        <motion.div className="inline">Chat</motion.div>
                        <br />
                        <span>Buddy!</span>
                    </motion.h1>
                    <div className="flex flex-col justify-center items-center gap-10">


                        {/* Boy */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 200
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{ type: 'spring', duration: 0.5, stiffness: 10, damping: 4 }}
                            className="relative">
                            <img src="./chat-boy.png" className="w-96 z-40" alt="" />
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: -200
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                transition={{ type: 'spring', delay: 2, duration: 1 }}
                                className="absolute top-10 left-10 text-white text-xl tracking-wider">Hello Girl!</motion.span>
                        </motion.div>

                        {/* Girl */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -200
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{ type: 'spring', delay: 3, duration: 0.5, stiffness: 10, damping: 4 }}
                            className="relative">
                            <img src="./chat-girl.png" className="w-96 z-40" alt="" />
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: 200
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                transition={{ type: 'spring', delay: 4, duration: 1.5 }}
                                className="absolute top-10 right-10 text-white text-xl tracking-wider">Hello Boy!</motion.span>            </motion.div>

                    </div>
                    <div id='login-page' className='flex justify-center align-center'>
                        <div className='flex md:flex-row flex-col md:h-[calc(100vh-420px)] justify-center gap-8 items-center mx-auto mt-16 md:-mt-5'>
                            {/* FACEBOOK LOGIN SECTION */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: 200
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                onClick={handleFacebookLogin}
                                transition={{ type: 'spring', duration: 1.5 }}
                                className="group cursor-pointer"
                                onMouseEnter={projectEnter}
                                onMouseLeave={projectLeave}>
                                <div className="relative transition-all ease-in-out duration-500  flex md:h-44 md:group-hover:h-24 w-64 justify-center   items-end">
                                    <div className="relative flex justify-center md:items-end items-center h-24 z-20 bg-sky-500 rounded-xl p-4 w-full md:h-full">
                                        <div className="opacity-0 flex absolute text-xl font-bold text-white items-center md:top-0 md:group-hover:top-8 group-hover:opacity-100 transition-all ease-in-out duration-500">Sign in With Facebook</div>
                                        <div className='relative z-20 gap-2 flex flex-row justify-center items-center bg-white px-4 py-2 rounded-xl transition-all ease-in-out duration-200 text-sky-500 group-hover:opacity-0 group-hover:-translate-y-16'>
                                            <FaFacebookF />
                                            <span>
                                                Sign In With Facebook
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute text-[200px] font-bold text-sky-500 -top-20 opacity-0 z-0 transition-all ease-in-out duration-700 group-hover:z-30 group-hover:opacity-100 md:group-hover:-top-[250px] hidden md:flex">f</div>
                                </div>
                            </motion.div>

                            {/* GOOGLE LOGIN SECTION */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: -200
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                onClick={handleGoogleSignIn}
                                transition={{ type: 'spring', duration: 1.5 }}
                                className="group cursor-pointer"
                                onMouseEnter={projectEnter}
                                onMouseLeave={projectLeave}>
                                <div className="relative transition-all ease-in-out duration-500 flex md:h-44 md:group-hover:h-24 w-64 justify-center items-end">
                                    <div className="relative flex justify-center md:items-end items-center h-24 z-20 bg-white rounded-xl p-4 w-full md:h-full">
                                        <div className="opacity-0 flex absolute text-xl font-bold text-red-500 items-center md:top-0 md:group-hover:top-8 group-hover:opacity-100 transition-all ease-in-out duration-500">Sign in With Google</div>
                                        <div className='relative z-20 gap-2 flex flex-row justify-center items-center bg-red-500 px-4 py-2 rounded-xl transition-all ease-in-out duration-200 text-white group-hover:opacity-0 group-hover:-translate-y-16 '>
                                            <FaGoogle />
                                            <span>
                                                Sign In With Google
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute text-[200px] font-bold text-red-500 -top-20 opacity-0 z-0 transition-all ease-in-out duration-700 group-hover:z-30 group-hover:opacity-100 group-hover:-top-[250px] hidden md:flex">G</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login