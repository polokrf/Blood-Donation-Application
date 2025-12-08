import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,  updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
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
 updateProfile(auth.currentUser, personInfo);
  } 
  
  const logOut = () => {
    return signOut();
  };

  
  


  const userInfo = {
    register,
    login,
    user,
    loading,
    logOut,
    updateUser


  }

  return (
    <AuthContext value={userInfo}>
      {children}
  </AuthContext>
   
  );
};

export default AuthProvider;