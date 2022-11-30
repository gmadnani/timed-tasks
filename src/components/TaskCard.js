import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/TaskCard.css'
import TaskTimer from './TaskTimer'
import axios from 'axios';

function TaskCard({task, user, fetchTasks, dateToFetch}) {

  const [revisionDate, setRevisionDate] = useState(task.taskRevisionDate)
  const [isBeingEdited, setIsBeingEdited] = useState(false)

  const [taskElement, setTaskElement] = useState(task)

  const navigate = useNavigate()

  const handleDateChangeEvent = (e) => {
    setRevisionDate(e.target.value)
    const task = taskElement
    
    task.taskRevisionDate = e.target.value
    setTaskElement(task)
    const headers = {Authorization: `Bearer ${user.accessToken}`}
    axios
      .post('https://timedtask-server.up.railway.app/api/updateTask', task, {headers: headers})
      .catch((e) => console.log(e.message))
    fetchTasks(dateToFetch)
  }

  const handleEditClick = (e) => {
    setIsBeingEdited(true)
  }

  const handleClearClick = (e) => {
    setIsBeingEdited(false)
  }

  const handleTaskUpdate = (e) => {
    const headers = {Authorization: `Bearer ${user.accessToken}`}
    axios
      .post('https://timedtask-server.up.railway.app/api/updateTask', taskElement, {headers: headers})
      .catch((e) => console.log(e.message))
    setIsBeingEdited(false)
    fetchTasks(dateToFetch)
  }

  const handleDeleteClick = (e) => {
    const headers = {Authorization: `Bearer ${user.accessToken}`}
    axios
      .post('https://timedtask-server.up.railway.app/api/deleteTask', taskElement, {headers: headers})
      .catch((e) => console.log(e.message))
    fetchTasks(dateToFetch)
  }

  const handleInsightsClick = (e) => {
    navigate(`tasks/${taskElement.taskId}`)
  }

  const displayElements = () =>{
    if(isBeingEdited === false){
      return(
        <div className='TaskCardContainer'>
          <div className='TaskCardEditContainer'>
            <div className='TaskCardEditInlineContainer'>
              <button className='material-icons TaskCardEditElement' onClick={handleDeleteClick}>delete</button>
              <button className='material-icons TaskCardEditElement' onClick={handleInsightsClick}>insights</button>
              <button className='material-icons TaskCardEditElement' onClick={handleEditClick}>edit</button>
            </div>
          </div>
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
          <p className='TaskCardRevisionDateElement'>Next Revision Date</p>
          <div className='TaskCardDateElementContainer'>
              <input className='TaskCardDateElement' type='date' value={revisionDate} onChange={handleDateChangeEvent}/>
          </div>
          <TaskTimer task={taskElement} user={user} revisionDate={revisionDate}/>
        </div>
      )
    }else{
      return(
        <div className='TaskCardContainer'>
        
        <div className='TaskCardClearContainer'>
            <button className='material-icons TaskCardClearElement' onClick={handleClearClick}>close</button>
        </div>

        <input 
          type='text' 
          className='TaskCardEditInput TaskCardCategoryEditInputElement' 
          placeholder='Category' 
          value={taskElement.taskCategory} 
          onChange={e => 
            setTaskElement({...taskElement, taskCategory : e.target.value})
          }/>
          
        <input 
          type='text' 
          className='TaskCardEditInput TaskCardTitleEditInputElement' 
          placeholder='Title' 
          value={taskElement.taskTitle} 
          onChange={e => 
            setTaskElement({...taskElement, taskTitle : e.target.value})
          }/>

          <input 
          type='text' 
          className='TaskCardEditInput TaskCardKeywordsEditInputElement' 
          placeholder='Comma (,) Seperated Keywords' 
          value={taskElement.taskKeywords} 
          onChange={e => 
            setTaskElement({...taskElement, taskKeywords : e.target.value})
          }/>

          <p className='TaskCardRevisionDateElement'>Next Revision Date</p>
          <div className='TaskCardDateElementContainer'>
              <input className='TaskCardDateElement' type='date' value={revisionDate} onChange={handleDateChangeEvent}/>
          </div>
          <div className='TaskCardTimerContainer'>
            <button className='material-icons TaskCardEditSubmitButton' onClick={handleTaskUpdate}>done</button>
          </div>
        </div>
      )
    }
  }


  return (
    displayElements()
  )
}

export default TaskCard