import React, { useEffect, useState } from 'react'
import axios from 'axios';

function TaskTimer({task, user, revisionDate}) {

    const [isTimerOn, setIsTimerOn] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useEffect(()=>{
        if(isTimerOn === true){
            const timer = setInterval(()=>{
                setSeconds(seconds + 1)
    
                if(seconds === 59){
                    setMinutes(minutes + 1)
                    setSeconds(0)
                }
    
            }, 1000)
    
            return ()=>{
                clearInterval(timer)
            }
        }
    })

    const toSeconds = (min,sec) => (min*60+sec);


    const handlePlayButtonClick = (e) =>{
        setSeconds(0)
        setMinutes(0)
        setIsTimerOn(true)
    }

    const handleStopButtonClick = (e) =>{
        setIsTimerOn(false)
        const timeInMilliSeconds = toSeconds(minutes, seconds)
        task.taskTimer = task.taskTimer + timeInMilliSeconds
        const taskElement = task
        taskElement.taskRevisionDate = revisionDate
        const headers = {Authorization: `Bearer ${user.accessToken}`}
        axios
            .post('https://timedtask-server.up.railway.app/api/updateTask', taskElement, {headers: headers})
            .then(() => console.log("Updated Task"))
            .catch((e) => console.log(e.message))
        
        axios
            .post('https://timedtask-server.up.railway.app/api/logTimeForTask', {task: taskElement, timeLogger: timeInMilliSeconds}, {headers: headers})
            .then(() => console.log("Updated Task"))
            .catch((e) => console.log(e.message))
    }

    const displayButtonByTimerStatus = () =>{
        if(isTimerOn){
            return (
                <>
                <span className='TaskCardTimerElement'>{minutes < 10? `0${minutes}` : minutes}:{seconds < 10? `0${seconds}`: seconds}</span>
                <button className='material-icons TaskCardPlayElement' onClick={handleStopButtonClick}>stop</button>
                </>
            )
        }else{
            return <button className='material-icons TaskCardPlayElement' onClick={handlePlayButtonClick}>play_arrow</button>
        }
    }

    return (
        <div className='TaskCardTimerContainer'>
            {displayButtonByTimerStatus()}
        </div>
    )
}

export default TaskTimer