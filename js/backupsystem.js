
import { auth, db } from '../js/firebase'


export const checkForBackup =async (data, last)=>{

    data = simplifyData(data)
    
    let uid = auth.currentUser.uid ? auth.currentUser.uid : undefined


    if (!uid)return last

    console.log(last, uid)

    
    let newBackupTime = Math.round(new Date().getTime() / 1000)

    if((newBackupTime - last) > 86400){

        await db.collection("backups").doc(uid).set({
            lastbackup: newBackupTime
        }, {merge: true})

        await db.collection("backups").doc(uid).collection("user_backups").doc(newBackupTime.toString(10)).set({
            data: data
        })
        
        console.log("makebackup")
        return newBackupTime
    }


    return last
}



const simplifyData = (data) =>{
    let simplified = {
        projects: [],
        all_logs: []
    }

    simplified.projects = data.projects.map((project)=>{
        return {
            name: project.name,
            pid: project.pid,
            color: project.color,
            logs: []
        }
    })

    simplified.all_logs = data.all_logs.map((log)=>{
        return {
            color: log.color,
            day: log.day,
            duration: log.duration,
            end: log.end ? log.end : (Math.round(new Date().getTime() / 1000 )),
            lid: log.lid,
            pid: log.pid,
            project: log.project,
            start: log.start
        }
    })

    return simplified
}