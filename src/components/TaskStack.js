import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/TaskStack.css'
import TaskCard from './TaskCard'

function TaskStack({token, user, modalStatus}) {
    const [fetchDate, setFetchDate] = useState('All')
    const [taskList, setTaskList] = useState([])

    const handleSpecificDateChange = async (e) =>{
        if(token){
            const res = await axios.get('http://localhost:4000/api/gettasklistfordate', {
                    params: { userId: user.uid, dateForFetch: e.target.value},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                
                if(res.data !== 'No Data'){
                    setTaskList(res.data)
                }else{
                    setTaskList([])
                }
        }
    }

    const isDateInputVisible = () =>{
        if(fetchDate === 'Specific Date'){
            return <input className='TaskStackDateSelectorDateElement' type='date' onChange={handleSpecificDateChange}/>
        }else{
            return null
        }
    }

    const isNoRecordsElementVisible = () =>{
        if(taskList.length === 0){
            return <p className='TaskStackNoRecordsElement'>No Tasks Found for this Date</p>
        }else{
            return null
        }
    }


    const fetchTasks = async (dateToFetch) =>{
        if(token){
            if(dateToFetch === 'All'){
                const res = await axios.get('http://localhost:4000/api/gettasklist', {
                    params: { userId: user.uid },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                
                if(res.data !== 'No Data'){
                    setTaskList(res.data)
                }else{
                    setTaskList([])
                }

            }if(dateToFetch === 'Today'){
                const todayDate = new Date(); 
                const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
                const formatMonth = todayDate.getMonth() + 1 < 10 ? `0${todayDate.getMonth() + 1}`: todayDate.getMonth() + 1;
                const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
                const res = await axios.get('http://localhost:4000/api/gettasklistfordate', {
                    params: { userId: user.uid, dateForFetch: formattedDate},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                
                if(res.data !== 'No Data'){
                    setTaskList(res.data)
                }else{
                    setTaskList([])
                }

            }if(dateToFetch === 'Yesterday'){
                const todayDate = new Date(); 
                const formatDate = todayDate.getDate() - 1 < 10 ? `0${todayDate.getDate()}`:todayDate.getDate() - 1;
                const formatMonth = todayDate.getMonth() + 1 < 10 ? `0${todayDate.getMonth() + 1}`: todayDate.getMonth() + 1;
                const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
                const res = await axios.get('http://localhost:4000/api/gettasklistfordate', {
                    params: { userId: user.uid, dateForFetch: formattedDate},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

                if(res.data !== 'No Data'){
                    setTaskList(res.data)
                }else{
                    setTaskList([])
                }

            }if(dateToFetch === 'Tomorrow'){
                const todayDate = new Date(); 
                const formatDate = todayDate.getDate() + 1 < 10 ? `0${todayDate.getDate()}`:todayDate.getDate() + 1;
                const formatMonth = todayDate.getMonth() + 1 < 10 ? `0${todayDate.getMonth() + 1}`: todayDate.getMonth() + 1;
                const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
                const res = await axios.get('http://localhost:4000/api/gettasklistfordate', {
                    params: { userId: user.uid, dateForFetch: formattedDate},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                
                if(res.data !== 'No Data'){
                    setTaskList(res.data)
                }else{
                    setTaskList([])
                }
            }else{
                
            }
        }
    }

    useEffect(()=>{
        if(modalStatus === false){
            fetchTasks(fetchDate)
        }
    }, [token,fetchDate, modalStatus])

    return (
        <>
            <div className='TaskStackDateSelectorContainer'>
                <p className='TaskStackDateSelectorParagraphElement'>Tasks Due for</p>
                <select className='TaskStackDateSelectorSelectElement' onChange={(e) => setFetchDate(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Specific Date">Specific Date</option>
                </select>
                {isDateInputVisible()}
            </div>
            {isNoRecordsElementVisible()}
            <div className='TaskStackTaskListContainer'>
                {taskList.map((task)=>{
                    return <TaskCard key={task.taskId} user={user} task={task} dateToFetch={fetchDate} fetchTasks={fetchTasks}/>
                })}
            </div>
        </>
    )
}

export default TaskStack