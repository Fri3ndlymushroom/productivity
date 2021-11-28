import { intervalToDuration, format } from 'date-fns'



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





export function formatSeconds(seconds, formatstr) {
    let d = new Date(seconds * 1000)

    const dc = new Date(d.valueOf() + d.getTimezoneOffset() * 60 * 1000)
    
    let f = format(dc, formatstr)

    return f
}

