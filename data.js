import { copyObject, randomIntBetween } from "./js/functions"
import { iconNames, colorPalette } from "./styles/global"
import { v4 as uuidv4 } from 'uuid';

let shouldGenerateDummyData = true


let emptyData = {
    lastbackup: 0,
    timer: {
        running: false,
        start: 0,
        project: "",
        duration: 0
    },
    projects: [],
    all_logs: [],
    daily_logs: []
}

const generateDummyData = () => {
    // create object
    let generated = copyObject(emptyData)
    let start = 1612873008
    let end = Math.round(new Date().getTime() / 1000) 

    // generate projects
    let projects = ["School", "Reading", "Sports", "Programming", "Studying"]
    let colors = ["#6441C8", "#3DD6BA", "#EC2964", "#D6C63D", "#518DD4"]

    projects.forEach((projectName, i)=>{
        let newProject = {
            name: projectName,
            pid: "P_" + uuidv4(),
            logs: [],
            color: colors[i],
            icon: iconNames[Math.floor(Math.random()*iconNames.length)]
        }
        let now = start
        let weight = randomIntBetween(1, 100) / 100

        while (now < end){
            let duration = randomIntBetween(900, 14400)
            let gapToNext = randomIntBetween(14400, 200000)


            let newLog = {
                project: projectName,
                pid: newProject.pid,
                lid: "L_" + uuidv4(),
                day: Math.floor(now / 60 / 60 / 24),
                start: now,
                end: now + duration * weight,
                duration: duration * weight,
                color: newProject.color,
            }

            newProject.logs.push(newLog)
            generated.all_logs.push(newLog)

            now += duration + gapToNext
        }
        generated.projects.push(newProject)
    })


    return (generated)
}

export let productionData = ( !shouldGenerateDummyData ? emptyData : generateDummyData())

export let dummyData = {
    lastbackup: 0,
    timer: {
        running: false,
        start: 0,
        project: "",
        duration: 0
    },
    projects: [
        {
            name: "MMonitor",
            pid: "P_399966c6-ba0d-48ae-be0f-700e4157fbb0",
            logs: [],
            color: "#EC2964",
            icon: "cube"
        },
        {
            name: "HyperTyper",
            pid: "P_82d0c204-bfae-4f11-aafc-5bcd8a1a670a",
            logs: [],
            color: "#3DD6BA",
            icon: "cube"
        }
    ],
    all_logs: [
        {
            project: "MMonitor",
            pid: "P_399966c6-ba0d-48ae-be0f-700e4157fbb0",
            lid: "L_663c4868-b5fe-4199-8ba8-a10f1909f999",
            day: 18913,
            start: 1634159644,
            end: 1634159744,
            duration: 100,
            color: "#EC2964"
        },
        {
            project: "MMonitor",
            pid: "P_399966c6-ba0d-48ae-be0f-700e4157fbb0",
            lid: "L_b14e8ef9-a34d-49d5-b370-35f3f8348bab",
            day: 18913,
            start: 1634159844,
            end: 1634159944,
            duration: 100,
            color: "#6441C8"
        },
        {
            project: "HyperTyper",
            pid: "P_82d0c204-bfae-4f11-aafc-5bcd8a1a670a",
            lid: "L_d4becc8b-2b9a-4b56-b014-e80805fc2a9e",
            day: 18913,
            start: 1634159144,
            end: 1634159244,
            duration: 100,
            color: "#3DD6BA",
        },
    ],
    daily_logs: []
}

export let defaultSettings = {
    start_of_day: 7200, //2h
    daily_goal: 3600,
    style: "dark"
}