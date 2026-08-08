import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import ComplaintService from "../../services/ComplaintService";

export default function ManageComplaints() {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All"); // "All" | "Pending" | "Solved"

    useEffect(() => {
        fetchComplaints();
    }, []);

    async function fetchComplaints() {
        setLoading(true);
        const res = await ComplaintService.all();
        setComplaints(res);
        setLoading(false);
    }

    async function handleToggleStatus(complaint) {
        try {
            const newStatus = complaint.status === "Solved" ? "Pending" : "Solved";
            await ComplaintService.updateStatus(complaint.id, newStatus);
            toast.success(`Marked as ${newStatus}`);
            setComplaints((prev) =>
                prev.map((c) => (c.id === complaint.id ? { ...c, status: newStatus } : c))
            );
        } catch (err) {
            console.log("Error: ", err);
            toast.error(err.message);
        }
    }

    const visibleComplaints =
        filter === "All" ? complaints : complaints.filter((c) => c.status === filter);

    return (
        <main className="dashboard-content">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading">
                    <div className="page-heading-copy">
                        <span className="page-icon"><i className="bi bi-exclamation-triangle" aria-hidden="true" /></span>
                        <div>
                            <p className="eyebrow mb-1">Hostel Management</p>
                            <h1 className="h3 mb-1">Manage Complaints</h1>
                            <p className="text-muted mb-0">Review issues raised by students and update their status.</p>
                        </div>
                    </div>
                </div>

                <div className="btn-group mb-3" role="group">
                    {["All", "Pending", "Solved"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={`btn btn-sm ${filter === option ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => setFilter(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <section className="panel">
                    {loading && <p className="text-muted p-3">Loading...</p>}

                    {!loading && visibleComplaints.length === 0 && (
                        <p className="text-muted p-3">No complaints to show.</p>
                    )}

                    {!loading && visibleComplaints.length > 0 && (
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Phone</th>
                                        <th>Hostel</th>
                                        <th>Room</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Raised On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleComplaints.map((c) => (
                                        <tr key={c.id}>
                                            <td>{c.studentName}</td>
                                            <td>{c.studentPhone}</td>
                                            <td>{c.studentHostel}</td>
                                            <td>{c.studentRoom}</td>
                                            <td>{c.title}</td>
                                            <td>{c.description}</td>
                                            <td>
                                                <span className={`badge ${c.status === "Solved" ? "bg-success" : "bg-warning text-dark"}`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${c.status === "Solved" ? "btn-outline-warning" : "btn-outline-success"}`}
                                                    onClick={() => handleToggleStatus(c)}
                                                >
                                                    Mark as {c.status === "Solved" ? "Pending" : "Solved"}
                                                </button>
                                            </td>
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
