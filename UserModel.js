class UserModel {
    id = ""
    name = ""
    email = ""
    phone = ""
    gender = ""
    course = ""
    year = ""
    address = ""
    room = ""
    hostelName = ""
    userType =  ""// 1=Admiin, 2 = Student
    status = "active"
    preferences = {
        language: "English",
        emailNotifications: true,
        smsNotifications: false,
    }
    createdAt = Date.now()
    updatedAt = ""
}

export default UserModel
