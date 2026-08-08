import { db } from "../Firebase/firebaseconfig"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, query, where, orderBy } from "firebase/firestore"

import ComplaintModel from "../models/ComplaintModel"

class ComplaintService {

    // Called from the student side when raising a new issue.
    async add(data) {
        const complaint = new ComplaintModel()

        complaint.studentId = data.studentId
        complaint.studentName = data.studentName
        complaint.studentPhone = data.studentPhone
        complaint.studentRoom = data.studentRoom
        complaint.studentHostel = data.studentHostel
        complaint.title = data.title
        complaint.description = data.description
        complaint.status = "Pending"
        complaint.updatedAt = Date.now()

        const docRef = await addDoc(collection(db, "complaints"), { ...complaint })
        return docRef.id
    }

    // Admin side: every complaint, newest first.
    async all() {
        const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q);
        let complaints = []
        querySnapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() })
        });
        return complaints
    }

    // Student side: only this student's own complaints, newest first.
    async byStudent(studentId) {
        const q = query(
            collection(db, "complaints"),
            where("studentId", "==", studentId),
            orderBy("createdAt", "desc")
        )
        const querySnapshot = await getDocs(q);
        let complaints = []
        querySnapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() })
        });
        return complaints
    }

    async single(id) {
        const docRef = doc(db, "complaints", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
        }
    }

    // Admin side: flip status between Pending / Solved.
    async updateStatus(id, status) {
        const docRef = doc(db, "complaints", id);
        await updateDoc(docRef, {
            status: status,
            updatedAt: Date.now(),
        });
    }
}

export default new ComplaintService
