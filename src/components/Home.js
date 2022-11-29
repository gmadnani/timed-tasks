import React, { useEffect, useState } from 'react'
import { getAuth } from "firebase/auth"; 
import axios from 'axios'
import TaskLists from './TaskLists';
import '../styles/Home.css'

export default function Home() {

    const [token, setToken] = useState('')
    const [fUser, setUser] = useState('')

    const user = getAuth().currentUser
    user.getIdToken().then((token) => setToken(token))
    
    const fetchUserDetails = async (token) => {
            const res = await axios.get("https://timedtask-server.up.railway.app/getusermeta", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data)
    }

    useEffect(()=>{
        if(token){
            //fetchUserDetails(token)
        }
    }, [token])

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