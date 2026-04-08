import { useNavigate } from "react-router-dom";
export default function ServiceCard({ service }) {
    const navigate = useNavigate();
    return (
        <>
            <div >
                <img src={service.img} alt={service.name} />
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <h3>₹{service.price}</h3>
                <p>{service.category}</p>
                <button onClick={() => navigate(`/bookings/${service._id}`)}>
                    Book Now
                </button>
                <button>View Gallery</button>

            </div>

        </>
    )
}