import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ManageStudents() {

    const [users, setStudents] = useState([])

    async function fetchStudents() {
        let res = await UserService.all()
        setStudents(res);
    }

    useEffect(() => {
        fetchStudents();
    }, [])

    //deleting any row
    async function deleteRow(id) {
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    UserService.deleteRow(id)
                    fetchStudents();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });

        } catch (err) {
            toast.error("Error Deleting Category")
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <section className="panel mt-3">
                <div className="panel-header">
                    <div>
                        <h2 className="h5 mb-1 section-title"><i className="bi bi-people" aria-hidden="true" /><span>Recently Added Users</span></h2>
                        <p className="text-muted mb-0">Latest account activity across the workspace.</p>
                    </div>
                    <Link className="btn btn-outline-secondary btn-sm" to="/admin/student/add">Add User</Link>
                </div>
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Name and email</th>
                                <th scope="col">Academic Year</th>
                                <th scope="col">Hostel</th>
                                <th scope="col">Room Number</th>
                                <th scope="col">Gender</th>
                                <th scope="col">phone</th>
                                <th scope="col">course</th>
                                <th scope="col">Added On</th>
                                <th scope="col" className="text-end">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div>
                                                <p className="fw-semibold mb-0">{user.name}</p>
                                                <p className="text-muted small mb-0">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.year}</td>
                                    <td>{user.hostelName}</td>
                                    <td>{user.room}</td>
                                    <td><span>{user.gender}</span></td>
                                    <td>{user.phone}</td>
                                    <td>{user.course}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="text-end">
                                        <Link className="btn btn-light btn-sm" to={`/admin/student/edit/${user.id}`}>Edit</Link>
                                        &nbsp;
                                        <Link className="btn btn-light btn-sm" onClick={() => { deleteRow(user.id) }}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                                
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}