import { intervalToDuration, format, secondsToHours } from 'date-fns'



export function secondsToFormatedString(seconds) {
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 })

    let stringified = { hours: duration.hours.toString(10), minutes: duration.minutes.toString(10), seconds: duration.seconds.toString(10) }
    if (stringified.hours.length == 1) stringified.hours = "0" + stringified.hours
    if (stringified.minutes.length == 1) stringified.minutes = "0" + stringified.minutes
    if (stringified.seconds.length == 1) stringified.seconds = "0" + stringified.seconds

    if (stringified.hours === "00") {
        return stringified.minutes + " " + stringified.seconds
    } else {
        return stringified.hours + " " + stringified.minutes + " " + stringified.seconds
    }


}





export const  formatSeconds = (seconds, formatstr) => {
    if(isNaN(seconds))return "invalid"

    let dc = new Date(seconds * 1000)


    //const dc = new Date(d.valueOf() - d.getTimezoneOffset() * 60 * 1000)

    
    let f = format(dc, formatstr)

    return f
}


export const secondsToDuration = (sec, format={h: true, m: true, s: true, b: [":", ":"]}) =>{
    let hours   = Math.floor(sec / 3600)
    let minutes = Math.floor((sec - (hours * 3600)) / 60)
    let seconds = sec - (hours * 3600) - (minutes * 60)

    let str = `${format.h ? hours+format.b[0] : ""}${format.m ?minutes + format.b[1] : ""}${format.s ? seconds : ""}`

    return str
}
