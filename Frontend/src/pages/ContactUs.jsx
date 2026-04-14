export default function Contact() {

    const phone = "918766613766";
    const insta = "https://instagram.com/shamaa_makeup_artist";
    const email = "alisayyed125540@gmail.com";

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
        <div className="bg-black text-white min-h-screen px-6 lg:px-16 py-12 pt-20">

            {/* HERO */}
            <section className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Get in <span className="text-yellow-500">Touch</span>
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Have questions or ready to book your next transformation?
                    Reach out to New Lounge Salon — we’re here to help.
                </p>
            </section>

            {/* CONTACT CARDS */}
            <section className="grid md:grid-cols-3 gap-6 mb-16">

                <div className="bg-zinc-900 p-6 rounded-xl text-center">
                    <h3 className="text-xl font-semibold text-red-500 mb-2">📍 Location</h3>
                    <p className="text-gray-400">Town square shopping center ,VIP road, New Airport Rd, near dorabjee mall, Viman Nagar, Pune, Maharashtra 411014</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl text-center">
                    <h3 className="text-xl font-semibold text-yellow-500 mb-2">📞 Call Us</h3>
                    <p className="text-gray-400">+91 8766613766</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl text-center">
                    <h3 className="text-xl font-semibold text-red-500 mb-2">🕒 Hours</h3>
                    <p className="text-gray-400">Mon - Sun: 11:00 AM - 8:00 PM</p>
                </div>

            </section>

            {/* ACTION BUTTONS */}
            <section className="text-center mb-20">
                <h2 className="text-2xl font-bold mb-6">
                    Reach Us Instantly
                </h2>

                <div className="flex flex-wrap justify-center gap-4">

                    <button
                        onClick={openWhatsApp}
                        className="bg-green-600 px-6 py-3 rounded font-semibold hover:bg-green-500 transition"
                    >
                        WhatsApp 💬
                    </button>

                    <button
                        onClick={openInstagram}
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 px-6 py-3 rounded font-semibold hover:opacity-90 transition"
                    >
                        Instagram 📸
                    </button>

                    <button
                        onClick={openEmail}
                        className="border border-yellow-500 px-6 py-3 rounded hover:bg-yellow-500 hover:text-black transition"
                    >
                        Email 📧
                    </button>

                </div>
            </section>

            {/* EXTRA INFO */}
            <section className="grid lg:grid-cols-2 gap-10 items-center">

                {/* IMAGE (replace later) */}
                <img
                    src="/sup1.jpeg"
                    className="rounded-xl object-cover w-full h-[350px]"
                />

                {/* TEXT */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">
                        Visit <span className="text-yellow-500">New Lounge</span>
                    </h2>

                    <p className="text-gray-400 mb-4">
                        Experience premium grooming and beauty services in a
                        modern, hygienic, and relaxing environment located in
                        the heart of Viman Nagar.
                    </p>

                    <p className="text-gray-400 mb-6">
                        Whether it's a quick touch-up or a full transformation,
                        our expert stylists are ready to deliver perfection.
                    </p>

                    <button
                        onClick={openWhatsApp}
                        className="bg-red-600 px-6 py-3 rounded hover:bg-red-500 transition"
                    >
                        Book via WhatsApp
                    </button>
                </div>

            </section>

        </div>
    );
}