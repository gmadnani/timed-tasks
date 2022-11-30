import React from 'react'
import '../styles/NavigationBar.css'
import {ReactComponent as Logo} from '../assets/logo.svg'

function NavigationBar({user, modalType, modalStatus}) {

    const imageUrl = user.photoURL
    
    const handleProfileClick = () =>{
        modalStatus(true)
        modalType('Profile')
    }

    return (
        <div className='NavigationBarContainer'>
            <div className='HeroTitleContainer'>
                <Logo className='NavigationViewLogoElement' />
            </div>
            <div className='UserProfileContainer'>
                <img 
                   alt='User Profile' referrerPolicy='no-referrer' src={imageUrl} onClick={handleProfileClick}></img>
            </div>
        </div>
    )
}

export default NavigationBar