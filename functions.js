import {  intervalToDuration } from 'date-fns'



export function secondsToFormatedString(seconds){
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 })

    let stringified = {hours: duration.hours.toString(10), minutes: duration.minutes.toString(10), seconds: duration.seconds.toString(10)}

    if(stringified.hours.length == 1) stringified.hours = "0"+stringified.hours
    if(stringified.minutes.length == 1) stringified.minutes = "0"+stringified.minutes
    if(stringified.seconds.length == 1) stringified.seconds = "0"+stringified.seconds


    let string = stringified.hours+":"+stringified.minutes+":"+stringified.seconds
    return string
}
