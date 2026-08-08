import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        setLoading(true);
        setError("");
        try {
            const studentId = localStorage.getItem("id");
            if (!studentId) {
                setError("You must be logged in to view your profile.");
                return;
            }
            const res = await UserService.single(studentId);

            setProfile(res);

        } catch (err) {
            console.log("Error fetching profile: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <div className="page-heading">
                        <div className="page-heading-copy">
                            <span className="page-icon"><i className="bi bi-person-badge" aria-hidden="true" /></span>
                            <div>
                                <p className="eyebrow mb-1">Account</p>
                                <h1 className="h3 mb-1">Profile</h1>
                                <p className="text-muted mb-0">Your personal and hostel details, as recorded by the administration.</p>
                            </div>
                        </div>
                    </div>

                    {loading && <p className="text-muted">Loading your profile...</p>}
                    {!loading && error && <p className="text-danger">{error}</p>}

                    {!loading && !error && profile && (
                        <section className="row g-3">
                            <div className="col-12 col-xl-4">
                                <div className="panel h-100 text-center profile-card">
                                    <img
                                        className="avatar-img avatar-xl profile-photo mt-3"
                                        src={profile.photoUrl || "/assets/images/avatar/avatar.jpg"}
                                        alt={profile.name}
                                    />
                                    <h2 className="h5 mt-3 mb-1">{profile.name}</h2>
                                    <p className="text-muted mb-3">{profile.course} {profile.year ? `\u2022 ${profile.year}` : ""}</p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <span className="badge text-bg-primary">Student</span>
                                        <span className={`badge ${profile.status === "active" ? "text-bg-success" : "text-bg-secondary"}`}>
                                            {profile.status}
                                        </span>
                                    </div>
                                    <div className="info-list mt-4 text-start">
                                        <div><span>Email</span><strong>{profile.email}</strong></div>
                                        <div><span>Phone</span><strong>{profile.phone}</strong></div>
                                        <div><span>hostelName</span><strong>{profile.hostelName}</strong></div>
                                        <div><span>Room</span><strong>{profile.room || "Not assigned"}</strong></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-xl-8">
                                <div className="panel">
                                    <div className="panel-header">
                                        <div>
                                            <h2 className="h5 mb-1 section-title">
                                                <i className="bi bi-person-lines-fill" aria-hidden="true" />
                                                <span> Personal Details</span>
                                            </h2>
                                            <p className="text-muted mb-0">
                                                These details are managed by the hostel administration. Contact the office to request a change.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Full Name</label>
                                            <input className="form-control" type="text" value={profile.name || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" type="email" value={profile.email || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Phone</label>
                                            <input className="form-control" type="text" value={profile.phone || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Gender</label>
                                            <input className="form-control" type="text" value={profile.gender || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Course</label>
                                            <input className="form-control" type="text" value={profile.course || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Year</label>
                                            <input className="form-control" type="text" value={profile.year || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Hostel Name</label>
                                            <input className="form-control" type="text" value={profile.hostelName || ""} disabled readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Room</label>
                                            <input className="form-control" type="text" value={profile.room || "Not assigned"} disabled readOnly />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control" rows={3} value={profile.address || ""} disabled readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    )
}
