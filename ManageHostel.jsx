import { Link } from "react-router-dom";
import HostelService from "../../../services/HostelService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ManageHostel() {

    const [hostels, setHostels] = useState([])

    async function fetchHostelBlocks() {
        const res = await HostelService.all()
        setHostels(res);
    }

    useEffect(() => {
        fetchHostelBlocks();
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
                    HostelService.deleteRow(id)
                    fetchHostelBlocks();
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
                        <h2 className="h5 mb-1 section-title"><i className="bi bi-people" aria-hidden="true" /><span>Recently Added Hostel Details </span></h2>
                        <p className="text-muted mb-0">Latest account activity across the workspace.</p>
                    </div>
                    <Link className="btn btn-outline-secondary btn-sm" to="/admin/hostel/add">Add Hostel</Link>
                </div>
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Sr No</th>
                                <th scope="col">Block Name</th>
                                <th scope="col">Total Rooms</th>
                                <th scope="col">Created At</th>
                                <th scope="col" className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostels.map((hostel, index) => (
                                <tr>
                                    <td> {index + 1}  </td>
                                    <td>{hostel.blockName}</td>
                                    <td><span>{hostel.totalRooms}</span></td>
                                    <td>{new Date(hostel.createdAt).toLocaleDateString()}</td>

                                    <td className="text-end">
                                        <Link className="btn btn-light btn-sm" to={`/admin/hostel/edit/${hostel.id}`}>Edit</Link>
                                        &nbsp;
                                        <Link className="btn btn-light btn-sm" onClick={() => { deleteRow(hostel.id) }}>Delete</Link>
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