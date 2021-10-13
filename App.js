import React, { useState, useEffect } from 'react';
import RootNavigator from './routes/draw'
import { addDays } from "date-fns"


export default function App() {

	const [data, setData] = useState({
		refactored: false,
		projects: [
			{
				name: "MMonitor",
				running: false,
				logs: []
			},
			{
				name: "HyperTyper",
				running: false,
				logs: []
			}
		],
		all_logs: [
			{
				project: "MMonitor",
				day: 18913,
				start: 1634159644,
				end: 1634159744,
				duration: 100
			},
			{
				project: "MMonitor",
				day: 18913,
				start: 1634159844,
				end: 1634159944,
				duration: 100
			},
			{
				project: "HyperTyper",
				day: 18913,
				start: 1634159144,
				end: 1634159244,
				duration: 100
			},
		],
		daily_logs:[]
	})
	useEffect(()=>{
		if(!data.refactored){
			let dataCopy = { ...data }
			dataCopy.refactored = true
			dataCopy.daily_logs = []
	
			let neededDays = []
			dataCopy.all_logs.forEach((log)=>{
				if(neededDays.filter((day)=>day === log.day).length === 0){
					neededDays.push(log.day)
				}
			})
	
			neededDays.forEach(function(day){
				let logs = dataCopy.all_logs.filter((log)=>log.day === day)
	
				let neededProjects = []
				logs.forEach((log)=>{
					if(neededProjects.filter((project)=>project === log.project).length === 0){
						neededProjects.push(log.project)
					}
				})
	
				let sortedLogs = []
	
				neededProjects.forEach((project)=>{
					sortedLogs.push({name: project, logs: logs.filter((log)=>log.project === project)})
				})
	
				dataCopy.daily_logs.push({
					day: day,
					projects:sortedLogs
				})
			})
	
	
			dataCopy.projects.forEach((project)=>{
				project.logs = dataCopy.all_logs.filter((log)=>log.project === project.name)
			})
	
	
	
	
	
			setData(dataCopy)

		}

	}, [data])


	console.log(data)

	return (
		<RootNavigator screenProps={{ ...{ data, setData } }} />
	);
}

// packages:
// react-navigation
// react-native-gesture-handler
// react-native-reanimated
// react-native-screens
// react-navigation-stack
// react-navigation-drawer