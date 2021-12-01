import { formatSeconds } from "./timerfunctions";
import { format } from 'date-fns'


const getAnalytics = (data, settings) => {
    let chartsData = {
        general_chart: {
            bar: getBarChartData(data, settings.general_chart),
            line: getLineChartData(data, settings.general_chart)
        },
        distribution_chart: getPieChartData(data)

    }
    return chartsData
}
export default getAnalytics;





const getLineChartData = (data, settings) => {
    let filtered = filterLineDataByTime(data, settings)
    let bundeled = bundleLineChartData(filtered)
    return bundeled
}

const bundleLineChartData = (filtered) => {


    let data = filtered ? filtered : []

    let refactored = {
        data: [],
    }


    data.forEach((element) => {
        let current = []
        element.forEach((point, i) => {
            current.push({ x: point.x, y: point.y })
        })
        refactored.data.push(current)
    })
    return refactored
}

const filterLineDataByTime = (data, settings) => {
    if (!data.all_logs[0]) return



    // average
    let between = { start: data.all_logs[data.all_logs.length - 1].start, end: Math.round(new Date().getTime() / 1000) }


    let amount = settings.time / settings.gap

    let grouped = {}

    for (let i = Math.floor(between.start / settings.gap); i < Math.ceil(between.end / settings.gap); i++) {
        grouped[i] = 0
    }



    data.all_logs.forEach((log) => {
        let unit = Math.floor(log.start / settings.gap)
        grouped[unit] += log.duration
    })


    

    let groupedArr = []

    for(let day in grouped){
        groupedArr.push(
            {day: parseInt(day, 10), duration: grouped[day]}
        )
    }

    let average = []

    for (let i = 0; i < amount; i++) {
        average.push(0)
    }

    let y = 0
    let i = 0
    groupedArr.reverse().forEach((element)=>{
        average[i] += element.duration

        i++
        if (i === amount) i = 0
        y++
    })

    average.reverse()

    y = Math.ceil(y / amount)

    average.forEach((element, i) => {
        average[i] = element / y
    })


    // previous
    let previous = []
    let last = []

    for (let i = 0; i < amount; i++) {

        let val = grouped[Math.ceil(between.end / settings.gap) - amount + i]
        last.push(val ? val : 0)

        val = grouped[Math.ceil(between.end / settings.gap) - amount * 2 + i]
        previous.push(val ? val : 0)
    }


    let chartData = [last, previous, average]



    let legend = []
    for (let i = 0; i < amount; i++ ){
        let time = (between.end - settings.time) + settings.gap *  (i +1)
        legend.push(getSensefulLegend(time, settings.time))
    }

    let labled = []

    chartData.forEach(line=>{
        let newLine = []
        line.forEach((point, i)=>{
            newLine.push({x: legend[i], y: point})
        })
        labled.push(newLine)
    })


    return (labled)

}

// general chart

const getBarChartData = (data, settings) => {
    let filtered = filterBarDataByTime(data, settings)
    let bundeled = bundleBarChartData(filtered)
    return bundeled
}


const bundleBarChartData = (data) => {


    let generalChartData = {
        labels: [],
        legend: [],
        data: [],
        barColors: ["#dfe4ea", "#ced6e0"]
    }

    let colors = []



    data.forEach((unit) => {
        // get all present projects
        unit.logs.forEach((log) => {
            if (generalChartData.legend.filter((project) => project === log.project).length === 0) {
                generalChartData.legend.push(log.project)
                if (colors.filter((color) => color === log.color).length === 0) {

                    colors.push(log.color)
                }
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


    let refactored = {
        data: [],
        colors: colors
    }

    generalChartData.legend.forEach((project, i) => {
        let refactoredProjects = []
        generalChartData.data.forEach((unit, y) => {

            refactoredProjects.push({
                x: generalChartData.labels[y],
                y: unit[i]
            })
        })
        refactored.data.push(refactoredProjects)
    })

    return (refactored)
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
        let time = getSensefulLegend(parseInt(unit) * settings.gap, settings.time)
        classifiedArray.push({ time: time, logs: classified[unit] })
    }

    return classifiedArray
}

const getSensefulLegend = (seconds, time) => {
    let d = new Date(seconds * 1000)
    let f;

    if (time === 604800) f = format(d, "EEE")
    if (time === 2592000) f = format(d, "d")
    if (time === 31536000) f = format(d, "MMM")


    return f
}