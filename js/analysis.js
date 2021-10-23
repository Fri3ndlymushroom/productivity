import { formatSeconds } from "./timerfunctions";




const getAnalytics = (data, settings) => {
    let chartsData = {
        general_chart: {
            bar: getBarChartData(data, settings.general_chart),
            line: getLineChartData(data, settings.general_chart)
        }

    }

    return chartsData
}
export default getAnalytics;

const getLineChartData = (data, settings) => {
    let filtered = filterLineDataByTime(data, settings)
}

const filterLineDataByTime = (data, settings) =>{
    if(!data.all_logs[0])return

    console.log(data)


    // average
    let between = {start: data.all_logs[data.all_logs.length -1].start, end: Math.round(new Date().getTime() / 1000)}

    let amount = settings.time / settings.gap

    let grouped = {}

    for(let i = Math.floor(between.start/settings.gap); i <  Math.ceil(between.end/settings.gap); i++){
        grouped[i] = 0
    }

    data.all_logs.forEach((log)=>{
        let unit = Math.floor(log.start / settings.gap)
        grouped[unit] += log.duration
    })

    let average = []

    for (let i = 0; i < amount; i++){
        average.push(0)
    }

    let y = 0
    let i = 0
    for(let element in grouped){
        average[i]+= grouped[element]

        i++
        if (i === amount) i = 0
        y ++
    }

    y = Math.ceil(y / amount)

    average.forEach((element, i)=>{
        average[i] = element / y
    })


    // previous
    let previous = []
    let last = []

    for(let i = 0; i < amount; i++){

        let val = grouped[Math.ceil(between.end/settings.gap) - amount + i]
        last.push( val ? val : 0)
        
        val = grouped[Math.ceil(between.end/settings.gap) - amount * 2 + i]
        previous.push( val ? val : 0)
    }


    let chartData = [last, previous, average]
    return (chartData)

}

// general chart

const getBarChartData = (data, settings) => {
    let filteredData = filterBarDataByTime(data, settings)
    return bundleBarChartData(filteredData)
}


const bundleBarChartData = (data) => {

    let generalChartData = {
        labels: [],
        legend: [],
        data: [],
        barColors: ["#dfe4ea", "#ced6e0"]
    }

    data.forEach((unit) => {
        // get all present projects
        unit.logs.forEach((log) => {
            if (generalChartData.legend.filter((project) => project === log.project).length === 0) {
                generalChartData.legend.push(log.project)
            }
        })

        //lables
        generalChartData.labels.push(unit.time)
    })

    // construct data
    data.forEach((unit) => {
        let chartUnitData = []

        generalChartData.legend.forEach((project) => {
            let relevant = unit.logs.filter((log) => log.project === project)
            let sum = 0

            relevant.forEach((projectLogs) => { sum += projectLogs.duration })

            chartUnitData.push(sum)
        })

        generalChartData.data.push(chartUnitData)
    })
    return (generalChartData)
}

const filterBarDataByTime = (data, settings) => {
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