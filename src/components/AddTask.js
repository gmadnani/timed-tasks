import React, { useState } from 'react'
import TaskElement from './TaskElement';
import '../styles/AddTask.css'

function AddTask({token, user, setIsModalOpen, modalType}) {

    const initTaskCreation = () => {
        setIsModalOpen(true)
        modalType('Task')
    }

    return (
        <>
        <button className='material-icons fab' onClick={initTaskCreation}>add</button>
        </>
    )
}

export default AddTask