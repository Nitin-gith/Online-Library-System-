import { db } from "../Firebase/firebaseconfig"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, query, where, arrayUnion, arrayRemove } from "firebase/firestore"

import RoomModel from "../models/RoomModel"

class RoomService {

    // Create `totalRooms` room documents for a given hostel.
    // Call this once, right after a hostel is created (or as a one-off
    // "Generate Rooms" action on ManageHostel.jsx for existing hostels).
    async generateRooms(hostelId, hostelName, totalRooms, capacityPerRoom = 1) {
        for (let i = 1; i <= totalRooms; i++) {
            const room = new RoomModel()

            room.hostelId = hostelId
            room.hostelName = hostelName
            room.roomNumber = `${i}`
            room.capacity = capacityPerRoom
            room.occupants = []
            room.status = "available"
            room.updatedAt = Date.now()

            await addDoc(collection(db, "rooms"), { ...room })
        }
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        let rooms = []
        querySnapshot.forEach((doc) => {
            rooms.push({ id: doc.id, ...doc.data() })
        });
        return rooms
    }

    async allByHostel(hostelId) {
        const q = query(collection(db, "rooms"), where("hostelId", "==", hostelId))
        const querySnapshot = await getDocs(q);
        let rooms = []
        querySnapshot.forEach((doc) => {
            rooms.push({ id: doc.id, ...doc.data() })
        });
        return rooms
    }

    async availableByHostel(hostelId) {
        const q = query(
            collection(db, "rooms"),
            where("hostelId", "==", hostelId),
            where("status", "==", "available")
        )
        const querySnapshot = await getDocs(q);
        let rooms = []
        querySnapshot.forEach((doc) => {
            rooms.push({ id: doc.id, ...doc.data() })
        });
        return rooms
    }

    async single(id) {
        const docRef = doc(db, "rooms", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
        }
    }

    // Adds a student to a room's occupants array and flips status to
    // "full" once capacity is reached. Pass the room's CURRENT occupants
    // array and capacity (from RoomService.single() or the dropdown data)
    // so we know whether this allotment fills the room.
    async allotStudent(roomId, studentId, currentOccupants, capacity) {
        const docRef = doc(db, "rooms", roomId);
        const newOccupants = [...currentOccupants, studentId]

        await updateDoc(docRef, {
            occupants: arrayUnion(studentId),
            status: newOccupants.length >= capacity ? "full" : "available",
            updatedAt: Date.now(),
        });
    }

    // Removes a student from a room (e.g. when editing a student to a
    // different room, or removing a student entirely). Freeing a seat
    // always makes the room "available" again.
    async removeStudent(roomId, studentId) {
        const docRef = doc(db, "rooms", roomId);
        await updateDoc(docRef, {
            occupants: arrayRemove(studentId),
            status: "available",
            updatedAt: Date.now(),
        });
    }
}

export default new RoomService
