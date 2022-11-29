import React, { useState } from 'react'
import '../styles/TaskLists.css'
import AddTask from './AddTask'
import NavigationBar from './NavigationBar'
import TaskElement from './TaskElement'
import TaskStack from './TaskStack'
import UserProfile from './UserProfile'

function TaskLists({token, user}) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('Task')

  const popup = ()=>{
    if(modalType === 'Task'){
      return(
        <div className='modalAndTaskWrapperItem popup'>
          <div className='modalElementsContainer'>
            <TaskElement bToken={token} user={user} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )
    }else if(modalType === 'Profile'){
      return(
        <div className='modalAndTaskWrapperItem popup'>
          <div className='modalElementsContainer'>
            <UserProfile user={user} setIsModalOpen={setIsModalOpen}/>
          </div>
        </div>
      )
    }
  }



  return (
    <div className='tasksListContainer'>
      <AddTask token={token} user={user} setIsModalOpen={setIsModalOpen} modalType={setModalType}/>
      <div className='modalAndTaskWrapperContainer'>
        <div className='modalAndTaskWrapperItem'>
          <NavigationBar user={user} modalStatus={setIsModalOpen} modalType={setModalType}/>
          <TaskStack token={token} user={user} modalStatus={isModalOpen}/>
        </div>
        {isModalOpen? popup(): null}
      </div>
    </div>
  )
}

export default TaskLists