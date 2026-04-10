import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>

            {/* HERO */}
            <section>
                <h1>Premium Salon Experience</h1>
                <p>
                    Book top-quality beauty services from expert stylists.
                    Simple. Fast. Reliable.
                </p>
                <button onClick={() => navigate("/services")}>
                    Explore Services
                </button>
                <button onClick={() => navigate("/booking")}>
                    Book Appointment
                </button>
            </section>

            {/* SERVICES PREVIEW */}
            <section>
                <h2>Our Services</h2>
                <p>Everything you need to look and feel your best</p>

                <div>
                    <div>
                        <h3>Hair Services</h3>
                        <p>Haircuts, styling, coloring & treatments</p>
                    </div>

                    <div>
                        <h3>Skin Care</h3>
                        <p>Facials, cleanups & advanced treatments</p>
                    </div>

                    <div>
                        <h3>Nail Care</h3>
                        <p>Manicure, pedicure & nail art</p>
                    </div>
                </div>

                <button onClick={() => navigate("/services")}>
                    View All Services
                </button>
            </section>

            {/* ABOUT / BRAND */}
            <section>
                <h2>New Lounge Salon</h2>
                <p>
                    We are dedicated to delivering high-quality salon services
                    using premium products and experienced professionals.
                </p>
            </section>

            {/* HOW IT WORKS */}
            <section>
                <h2>How It Works</h2>

                <div>
                    <div>
                        <h3>1. Choose Service</h3>
                        <p>Browse and select your preferred service</p>
                    </div>

                    <div>
                        <h3>2. Book Appointment</h3>
                        <p>Select date and time that suits you</p>
                    </div>

                    <div>
                        <h3>3. Get Service</h3>
                        <p>Visit us and enjoy your experience</p>
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section>
                <h2>Why Choose Us</h2>
                <ul>
                    <li>Certified & Experienced Stylists</li>
                    <li>100% Hygienic Environment</li>
                    <li>Premium Quality Products</li>
                    <li>Easy Online Booking</li>
                </ul>
            </section>

            {/* FINAL CTA */}
            <section>
                <h2>Ready for Your Transformation?</h2>
                <p>Book your appointment today and experience the difference</p>
                <button onClick={() => navigate("/booking")}>
                    Book Now
                </button>
            </section>

        </div>
    );
}