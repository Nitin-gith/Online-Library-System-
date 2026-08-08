import { Link } from "react-router-dom";


export default function AdmSidebar() {
    return (
        <>

            <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
                <div className="sidebar-header">
                    <Link className="brand-mark" to="index.html" aria-label="adminHMD dashboard">
                        <span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true" /></span>
                        <span className="brand-copy">
                            <span className="brand-title">Hostel Management</span>
                            <span className="brand-subtitle">Menu</span>
                        </span>
                    </Link>
                </div>
                <nav className="sidebar-nav">
                    <Link className="nav-link" to="/admin">
                        <span className="nav-icon"><i className="bi bi-speedometer2" aria-hidden="true" /></span>
                        <span className="nav-text">Dashboard</span>
                    </Link>
                    
                    <Link className="nav-link" to="/admin/students">
                        <span className="nav-icon"><i className="bi bi-person-badge" aria-hidden="true" /></span>
                        <span className="nav-text">Users</span>
                    </Link>
                    <Link className="nav-link" to="/admin/hostels">
                        <span className="nav-icon"><i className="bi bi-person-badge" aria-hidden="true" /></span>
                        <span className="nav-text">Hostel Blocks</span>
                    </Link>
                    
                    <Link className="nav-link" to="/admin/rooms">
                        <span className="nav-icon"><i className="bi bi-grid-3x3-gap" aria-hidden="true" /></span>
                        <span className="nav-text">Room Allocation</span>
                    </Link>
                    <Link className="nav-link" to="/admin/complaints">
                        <span className="nav-icon"><i className="bi bi-ui-checks-grid" aria-hidden="true" /></span>
                        <span className="nav-text">Complaints</span>
                    </Link>

                    <Link className="nav-link" to="/admin/settings">
                        <span className="nav-icon"><i className="bi bi-gear" aria-hidden="true" /></span>
                        <span className="nav-text">Settings</span>
                    </Link>
                    
                </nav>
    
                <div className="sidebar-footer">
                    <span className="status-dot" />
                    <span className="sidebar-footer-text">System running smoothly</span>
                </div>
            </aside>


        </>
    )
}