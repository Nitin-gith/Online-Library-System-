import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComplaintService from "../services/ComplaintService";

// Drop this into the student Home.jsx as a section/card.
// Shows: total / pending / solved counts, and a short list of the
// most recent complaints raised by the logged-in student.
export default function ComplaintSummary() {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

    async function fetchComplaints() {
        setLoading(true);
        setError("");
        try {
            const studentId = localStorage.getItem("id");
            const res = await ComplaintService.byStudent(studentId);
            setComplaints(res);
        } catch (err) {
            console.log("Error fetching complaint summary: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "Pending").length;
    const solved = complaints.filter((c) => c.status === "Solved").length;
    const recent = complaints.slice(0, 5); // byStudent() already sorts newest first

    return (
        <section className="panel">
            <div className="panel-header">
                <div>
                    <h2 className="h5 mb-1 section-title">
                        <i className="bi bi-exclamation-triangle" aria-hidden="true" />
                        <span> My Complaints</span>
                    </h2>
                    <p className="text-muted mb-0">A quick look at issues you've raised.</p>
                </div>
                <Link className="btn btn-sm btn-outline-primary" to="/student/complaints">
                    View All
                </Link>
            </div>

            {loading && <p className="text-muted p-3">Loading...</p>}

            {!loading && error && (
                <p className="text-danger p-3">Could not load complaints: {error}</p>
            )}

            {!loading && !error && (
                <>
                    {/* Count cards */}
                    <div className="row g-3 mb-3">
                        <div className="col-4">
                            <div className="card p-3 text-center">
                                <span className="h4 mb-0">{total}</span>
                                <span className="text-muted small">Total</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card p-3 text-center border-warning">
                                <span className="h4 mb-0 text-warning">{pending}</span>
                                <span className="text-muted small">Pending</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card p-3 text-center border-success">
                                <span className="h4 mb-0 text-success">{solved}</span>
                                <span className="text-muted small">Solved</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent complaints list */}
                    {total === 0 && (
                        <p className="text-muted p-3">
                            You haven't raised any issues yet.{" "}
                            <Link to="/student/raise-complaint">Raise one now</Link>.
                        </p>
                    )}

                    {total > 0 && (
                        <ul className="list-group list-group-flush">
                            {recent.map((c) => (
                                <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{c.title}</strong>
                                        <div className="text-muted small">
                                            {new Date(c.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <span className={`badge ${c.status === "Solved" ? "bg-success" : "bg-warning text-dark"}`}>
                                        {c.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </section>
    );
}
