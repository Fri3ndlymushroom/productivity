
import { auth, db } from '../js/firebase'


export const checkForBackup = async (data, last) => {


    data = simplifyData(data)

    let uid = auth.currentUser ? auth.currentUser.uid : undefined


    if (!uid) return last

    let newBackupTime = Math.round(new Date().getTime() / 1000)

    if ((newBackupTime - last) > 86400) {

        let backupTimestamps = []

        await db.collection("backups").doc(uid).get().then((doc) => {
            if (doc.exists) {
                backupTimestamps = doc.data().backupTimestamps
            }
        })

        backupTimestamps.push(newBackupTime)

        await db.collection("backups").doc(uid).set({
            backupTimestamps: backupTimestamps
        }, { merge: true })


        await db.collection("backups").doc(uid).collection("user_backups").doc(newBackupTime.toString(10)).set({
            data: data
        })

        return newBackupTime
    }


    return last
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