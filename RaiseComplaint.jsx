import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintService from "../../../services/ComplaintService";
import UserService from "../../../services/UserService";

import { toast } from "react-toastify";

// Pulls the full logged-in student profile from Firestore (users/{uid}),
// not just what's in localStorage (AuthService only stores id/email/name/
// userType/token — phone, room, hostel live on the Firestore document).
export default function RaiseComplaint() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const nav = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const studentId = localStorage.getItem("id");
            if (!studentId) {
                toast.error("You must be logged in to raise a complaint.");
                setLoadingProfile(false);
                return;
            }
            const res = await UserService.single(studentId);
            setProfile(res);
        } catch (err) {
            console.log("Error fetching profile: ", err);
            toast.error("Could not load your profile details.");
        } finally {
            setLoadingProfile(false);
        }
    }

    async function submitForm(e) {
        e.preventDefault();
        try {
            if (!profile) {
                toast.error("Your profile could not be loaded. Please try again.");
                return;
            }

            let payload = {
                studentId: profile.id,
                studentName: profile.name,
                studentPhone: profile.phone,
                studentRoom: profile.room,
                studentHostel: profile.hostelName || profile.hostel || "",
                title: title,
                description: description,
            };

            await ComplaintService.add(payload);
            toast.success("Complaint raised successfully");
            nav("/student/mycomplaints");
        } catch (err) {
            console.log("Error: ", err);
            toast.error(err.message);
        }
    }

    return (
        <main className="dashboard-content">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading">
                    <div className="page-heading-copy">
                        <span className="page-icon"><i className="bi bi-exclamation-triangle" aria-hidden="true" /></span>
                        <div>
                            <p className="eyebrow mb-1">Support</p>
                            <h1 className="h3 mb-1">Raise an Issue</h1>
                            <p className="text-muted mb-0">Describe the problem you're facing and the hostel admin will follow up.</p>
                        </div>
                    </div>
                </div>

                <section className="row g-3">
                    <div className="col-12 col-xl-8">
                        <form className="panel needs-validation" noValidate onSubmit={submitForm}>

                            {/* Read-only student info, pulled from Firestore */}
                            <div className="panel-header">
                                <div>
                                    <h2 className="h5 mb-1 section-title">
                                        <i className="bi bi-person-badge" aria-hidden="true" />
                                        <span> Your Details</span>
                                    </h2>
                                    <p className="text-muted mb-0">
                                        These are pulled from your account and can't be edited here.
                                    </p>
                                </div>
                            </div>

                            {loadingProfile && <p className="text-muted mb-3">Loading your details...</p>}

                            {!loadingProfile && profile && (
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" value={profile.name || ""} disabled readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className="form-control" value={profile.phone || ""} disabled readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Hostel</label>
                                        <input type="text" className="form-control" value={profile.hostelName || profile.hostel || ""} disabled readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Room</label>
                                        <input type="text" className="form-control" value={profile.room || ""} disabled readOnly />
                                    </div>
                                </div>
                            )}

                            <hr className="mb-4" />

                            {/* Actual complaint fields */}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="e.g. Leaking tap in bathroom"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Title is required.</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows={4}
                                    placeholder="Describe the issue in detail"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Description is required.</div>
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={loadingProfile}>
                                <i className="bi bi-check2-circle" aria-hidden="true" /> Submit Issue
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}
