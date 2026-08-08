import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComplaintService from "../../../services/ComplaintService";


export default function MyComplaints() {

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
            console.log("Error fetching complaints: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="dashboard-content">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading">
                    <div className="page-heading-copy">
                        <span className="page-icon"><i className="bi bi-list-check" aria-hidden="true" /></span>
                        <div>
                            <p className="eyebrow mb-1">Support</p>
                            <h1 className="h3 mb-1">My Complaints</h1>
                            <p className="text-muted mb-0">Track the status of issues you've raised.</p>
                        </div>
                    </div>
                    <Link className="btn btn-primary" to="/student/raise-complaint">
                        <i className="bi bi-plus-lg" aria-hidden="true" /> Raise New Issue
                    </Link>
                </div>

                <section className="panel">
                    {loading && <p className="text-muted p-3">Loading...</p>}

                    {!loading && error && (
                        <p className="text-danger p-3">Could not load your complaints: {error}</p>
                    )}

                    {!loading && !error && complaints.length === 0 && (
                        <p className="text-muted p-3">You haven't raised any issues yet.</p>
                    )}

                    {!loading && !error && complaints.length > 0 && (
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Raised On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.map((c) => (
                                        <tr key={c.id}>
                                            <td>{c.title}</td>
                                            <td>{c.description}</td>
                                            <td>
                                                <span className={`badge ${c.status === "Solved" ? "bg-success" : "bg-warning text-dark"}`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
