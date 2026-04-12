

export default function Contact() {


    const phone = "919156888532"; // 🔥 replace
    const insta = "https://instagram.com/shamma_makeup_artist"; // 🔥 replace
    const email = "alisayyed125540@gmail.com"; // 🔥 replace

    const message = encodeURIComponent(
        `Hi, I want to book a service 💄

Name:
Service:
Preferred Date:
Preferred Time:
`
    );

    const openWhatsApp = () => {
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    const openInstagram = () => {
        window.open(insta, "_blank");
    };

    const openEmail = () => {
        window.open(
            `mailto:${email}?subject=Salon Booking&body=${message}`,
            "_blank"
        );
    };

    return (
        <div>
            <h1>Contact Us</h1>

            <p>📍 Viman Nagar, Pune</p>
            <p>📞 +91 9156888532</p>

            <h3>Reach Us Instantly</h3>

            <button onClick={openWhatsApp}>
                WhatsApp 💬
            </button>

            <button onClick={openInstagram}>
                Instagram 📸
            </button>

            <button onClick={openEmail}>
                Email 📧
            </button>
        </div>
    );
}