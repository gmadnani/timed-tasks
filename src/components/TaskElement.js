import axios from 'axios';
import React, { useState } from 'react'

import '../styles/TaskElement.css'

export default function TaskElement({bToken, user, setIsModalOpen}) {
    const token = bToken

    const todayDate = new Date(); 
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
    const formatMonth = todayDate.getMonth() + 1 < 10 ? `0${todayDate.getMonth() + 1}`: todayDate.getMonth() + 1;
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');

    const [task, setTask] = useState({
        taskTitle: '',
        taskCategory: '',
        taskKeywords: '',
        taskTimer: 0,
        taskRevisionDate: formattedDate
    })

    const [validateTitle, setValidateTitle] = useState('-1')
    const [validateCategory, setValidateCategory] = useState('-1')

    const handleModalClearButton = () => {
        setIsModalOpen(false)
    }

    const inputValidations = (e) => {
        e.preventDefault()
        if(!task.taskTitle){
            setValidateTitle('Title Can\'t be Empty')
        }
        if(!task.taskCategory){
            setValidateCategory('Category Can\'t be Empty')
        }
        if(task.taskTitle && task.taskCategory){
            handleTaskCreation()
        }
    }

    const handleTaskCreation = async (e) => {
        const headers = {Authorization: `Bearer ${token}`}
        
        //const count = await axios.get('https://timedtask-server.up.railway.app/api/gettaskscount',{ params: { userId: user.userId } }, {headers: headers})
        const countData = await axios.get('https://timedtask-server.up.railway.app/api/gettaskscount', {
            params: { userId: user.uid },
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        })
        
        const count = countData.data.count
        const taskData = {userId: user.uid, taskId: `task${count + 1}`, ...task}
        axios
            .post('https://timedtask-server.up.railway.app/api/createtasks', taskData, {headers: headers})
            .then(() => setIsModalOpen(false))
            .catch((e) => console.log(e.message))
    
        } 

  return (
    <div className="TaskElementContainer">
            <div className='FormElementContainer'>
                <form onSubmit={inputValidations}>
                    <p className='TaskElementTitle'>Add New Task</p>
                    <div className='TaskElementIndividualContainer'>
                        <input className='TaskElement' type='text' placeholder='Task Title' value={task.taskTitle} 
                        onChange={e => setTask({...task,taskTitle : e.target.value})}/>
                        {validateTitle !== '-1'? <span className='TaskElementErrorHighlighterElement'>{validateTitle}</span> : null}
                    </div>
                    
                    <div className='TaskElementIndividualContainer'>
                        <input className='TaskElement' type='text' placeholder='Category' value={task.taskCategory} onChange={e => setTask({...task,taskCategory : e.target.value})}/>
                        {validateCategory !== '-1'? <span className='TaskElementErrorHighlighterElement'>{validateCategory}</span> : null}
                    </div>
                    <div className='TaskElementIndividualContainer'>
                        <input className='TaskElement' type='text' placeholder='keywords' value={task.taskKeywords}onChange={e => setTask({...task,taskKeywords : e.target.value})}/>
                    </div>
                    <div className='TaskElementIndividualContainer'>
                        <input className='TaskElement' type='date' placeholder='Next Revision Date' value={task.taskRevisionDate}onChange={e => setTask({...task,taskRevisionDate : e.target.value})}/>
                    </div>
                    
                    <div className='TaskElementIndividualContainer'><button className='TaskElement' type='submit'>Add</button></div>
                </form>
                <div className='ClearButtonTaskElementContainer'><button className='TaskElement' onClick={handleModalClearButton} type='cancel'>Clear</button></div>
            </div>
    </div>
  )
}
