import React , { useRef , useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContextProvider, UserAuth } from '../context/AuthContext';
import axios from 'axios';

const Chats = () => {
    // LOADING STATE
    const [loading, setLoading] = useState(true);
    // NAVIGATE FROM ROUTER
    const navigate = useNavigate();
    // SIGNED IN USER
    let user = auth.currentUser;
    console.log(auth.currentUser);
    // SIGNOUT FUNCTION
    const handleSignOut = async () => {
        await auth.signOut();
        navigate('/');
    }
    // FILE HANDLING (USER IMAGE)
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob()
        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
    }
    // RUNS WHEN NAVIGATE OR USER IS CHANGED
    useEffect(() => {
    if(!user) {
        navigate('/');
        return;
    }
    axios.get('https://api.chatengine.io/users/me', {
        headers: {
            'project-id' : 'ca6f43d6-12ee-4bac-aeaa-f54d9bc6cf8d',
            'user-name': user.email,
            'user-secret':user.uid,
        }
    })
    .then(() => {
        setLoading(false);
    })
    .catch(()=>{
        let formdata = new FormData();  
        formdata.append('email',user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
        .then((avatar)=> {
            formdata.append('avatar',avatar,avatar.name)
            axios.post('https://api.chatengine.io/users' ,formdata, 
            {
                headers: {'private-key':'dae8c208-b794-46d3-9c4b-bce62599ba55 '}
            })
            .then(()=> {
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error)
            })
        })

    })
    
    }, [user,navigate])

    if(!user || loading) return ' Loading...';
    
    return (
        <div>
            {/* WRAPPER */}
            <div className='relative flex'>
                {/* NAVBAR */}
                <div>
                    {/* LOGO */}
                    <AnimatePresence>
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            whileHover={{ x: -10 }}
                            transition={{ type: 'spring', duration: 1, stiffness: 44, damping: 4 }}
                            className='w-screen flex bg-white justify-center origin-center items-center py-4 border-y-2 border-black'>
                            <a href='/' className='border-2 border-black px-8 py-4 rounded-xl'>
                                <img src='/logo.png' alt='logo' width={200} height={'auto'} />
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className='absolute right-10 mt-10'>
                    {/* LOGOUT */}
                    <a 
                    href="#_" 
                    onClick={handleSignOut}
                    className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-stone-950 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-stone-400 ring-offset-stone-50 ease focus:outline-none">
                        <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:opacity-30 group-hover:-translate-x-5"></span>
                        <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:opacity-30 group-hover:translate-x-5"></span>
                        <span className="relative z-20 flex items-center text-sm">
                            LOGOUT
                            <IoLogOutOutline className="relative w-5 h-5 ml-2 text-white"/>
                        </span>
                    </a>

                </div>

            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="ca6f43d6-12ee-4bac-aeaa-f54d9bc6cf8d"
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    )
}

export default Chats