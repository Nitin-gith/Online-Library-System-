import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export default function EditStudent() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [room, setRoom] = useState("");
    const [userType, setuserType] = useState("");


    const params = useParams()

    const nav = useNavigate()
    async function submitForm(e) {
        e.preventDefault()
        try {
            let payload = {
                name: name,
                email: email,
                phone: phone,
                gender: gender,
                course: course,
                year: year,
                address: address,
                password: password,
                room: room,
                userType: userType,
            }
            await UserService.update(payload,params.id)
            toast.success("data updated")
            nav(-1);
        }catch(err){
            console.log("Error : ",err);
        }
    }

    async function getUserDetail(){
        const res = await UserService.single(params.id)
        console.log("Res in comp: ", res);
        setName(res.name)
        setEmail(res.email)
        setPhone(res.phone)
        setGender(res.gender)
        setCourse(res.course)
        setYear(res.year)
        setAddress(res.address)
        setPassword(res.password)
        setRoom(res.room)
        setuserType(res.userType)
    }

    useEffect(()=>{
        getUserDetail()
    },[])


    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <div className="page-heading">
                        <div className="page-heading-copy">
                            <span className="page-icon"><i className="bi bi-gear" aria-hidden="true" /></span>
                            <div>
                                <p className="eyebrow mb-1">Workspace</p>
                                <h1 className="h3 mb-1">Settings</h1>
                                <p className="text-muted mb-0">Customize workspace defaults, security options, and notification preferences.</p>
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
                                            <span> Student Information</span>
                                        </h2>
                                        <p className="text-muted mb-0">
                                            Fill in the student's basic details.
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
                                {/* Email */}

                                {/*email*/}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">
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

                                {/* room */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="room">
                                        Hostel and Room Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        required
                                    />
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
                                        Course
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="course"
                                        name="course"
                                        placeholder="Enter course"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Course is required.
                                    </div>
                                </div>

                                {/* Year */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="year">
                                        Year
                                    </label>
                                    <select
                                        className="form-select"
                                        id="year"
                                        name="year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required
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
                                    <i className="bi bi-check2-circle" aria-hidden="true" /> Save Student
                                </button>
                            </form>
                        </div>

                    </section>
                </div>
            </main>

        </>
    )
}