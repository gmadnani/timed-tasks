import React, { useEffect, useState } from 'react'
import {Bar, Line, Doughnut} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios'

Chart.register(...registerables);

function ChartsYearly({user, task}) {
    const [initialFetch, setInitialFetch] = useState(false)
    const [graphData, setGraphData] = useState({})

    const fetchDailyLogs = async () =>{
        setInitialFetch(true)
        const res = await axios.get('http://localhost:4000/api/getYearlyLogs', {
            params: { userId: user.uid, taskId: task.taskId },
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        const labels = []
        const timeValues = []
        res.data.map((element)=>{
            labels.push(element.year)
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
    },[graphData])

    const displayGraphs = () => {
        if(graphData.labels !== undefined && graphData.labels.length > 0){
            return(
                <>
                <div className='BarGraphContainer'>
                    <Bar options={{ maintainAspectRatio: false }} className="TaskAnalyticsDailyBarGraphElement" data={graphData} />
                </div>
                <div className='BarGraphContainer'>
                    <Line options={{ maintainAspectRatio: false }} className="TaskAnalyticsDailyBarGraphElement" data={graphData} />
                </div>
                <div className='BarGraphContainer'>
                    <Doughnut options={{ maintainAspectRatio: false }} className="TaskAnalyticsDailyBarGraphElement" data={graphData} />
                </div>
                </>
            )
        }else{
            return null
        }
    }
    return (
       displayGraphs()
    )
}

export default ChartsYearly