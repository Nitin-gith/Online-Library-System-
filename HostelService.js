import { db } from "../Firebase/firebaseconfig"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"

import HostelBlockModel from "../models/HostelBlockModel"

class HostelService {
    async add(data) {
        const hostel = new HostelBlockModel()

        hostel.blockName = data.blockName
        hostel.totalRooms = data.totalRooms
        hostel.updatedAt = data.updatedAt

        const docRef = await addDoc(collection(db, "hostel"), { ...hostel })
        return docRef.id // <-- added: needed so we can generate rooms right after
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, "hostel"));
        let hostels = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            hostels.push({ id: doc.id, ...doc.data() })

        });

        return hostels
    }

    async single(id) {
        const docRef = doc(db, "hostel", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } // <-- added id, matches all()
        } else {
            console.log("No such document!");
        }

    }

    async update(data, id) {
        const docRef = doc(db, "hostel", id);
        await updateDoc(docRef, data);
    }

    async deleteRow(id) {
        const docRef = doc(db, "hostel", id);
        await deleteDoc(docRef)
    }
}

export default new HostelService
