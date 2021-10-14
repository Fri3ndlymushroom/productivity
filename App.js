import React, { useState, useEffect } from 'react';
import RootNavigator from './routes/draw'
import { addDays } from "date-fns"


export default function App() {

	const [data, setData] = useState({
		refactored: false,
		running: { running: false, start: 0, project: "", duration: 0 },
		projects: [
			{
				name: "MMonitor",
				logs: []
			},
			{
				name: "HyperTyper",
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
		daily_logs: []
	})
	useEffect(() => {
		if (!data.refactored) {
			let dataCopy = { ...data }
			dataCopy.refactored = true
			dataCopy.daily_logs = []

			let neededDays = []
			dataCopy.all_logs.forEach((log) => {
				if (neededDays.filter((day) => day === log.day).length === 0) {
					neededDays.push(log.day)
				}
			})

			neededDays.forEach(function (day) {
				let logs = dataCopy.all_logs.filter((log) => log.day === day)

				let neededProjects = []
				logs.forEach((log) => {
					if (neededProjects.filter((project) => project === log.project).length === 0) {
						neededProjects.push(log.project)
					}
				})

				let sortedLogs = []

				neededProjects.forEach((project) => {
					let projectLogs = logs.filter((log) => log.project === project)
					let time = 0
					projectLogs.forEach((log) => { time += log.duration })
					sortedLogs.push({ name: project, logs: projectLogs, total_duration: time })
				})

				dataCopy.daily_logs.push({
					day: day,
					projects: sortedLogs
				})
			})


			dataCopy.projects.forEach((project) => {
				project.logs = dataCopy.all_logs.filter((log) => log.project === project.name)
			})





			setData(dataCopy)

		}

	}, [data])

	useEffect(() => {
		setInterval(() => {
			if (data.running.running) {
				let copy = { ...data }

				copy.running.duration += 1
				setData(copy)
			}
		}, 1000)
	}, [])


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