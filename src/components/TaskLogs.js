import React from 'react'

function TaskLogs({logValues}) {
    const displayDailyLogs = () =>{
        console.log('display runs')
        console.log(logValues.time)
        if(logValues.time !== undefined){
            return(
                <div className='TaskLogsContainerContent'>
                    <span className='TaskLogsDateHeading'>2022/11/10 -</span>
                    <span className='TaskLogsDateValue'>{`${logValues.time} hr`}</span>
                </div>
            )
        }else{
            return(
                <div className='TaskLogsContainerContent'>
                    <span className='TaskLogsDateHeading'>Nothing to Display</span>
                    <span className='TaskLogsDateValue'></span>
                </div>
            )
        }
        
    }
  
    return (
        <>
        {displayDailyLogs()}
        </>
    )
}

export default TaskLogs