import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,  updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    return (
      createUserWithEmailAndPassword(auth,email,password)
    )
  }
  const login = (email, password) => {
    return (
      signInWithEmailAndPassword(auth, email, password)
    )
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false)
    });

    return () => unsubscribe()
  
  }, []);

  const updateUser = (personInfo) => {
  return  updateProfile(auth.currentUser, personInfo);
  } 
  
  const logOut = () => {
    return signOut(auth);
  };

  
  


  const userInfo = {
    registerUser,
    login,
    user,
    loading,
    logOut,
    updateUser,
   setUser


  }

  return (
    <AuthContext value={userInfo}>
      {children}
  </AuthContext>
   
  );
};

export default AuthProvider;