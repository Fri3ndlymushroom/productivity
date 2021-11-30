
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"


export const checkForBackup = async (data, last) => {



    data = simplifyData(data)

    let uid = auth().currentUser ? auth().currentUser.uid : undefined


    if (!uid) return last

    let newBackupTime = Math.round(new Date().getTime() / 1000)

    if ((newBackupTime - last) > 86400 || typeof last === "undefined") {

        doBackup(newBackupTime, data)
        
        return newBackupTime
    }else{
        return last
    }
}

export const doBackup = async (time, data) =>{

    data = simplifyData(data)

    let uid = auth().currentUser ? auth().currentUser.uid : undefined

    let backupTimestamps = []

    await firestore().collection("backups").doc(uid).get().then((doc) => {
        if (doc.exists) {
            backupTimestamps = doc.data().backupTimestamps
        }
    })

    backupTimestamps.push(time)

    await firestore().collection("backups").doc(uid).set({
        backupTimestamps: backupTimestamps
    }, { merge: true })


    await firestore().collection("backups").doc(uid).collection("user_backups").doc(time.toString(10)).set({
        data: data
    })
}



const simplifyData = (data) => {
    let simplified = {
        projects: [],
        all_logs: []
    }

    simplified.projects = data.projects.map((project) => {
        return {
            name: project.name,
            pid: project.pid,
            color: project.color,
            icon: project.icon,
            logs: []
        }
    })

    simplified.all_logs = data.all_logs.map((log) => {
        return {
            color: log.color,
            day: log.day,
            duration: log.duration,
            end: log.end ? log.end : (Math.round(new Date().getTime() / 1000)),
            lid: log.lid,
            pid: log.pid,
            project: log.project,
            start: log.start
        }
    })

    return simplified
}