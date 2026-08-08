import { useEffect, useState } from "react";
import HostelService from "../../../services/HostelService";
import RoomService from "../../../services/RoomService";

export default function RoomAvailability() {

    const [hostels, setHostels] = useState([]);
    const [hostelId, setHostelId] = useState("");
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHostels();
    }, []);

    useEffect(() => {
        if (!hostelId) {
            setRooms([]);
            return;
        }
        fetchRooms(hostelId);
    }, [hostelId]);

    async function fetchHostels() {
        const res = await HostelService.all();
        setHostels(res);
        if (res.length > 0) {
            setHostelId(res[0].id); // default to first hostel
        }
    }

    async function fetchRooms(id) {
        setLoading(true);
        const res = await RoomService.allByHostel(id);
        setRooms(res);
        setLoading(false);
    }

    const availableCount = rooms.filter((r) => r.status === "available").length;
    const fullCount = rooms.filter((r) => r.status === "full").length;

    return (
        <div className="container-fluid px-3 px-lg-4 py-4">
            <div className="page-heading">
                <div className="page-heading-copy">
                    <span className="page-icon"><i className="bi bi-door-open" aria-hidden="true" /></span>
                    <div>
                        <p className="eyebrow mb-1">Hostel</p>
                        <h1 className="h3 mb-1">Room Availability</h1>
                        <p className="text-muted mb-0">
                            See which rooms are available and which have already been allotted.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-3" style={{ maxWidth: 320 }}>
                <label className="form-label" htmlFor="hostelSelect">Select Hostel</label>
                <select
                    className="form-select"
                    id="hostelSelect"
                    value={hostelId}
                    onChange={(e) => setHostelId(e.target.value)}
                >
                    <option value="">Select Hostel</option>
                    {hostels.map((hostel) => (
                        <option key={hostel.id} value={hostel.id}>
                            {hostel.blockName}
                        </option>
                    ))}
                </select>
            </div>

            {hostelId && (
                <p className="text-muted mb-3">
                    {availableCount} available &middot; {fullCount} full &middot; {rooms.length} total rooms
                </p>
            )}

            {loading && <p>Loading rooms...</p>}

            {!loading && hostelId && rooms.length === 0 && (
                <p className="text-muted">
                    No rooms found for this hostel yet. Use "Generate Rooms" on the Manage Hostel page first.
                </p>
            )}

            <div className="row g-3">
                {rooms.map((room) => (
                    <div className="col-6 col-md-3 col-xl-2" key={room.id}>
                        <div className={`card h-100 p-3 border ${room.status === "full" ? "border-danger" : "border-success"}`}>
                            <strong>Room {room.roomNumber}</strong>
                            <span className="text-muted small">
                                {room.occupants.length}/{room.capacity} occupied
                            </span>
                            <span className={`badge mt-2 ${room.status === "full" ? "bg-danger" : "bg-success"}`}>
                                {room.status === "full" ? "Full" : "Available"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
