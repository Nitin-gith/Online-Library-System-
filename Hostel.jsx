import HostelService from "../../../services/HostelService";
import RoomService from "../../../services/RoomService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Hostel() {

    const [blockName, setBlock] = useState("");
    const [totalRooms, setRooms] = useState("");
    const [updatedAt, updt] = useState("");

    const nav = useNavigate()
    async function submitForm(e) {
        e.preventDefault()
        try {
            let payload = {
                blockName: blockName,
                totalRooms: totalRooms,
                updatedAt: updatedAt,
            }
            const hostelId = await HostelService.add(payload)

            // Create one room document per room, so availability can
            // actually be tracked instead of just a totalRooms number.
            await RoomService.generateRooms(hostelId, blockName, Number(totalRooms))

            toast.success("data Added")
            nav(-1);
        } catch (err) {
            console.log("Error: ", err);
        }
    }


    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <div className="page-heading">
                        <div className="page-heading-copy">
                            <span className="page-icon"><i className="bi bi-gear" aria-hidden="true" /></span>
                            <div>
                                <p className="eyebrow mb-1">Hostel Management</p>
                                <h1 className="h3 mb-1">Hostel Data</h1>
                                <p className="text-muted mb-0">Add or update the number of rooms in a hostel</p>
                            </div>
                        </div>
                    </div>
                    <section className="row g-3">
                        <div className="col-12 col-xl-12">
                            <form className="panel needs-validation" noValidate onSubmit={submitForm}>
                                <div className="panel-header">
                                    <div>
                                        <h2 className="h5 mb-1 section-title">
                                            <i className="bi bi-person-lines-fill" aria-hidden="true" />
                                            <span> Data</span>
                                        </h2>
                                        <p className="text-muted mb-0">

                                        </p>
                                    </div>
                                </div>

                          
                                {/* blockName */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">
                                        Block Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="blockName"
                                        name="blockName"
                                        placeholder="Enter Block Name"
                                        value={blockName}
                                        onChange={(e) => setBlock(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        blockName is required.
                                    </div>
                                </div>
                              
                                {/* totalRooms */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">
                                        Total Rooms
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="totalRooms"
                                        name="totalRooms"
                                        placeholder="Enter total Rooms"
                                        value={totalRooms}
                                        onChange={(e) => setRooms(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        totalRooms is required.
                                    </div>
                                </div>
                              

                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-check2-circle" aria-hidden="true" /> Save Data
                                </button>
                            </form>
                        </div>

                    </section>
                </div>
            </main>

        </>
    )
}
