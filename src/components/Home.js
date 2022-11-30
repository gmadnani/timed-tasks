import React, { useState } from 'react'
import { getAuth } from "firebase/auth"; 
import TaskLists from './TaskLists';
import '../styles/Home.css'

export default function Home() {

    const [token, setToken] = useState('')
    
    const user = getAuth().currentUser
    user.getIdToken().then((token) => setToken(token))
    
    return (
        <div className='homeContainer'>
            <TaskLists user={user} token={token}/>
        </div>
    )
}

/** 
 * <TaskElement bToken={token} user={fUser}/>
 * 
*/