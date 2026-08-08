

export default function Complaint() {
    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <div className="page-heading">
                        <div className="page-heading-copy">
                            <span className="page-icon"><i className="bi bi-person-plus" aria-hidden="true" /></span>
                            <div>
                                <p className="eyebrow mb-1">Management</p>
                                <h1 className="h3 mb-1">Add Complaint</h1>
                                <p className="text-muted mb-0">Create a new user account with role and team assignments.</p>
                            </div>
                        </div>
                        <div className="heading-actions"><a className="btn btn-outline-secondary btn-sm" href="users.html"><i className="bi bi-arrow-left" aria-hidden="true" /> Back to Users</a></div>
                    </div>
                    <section className="row g-3">
                        <div className="col-12 col-xl-8">
                            <form className="panel needs-validation" noValidate>
                                <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-person-plus" aria-hidden="true" /><span>User Information</span></h2><p className="text-muted mb-0">Create a user account with validated fields.</p></div></div>
                                <div className="row g-3">
                                    <div className="col-md-6"><label className="form-label" htmlFor="firstName">First name</label><input className="form-control" id="firstName" type="text" required /><div className="invalid-feedback">First name is required.</div></div>
                                    <div className="col-md-6"><label className="form-label" htmlFor="lastName">Last name</label><input className="form-control" id="lastName" type="text" required /><div className="invalid-feedback">Last name is required.</div></div>
                                    <div className="col-md-6"><label className="form-label" htmlFor="email">Email</label><input className="form-control" id="email" type="email" required /><div className="invalid-feedback">Enter a valid email.</div></div>
                                    <div className="col-md-6"><label className="form-label" htmlFor="phone">Phone</label><input className="form-control" id="phone" type="tel" required /><div className="invalid-feedback">Phone number is required.</div></div>
                                    <div className="col-md-6"><label className="form-label" htmlFor="role">Role</label><select className="form-select" id="role" required><option value>Choose role</option><option>Admin</option><option>Manager</option><option>Editor</option><option>Viewer</option></select><div className="invalid-feedback">Choose a role.</div></div>
                                    <div className="col-md-6"><label className="form-label" htmlFor="team">Team</label><select className="form-select" id="team" required><option value>Choose team</option><option>Operations</option><option>Sales</option><option>Content</option><option>Finance</option></select><div className="invalid-feedback">Choose a team.</div></div>
                                    <div className="col-12"><label className="form-label" htmlFor="notes">Notes</label><textarea className="form-control" id="notes" rows={4} placeholder="Optional onboarding notes" defaultValue={""} /></div>
                                </div>
                                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4"><a className="btn btn-outline-secondary" href="users.html">Cancel</a><button className="btn btn-primary" type="submit"><i className="bi bi-person-check" aria-hidden="true" /> Create User</button></div>
                            </form>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="panel h-100">
                                <h2 className="h5 mb-3 section-title"><i className="bi bi-list-check" aria-hidden="true" /><span>Access Checklist</span></h2>
                                <div className="activity-list">
                                    <div className="activity-item"><span className="activity-dot bg-success" /><div><p className="mb-1 fw-semibold">Assign role</p><p className="text-muted small mb-0">Start with the least privileged role.</p></div></div>
                                    <div className="activity-item"><span className="activity-dot bg-primary" /><div><p className="mb-1 fw-semibold">Add team</p><p className="text-muted small mb-0">Team ownership controls dashboards.</p></div></div>
                                    <div className="activity-item"><span className="activity-dot bg-warning" /><div><p className="mb-1 fw-semibold">Send invite</p><p className="text-muted small mb-0">Users receive activation by email.</p></div></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

        </>
    )
}