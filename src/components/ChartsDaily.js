import React, { useEffect, useState } from 'react'
import {Bar, Line, Doughnut} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios'

Chart.register(...registerables);

function ChartsDaily({user, task}) {
    
    const [initialFetch, setInitialFetch] = useState(false)
    const [graphData, setGraphData] = useState({})
    const [logValues, setLogValues] = useState([])

    const fetchDailyLogs = async () =>{
        setInitialFetch(true)
        const res = await axios.get('http://localhost:4000/api/getDailyLogs', {
            params: { userId: user.uid, taskId: task.taskId },
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        const labels = []
        const timeValues = []
        
        console.log('Values Loaded')
        setLogValues(res.data)
        
        res.data.map((element)=>{
            labels.push(element.date)
            timeValues.push(((element.time / 60) / 60))
            return null
        })
        
        const colors=['#3fb5a3', '#3f51b5']
        const dataForGraph = {
            labels: labels,
            datasets: [
            {
                fill: true,
                label: task.taskTitle,
                backgroundColor: colors,
                borderColor: colors,
                data: timeValues,
            },
            ],
        }

        setGraphData(dataForGraph)

    }
    

    

    useEffect(()=>{
        if(initialFetch === false){
            fetchDailyLogs()
        }
    },[graphData, logValues])

    return (
        <>
            <div className='BarGraphContainer'>
                {(graphData.labels !== undefined)? <Bar options={{ maintainAspectRatio: false }} className="TaskAnalyticsDailyBarGraphElement" data={graphData} /> : null}
            </div>
            <div className='BarGraphContainer'>
                {(graphData.labels !== undefined)? <Line options={{ maintainAspectRatio: false }} className="TaskAnalyticsDailyBarGraphElement" data={graphData} /> : null}
            </div>
            <div className='BarGraphContainer'>
                {(graphData.labels !== undefined)? <Doughnut options={{ maintainAspectRatio: false }} className="TaskAnalyticsDailyBarGraphElement" data={graphData} /> : null}
            </div>
        </>
    )
}

export default ChartsDaily