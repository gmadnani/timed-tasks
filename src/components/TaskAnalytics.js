import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { getAuth } from "firebase/auth";
import '../styles/TaskAnalytics.css' 
import ChartsDaily from './ChartsDaily';
import ChartsMonthly from './ChartsMonthly';
import ChartsYearly from './ChartsYearly';

function TaskAnalytics() {
    
    
    
    const {taskId} = useParams()
    const [taskElement, setTaskElement] = useState({})
    const [initialFetch, setInitialFetch] = useState(false)
    

    const user = getAuth().currentUser
    const fetchTask = async () =>{
        const res = await axios.get('https://timedtask-server.up.railway.app/api/getTask', {
                    params: { userId: user.uid, taskId: taskId },
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                })
    
        setTaskElement(res.data)
        setInitialFetch(true)
    }
    
    useEffect(()=>{
        if(user && initialFetch === false){
            fetchTask()
        }
    })

    const shouldDisplayData = () =>{
        if(taskElement !== {} && taskElement.taskTitle !== undefined){
            return (
                <div className='TaskAnalyticsContainer'>
                    <div className='TaskAnalyticsTaskDetailsContainer'>
                        <p className='TaskCardCategoryElement'>{taskElement.taskCategory}</p>
                        <p className='TaskCardTitleElement'>{taskElement.taskTitle}</p>
                        <div className='TaskCardKeywordsContainer'>
                            {taskElement.taskKeywords.split(',').map((keyword)=>{
                                if(keyword){
                                    return <p key={keyword} className='TaskCardKeywordElement'>{keyword}</p>
                                }
                                return null
                            })}
                        </div>
                    </div>
                    <ChartsDaily user={user} task={taskElement}/>
                    <ChartsMonthly user={user} task={taskElement}/>
                    <ChartsYearly user={user} task={taskElement}/>
                </div>
            )
        }else{
            return null
        }
    }

    return (
        <>
          {shouldDisplayData()}
        </>
    )
}

export default TaskAnalytics