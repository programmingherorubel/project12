import axios from 'axios';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import app from '../Firebase/firebaseConfig';



export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [error,setError]= useState('')
    const [loading,setLoading] = useState(false)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();



      // webUser
      const newWebUser = (email,password,name,photo)=>{
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                toast.success('created successfull')
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photo
                  }).then(() => {
                    // save to database 
                   const currentUser = {
                    email:user?.email,
                    name:user?.displayName,
                    photo:user?.photoURL
                }
                fetch(`https://project12server-programmingherorubel.vercel.app/users/${user?.email}`,{
                    method:'PUT',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(currentUser)
                })
                .then(res => res.json())
                .then(data => data)
                    // save to database 
                  }).catch((error) => {
                  });
                  setUser(user)
                   
                setLoading(false)
            })
            .catch((error) => {
                setLoading(true)
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(false)
                setError(errorMessage)
        });
    }

      // Login 
    const login = (email,password)=>{
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                toast.success('login successfull')
                setUser(user)
                setLoading(false)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
                toast.error(errorMessage)
        });
    } 

    

      // google Sing in 
      const googleSingIn = ()=>{
        setLoading(true)
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            setUser(user)
            // save to database 
            const currentUser = {
                email:user?.email,
                name:user?.displayName,
                photo:user?.photoURL
            }
            fetch(`https://project12server-programmingherorubel.vercel.app/users/${user?.email}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => data)
                // save to database 
            setLoading(false)
        }).catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage)
        });
    }

    //   useEffect(()=>{
    //     setLoading(true)
    //     const unSubscribe = onAuthStateChanged(auth,(user)=>{
    //         setUser(user)

    //         setLoading(false)
    //     })
    //     return ()=>{
    //        return unSubscribe()
    //     }
           
    // },[])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          console.log("current user", user);
          //  get and set token
    
          if (user) {
            axios
              .post("https://project12server-programmingherorubel.vercel.app/jwt", { email: user.email })
              .then((data) => {
                console.log(data);
                localStorage.setItem("access-token", data.data.token);
                setLoading(false);
              });
          } else {
            localStorage.removeItem("access-token");
          }
        });
        return () => {
          return unsubscribe();
        };
      }, []);

    // Logout 
    const logout = () =>{
        signOut(auth).then(() => {
            toast.success('logout successfull')
          }).catch((error) => {
            // An error happened.
          });
    }







    const information = {
        user,
        error,
        loading,
        newWebUser,
        logout,
        login,
        googleSingIn
    }

    return (
        <AuthContext.Provider value={information}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;