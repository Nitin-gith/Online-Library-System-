import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintSummary from "./complaint/ComplaintSummary";
import UserService from "../../services/UserService";
import RoomService from "../../services/RoomService";
import ComplaintService from "../../services/ComplaintService";

export default function Home() {

    const navigate = useNavigate();

    const [totalStudents, setTotalStudents] = useState(0);
    const [resolvedComplaints, setResolvedComplaints] = useState(0);
    const [pendingComplaints, setPendingComplaints] = useState(0);
    const [occupiedRooms, setOccupiedRooms] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, []);

    async function fetchMetrics() {
        setLoading(true);
        try {
            const [users, rooms, complaints] = await Promise.all([
                UserService.all(),
                RoomService.all(),
                ComplaintService.all(),
            ]);

            // students = users whose userType marks them as a student ("2")
            const students = users.filter((u) => u.userType === "2");
            setTotalStudents(students.length);

            const occupied = rooms.filter((r) => r.status === "full" || r.occupants?.length > 0);
            setOccupiedRooms(occupied.length);

            const resolved = complaints.filter((c) => c.status === "Solved");
            const pending = complaints.filter((c) => c.status === "Pending");
            setResolvedComplaints(resolved.length);
            setPendingComplaints(pending.length);
        } catch (err) {
            console.log("Error fetching dashboard metrics: ", err);
        } finally {
            setLoading(false);
        }
    }

    function handleClick(){
        console.log("button clicked!");

        navigate("/student/addcomplaint");
    }

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">

                    <div className="page-heading">
                        <div className="page-heading-copy">
                            <span className="page-icon"><i className="bi bi-speedometer2" aria-hidden="true" /></span>
                            <div>
                                <p className="eyebrow mb-1"></p>
                                <h1 className="h3 mb-1">Dashboard</h1>
                                <p className="text-muted mb-0">Monitor complaints and problems being resolved on daily basis</p>
                            </div>
                        </div>

                        {/* raise issue */}
                        <div className="heading-actions">
                            <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}><i className="bi bi-file-earmark-plus" aria-hidden="true" />Raise Issue</button>
                        </div>
                    </div>
                    <section className="row g-3 mt-1" aria-label="Dashboard metrics">
                        <div className="col-12 col-sm-6 col-xl-3">
                            <article className="metric-card metric-primary">
                                <div className="metric-top">
                                    <span className="metric-label">Total Students</span>
                                    <span className="metric-icon"><i className="bi-people-fill" aria-hidden="true" /></span>
                                </div>
                                <div className="metric-value">{loading ? "..." : totalStudents}</div>
                                <div className="metric-meta">
                                    <span>live count</span>
                                </div>
                            </article>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3">
                            <article className="metric-card metric-success">
                                <div className="metric-top">
                                    <span className="metric-label">Resolved Complaints</span>
                                    <span className="metric-icon"><i className="bi-check-circle-fill" aria-hidden="true" /></span>
                                </div>
                                <div className="metric-value">{loading ? "..." : resolvedComplaints}</div>
                                <div className="metric-meta">
                                    <span>live count</span>
                                </div>
                            </article>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3">
                            <article className="metric-card metric-warning">
                                <div className="metric-top">
                                    <span className="metric-label">Occupied Rooms</span>
                                    <span className="metric-icon"><i className="bi bi-people" aria-hidden="true" /></span>
                                </div>
                                <div className="metric-value">{loading ? "..." : occupiedRooms}</div>
                                <div className="metric-meta">
                                    <span>live count</span>
                                </div>
                            </article>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3">
                            <article className="metric-card metric-danger">
                                <div className="metric-top">
                                    <span className="metric-label">Pending Complaints</span>
                                    <span className="metric-icon"><i className="bi bi-life-preserver" aria-hidden="true" /></span>
                                </div>
                                <div className="metric-value">{loading ? "..." : pendingComplaints}</div>
                                <div className="metric-meta">
                                    <span>need review</span>
                                </div>
                            </article>
                        </div>
                    </section>
                    <section className="row g-3 mt-1">
                        <div className="col-12 col-xl-8">
                            <div className="panel">
                                <div className="panel-header">
                                    <div>
                                        <h2 className="h5 mb-1 section-title"><i className="bi bi-graph-up-arrow" aria-hidden="true" /><span>Resolved Complaints</span></h2>
                                        <p className="text-muted mb-0">Problems and issues addressed in a month</p>
                                    </div>
                                    <a className="btn btn-light btn-sm" href="charts.html">View Details</a>
                                </div>
                                <div className="chart-bars" aria-label="Sales performance chart">
                                    <div className="chart-column bar-42"><span /><small>Jan</small></div>
                                    <div className="chart-column bar-58"><span /><small>Feb</small></div>
                                    <div className="chart-column bar-51"><span /><small>Mar</small></div>
                                    <div className="chart-column bar-72"><span /><small>Apr</small></div>
                                    <div className="chart-column bar-66"><span /><small>May</small></div>
                                    <div className="chart-column bar-83"><span /><small>Jun</small></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="panel h-100">
                                <div className="panel-header">
                                    <div>
                                        <h2 className="h5 mb-1 section-title"><i className="bi bi-activity" aria-hidden="true" /><span>Team Activity</span></h2>
                                        <p className="text-muted mb-0">Recent operational updates.</p>
                                    </div>
                                </div>
                                <div className="activity-list">
                                    <div className="activity-item"><span className="activity-dot bg-primary" /><div><p className="mb-1 fw-semibold">Wifi Facility</p><p className="text-muted small mb-0">Hostel Wifi Facility has been started last month</p></div></div>
                                    <div className="activity-item"><span className="activity-dot bg-success" /><div><p className="mb-1 fw-semibold">Fees Payment batch cleared</p><p className="text-muted small mb-0">246 invoices were processed successfully.</p></div></div>
                                    <div className="activity-item"><span className="activity-dot bg-warning" /><div><p className="mb-1 fw-semibold">Support queue rising</p><p className="text-muted small mb-0">Average first response time is 18 minutes.</p></div></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <ComplaintSummary></ComplaintSummary>

                </div>
            </main>


        </>
    )
}
