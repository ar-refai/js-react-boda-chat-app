import { 
    useContext ,
    useState ,
    useEffect , 
    createContext } from "react";
import { useNavigate } from 'react-router-dom';

import { 
    GoogleAuthProvider ,
    FacebookAuthProvider ,
    signInWithRedirect ,
    signInWithPopup,
    signOut ,
    onAuthStateChanged } from "firebase/auth";
    
import { auth } from "../firebase";

    const AuthContext = createContext();

export const AuthContextProvider = (({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth,provider) 
        } 
    const facebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        await signInWithRedirect(auth,provider) // change this to facebook auth
        }

    useEffect(() =>{ 
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            user && navigate('/chats');
        })
    }
    ,[user ,navigate])

    const value = {user};

    return (
        <AuthContext.Provider value={{googleSignIn,facebookSignIn}}>
            {!loading && children}
        </AuthContext.Provider>)
        })

export const UserAuth = () => {  
    return useContext(AuthContext);
}