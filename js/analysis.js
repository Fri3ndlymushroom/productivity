import { formatSeconds } from "./timerfunctions";




const getAnalytics = (data, settings) => {
    let chartsData = {
        general_chart: getGeneralChartData(data, settings.general_chart)
    }

    return chartsData
}
export default getAnalytics;



// general chart

const getGeneralChartData = (data, settings) => {
    let filteredData = filterDataByTime(data, settings)
    let generalChartData =  bundleGeneralChartData(filteredData)
    return generalChartData
}

const bundleGeneralChartData = (data) => {

    let generalChartData = {
        labels: [],
        legend: [],
        data: [],
        barColors: ["#dfe4ea", "#ced6e0"]
    }

    data.forEach((unit)=>{
        // get all present projects
        unit.logs.forEach((log)=>{
            if (generalChartData.legend.filter((project)=>project === log.project).length === 0){
                generalChartData.legend.push(log.project)
            }
        })

        //lables
        generalChartData.labels.push(unit.time)
    })

    // construct data
    data.forEach((unit)=>{
        let chartUnitData = []

        generalChartData.legend.forEach((project)=>{
            let relevant = unit.logs.filter((log)=>log.project === project)
            let sum = 0

            relevant.forEach((projectLogs)=>{sum+= projectLogs.duration})

            chartUnitData.push(sum)
        })

        generalChartData.data.push(chartUnitData)
    })
    return(generalChartData)
}

const filterDataByTime = (data, settings) => {
    let now = Math.round(new Date().getTime() / 1000)
    let allowed = now - settings.time

    let filtered = (data.all_logs.filter((log) => log.start >= allowed && log.start <= now))

    let amount = settings.time / settings.gap

    let classified = {}

    for (let i = 0; i < amount; i++) {
        let time = (Math.ceil(now / settings.gap) - settings.time / settings.gap) + i
        classified[time] = []
    }
    
    filtered.forEach((log) => {
        let time = Math.floor(log.start / settings.gap)
        classified[time].push(log)
    })

    let classifiedArray = []

    for (let unit in classified) {
        let time = formatSeconds(parseInt(unit) * settings.gap, "dd, MM")
        classifiedArray.push({ time: time, logs: classified[unit] })
    }

    return classifiedArray
}