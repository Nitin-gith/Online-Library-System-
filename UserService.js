import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '../Firebase/firebaseconfig'

import UserModel from '../models/UserModel'
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

class UserService {
    async add(data) {
        const authRes = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const newUser = new UserModel()
        newUser.name = data.name
        newUser.email = data.email
        newUser.phone = data.phone
        newUser.gender = data.gender
        newUser.course = data.course
        newUser.year = data.year
        newUser.address = data.address
        newUser.room = data.room
        newUser.hostelName = data.hostelName
        newUser.userType = data.userType
        newUser.id = authRes.user.uid

         // await addDoc(collection(db, "users"), {...newUser})

        await setDoc(doc(db, "users", authRes.user.uid), { ...newUser })

        return authRes.user.uid
    }

    // Signs in with Firebase Auth, then reads the matching Firestore
    // document to get userType. Throws if either step fails, or if
    // the Firestore profile document is missing for some reason.
    async login(data) {
        const authRes = await signInWithEmailAndPassword(auth, data.email, data.password)
        const uid = authRes.user.uid

        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            throw new Error("No profile found for this account. Contact an administrator.")
        }

        const userData = { id: docSnap.id, ...docSnap.data() }
        return userData // includes userType, so the component can decide where to redirect
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, "users"));
        let users = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            users.push({ id: doc.id, ...doc.data() })

        });

        return users
    }

    async single(id) {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
        }
    }

    async update(data, id) {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, data);
    }

    // Settings.jsx calls this for both personal-info edits (phone, address)
    // and preference edits (language, notifications) — same document,
    // just a partial update so unrelated fields aren't touched.
    async updateSettings(id, data) {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, data);
    }

    async deleteRow(id) {
            const docRef = doc(db, "users", id);
            await deleteDoc(docRef)
        }
}

export default new UserService
