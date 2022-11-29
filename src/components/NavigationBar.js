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
                    referrerPolicy='no-referrer' src='https://lh3.googleusercontent.com/a/ALm5wu0mU0fRG0wyqay-BZ5nj5ERuCykmLHspERDNIAxog=s96-c' onClick={handleProfileClick}></img>
            </div>
        </div>
    )
}

export default NavigationBar