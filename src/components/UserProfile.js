import React from 'react'
import { getAuth, signOut } from "firebase/auth"; 
import '../styles/UserProfile.css'

function UserProfile({user, setIsModalOpen}) {

    const imageUrl = user.photoURL
    const handleCloseClick = () =>{
        setIsModalOpen(false)
    }

    const handleUserLogout = () =>{
        const auth = getAuth();
        signOut(auth).then(()=>{
            window.location.reload()
        })
    }

    return (
        <div className='UserDetailsContainer'>
            <img alt='User Profile' className='UserDetailImageElement' referrerPolicy='no-referrer' src={imageUrl}></img>
            <p className='UserDetailDisplayNameElement'>{user.displayName}</p>
            <p className='UserDetailDisplayEmailElement'>{user.email}</p>
            <button className='UserDetailDisplayButton' onClick={handleUserLogout}>Logout</button>
            <button className='UserDetailDisplayButton' onClick={handleCloseClick}>Close</button>
        </div>
  )}

export default UserProfile