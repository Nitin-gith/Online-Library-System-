class RoomModel {
    hostelId = ""
    hostelName = ""
    roomNumber = ""
    capacity = 1
    occupants = []
    status = "available" // "available" | "full"
    createdAt = Date.now()
    updatedAt = ""
}

export default RoomModel
