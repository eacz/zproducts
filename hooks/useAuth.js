import React, { useState, useEffect } from 'react';
import firebase from '../firebaseF';

//hooks for constantly get authenticated on firebase, return an authenticated user

function useAuth() {
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        const unSuscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setUserAuth(user);
            } else {
                setUserAuth(null);
            }
        });
        return () => unSuscribe();
    }, []);

    return userAuth
}

export default useAuth;
