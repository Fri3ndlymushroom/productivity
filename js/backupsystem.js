import { auth, db } from '../js/firebase'


export const checkIfBackup =async (data, last)=>{
    
    let uid = auth.currentUser.uid ? auth.currentUser.uid : undefined


    if (!uid)return false
    let userDoc;
    console.log(last)

    await db.collection("backups").doc(uid).get().then(doc=>{
        userDoc = doc.data()
    })

    let lastFireStoreBackup = userDoc? userDoc.lastbackup : 0
    

    if(lastFireStoreBackup - Math.round(new Date().getTime() / 1000) > 86400){
        console.log(makebackup)
    }

}
