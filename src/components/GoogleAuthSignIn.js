import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default function GoogleAuthSignIn(props) {
  
    const AuthErrors = {
        AUTH_POP_CLOSED: 'auth/popup-closed-by-user'
    }

    const handleSignInWithGoogle = () =>{
        signInWithPopup(getAuth(), new GoogleAuthProvider())
        .then((result) =>{
            props.authCheck.authStatusChanger(true)
        })
        .catch(
            (error) => {
                if(error.code !== AuthErrors.AUTH_POP_CLOSED){
                    console.log(error.message)
                    //TODO: Redirect to Error Page
                }
        })
    }

    return (
    <div>
        <button onClick={handleSignInWithGoogle}>SignIn with Google</button>
    </div>
  )
}
