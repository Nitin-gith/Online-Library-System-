import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService'
import HostelService from '../../../services/HostelService'
import RoomService from '../../../services/RoomService'
import { toast } from "react-toastify";

export default function AddStudent() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [userType , setuserType] = useState("");

    // hostel + room selection
    const [hostels, setHostels] = useState([]);
    const [hostelId, setHostelId] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [roomId, setRoomId] = useState("");

    const nav = useNavigate()

    const isStudent = userType === "2";

    useEffect(() => {
        fetchHostels();
    }, []);

    useEffect(() => {
        if (!hostelId) {
            setAvailableRooms([]);
            setRoomId("");
            return;
        }
        fetchAvailableRooms(hostelId);
    }, [hostelId]);

    useEffect(() => {
        if (!isStudent) {
            setHostelId("");
            setRoomId("");
            setYear("");
        }
    }, [isStudent]);

    async function fetchHostels() {
        const res = await HostelService.all();
        setHostels(res);
    }

    async function fetchAvailableRooms(id) {
        const res = await RoomService.availableByHostel(id);
        setAvailableRooms(res);
    }

    async function submitForm(e){
        e.preventDefault()
        try{
            const selectedHostel = hostels.find((h) => h.id === hostelId);
            const selectedRoom = isStudent ? availableRooms.find((r) => r.id === roomId) : null;

            let payload = {
                name: name,
                email: email,
                phone: phone,
                gender: gender,
                course: course,
                year: isStudent ? year : "",
                address: address,
                password: password,
                room: selectedRoom ? selectedRoom.roomNumber : "",
                hostelName: selectedHostel ? selectedHostel.blockName : "", // <-- added: was never being saved before
                userType:userType
            }
            const newStudentId = await UserService.add(payload)

            // mark the chosen room as allotted to this student
            // (admins don't occupy a room, so this only runs for students)
            if (isStudent && selectedRoom) {
                await RoomService.allotStudent(
                    selectedRoom.id,
                    newStudentId,
                    selectedRoom.occupants,
                    selectedRoom.capacity
                )
            }

            toast.success("Student Added")
            nav(-1);
        }catch(err){
            console.log("Error: ", err);
            toast.error(err.message);
        }
    }

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <div className="page-heading">
                        <div className="page-heading-copy">
                            <span className="page-icon"><i className="bi bi-gear" aria-hidden="true" /></span>
                            <div>
                                <p className="eyebrow mb-1"></p>
                                <h1 className="h3 mb-1">Add User</h1>

                            </div>
                        </div>
                    </div>
                    <section className="row g-3">
                        <div className="col-12 col-xl-12">
                            <form className="panel needs-validation" noValidate onSubmit={submitForm}>
                                <div className="panel-header">
                                    <div>
                                        <h2 className="h5 mb-1 section-title">
                                            <i className="bi bi-person-lines-fill" aria-hidden="true" />
                                            <span> User Information</span>
                                        </h2>
                                        <p className="text-muted mb-0">
                                            Fill in the User's basic details.
                                        </p>
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Name is required.
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Valid email is required.
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Valid password is required.
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Phone number is required.
                                    </div>
                                </div>

                                {/* Hostel */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="hostel">
                                        Hostel {!isStudent && <span className="text-muted">(students only)</span>}
                                    </label>
                                    <select
                                        className="form-select"
                                        id="hostel"
                                        name="hostel"
                                        value={hostelId}
                                        onChange={(e) => setHostelId(e.target.value)}
                                        required={isStudent}
                                        disabled={!isStudent}
                                    >
                                        <option value="">Select Hostel</option>
                                        {hostels.map((hostel) => (
                                            <option key={hostel.id} value={hostel.id}>
                                                {hostel.blockName}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        Hostel is required.
                                    </div>
                                </div>

                                {/* Room - only rooms with status "available" show up here */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="room">
                                        Room Number {!isStudent && <span className="text-muted">(students only)</span>}
                                    </label>
                                    <select
                                        className="form-select"
                                        id="room"
                                        name="room"
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                        required={isStudent}
                                        disabled={!isStudent || !hostelId}
                                    >
                                        <option value="">
                                            {!isStudent ? "Not applicable" : hostelId ? "Select Room" : "Select a hostel first"}
                                        </option>
                                        {availableRooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                Room {room.roomNumber} ({room.occupants.length}/{room.capacity})
                                            </option>
                                        ))}
                                    </select>
                                    {isStudent && hostelId && availableRooms.length === 0 && (
                                        <div className="form-text text-danger">
                                            No available rooms in this hostel.
                                        </div>
                                    )}
                                    <div className="invalid-feedback">
                                        Room is required.
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="gender">
                                        Gender
                                    </label>
                                    <select
                                        className="form-select"
                                        id="gender"
                                        name="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a gender.
                                    </div>
                                </div>

                                {/* Course */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="course">
                                        Course {!isStudent && <span className="text-muted">(students only)</span>}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="course"
                                        name="course"
                                        placeholder="Enter course"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        required={isStudent}
                                        disabled={!isStudent}
                                    />
                                    <div className="invalid-feedback">
                                        Course is required.
                                    </div>
                                </div>

                                {/* Year */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="year">
                                        Year {!isStudent && <span className="text-muted">(students only)</span>}
                                    </label>
                                    <select
                                        className="form-select"
                                        id="year"
                                        name="year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required={isStudent}
                                        disabled={!isStudent}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a year.
                                    </div>
                                </div>

                                {/* user type */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="userType">
                                        userType
                                    </label>
                                    <select
                                        className="form-select"
                                        id="userType"
                                        name="userType"
                                        value={userType}
                                        onChange={(e) => setuserType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1 - admin</option>
                                        <option value="2">2 - student</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select an user type.
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="address">
                                        Address
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        rows={3}
                                        placeholder="Enter address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Address is required.
                                    </div>
                                </div>

                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-check2-circle" aria-hidden="true" /> Save User
                                </button>
                            </form>
                        </div>

                    </section>
                </div>
            </main>

        </>
    )
}
