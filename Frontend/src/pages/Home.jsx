import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white">

            {/* HERO */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 gap-10">

                {/* LEFT TEXT */}
                <div className="max-w-xl space-y-6">
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                        Luxury Grooming <span className="text-yellow-500">&</span> Salon Experience
                    </h1>

                    <p className="text-gray-400 text-lg">
                        Step into <span className="text-red-600 font-semibold">New Lounge Salon</span> —
                        where style meets precision. Premium services, elite stylists,
                        and a vibe that defines confidence.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/services")}
                            className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded hover:bg-yellow-400 transition"
                        >
                            Explore Services
                        </button>

                        <button
                            onClick={() => navigate("/services")}
                            className="border border-red-600 px-6 py-3 rounded hover:bg-red-600 transition"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                {/* RIGHT IMAGES GRID */}
                <div className="grid grid-cols-2 gap-4 w-full lg:w-[500px]">
                    <img src="./sup1.jpeg" className="rounded-xl object-cover h-40 w-full" />
                    <img src="./sup2.jpeg" className="rounded-xl object-cover h-40 w-full" />
                    <img src="./sup3.jpeg" className="rounded-xl object-cover h-40 w-full col-span-2" />
                </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section className="px-6 lg:px-16 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Our <span className="text-yellow-500">Premium Services</span>
                </h2>
                <p className="text-gray-400 mb-10">
                    Designed to elevate your look and confidence
                </p>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition">
                        <h3 className="text-xl font-semibold text-red-500 mb-2">Hair Styling</h3>
                        <p className="text-gray-400">Basic & advanced hairStyles, coloring & advanced treatments</p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition">
                        <h3 className="text-xl font-semibold text-yellow-500 mb-2">Skin Care</h3>
                        <p className="text-gray-400">Facials, glow treatments & deep cleansing</p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition">
                        <h3 className="text-xl font-semibold text-red-500 mb-2">Makeup</h3>
                        <p className="text-gray-400">Bridal makeup's, Traditional Bridal looks </p>
                    </div>

                </div>

                <button
                    onClick={() => navigate("/services")}
                    className="mt-10 bg-red-600 px-8 py-3 rounded hover:bg-red-500 transition"
                >
                    View All Services
                </button>
            </section>

            {/* BRAND STORY */}
            <section className="px-6 lg:px-16 py-20 grid lg:grid-cols-2 gap-10 items-center">

                <img
                    src="/sup5.jpeg"
                    className="rounded-xl object-cover w-full h-[350px]"
                />

                <div>
                    <h2 className="text-3xl font-bold mb-4">
                        About <span className="text-yellow-500">New Lounge</span>
                    </h2>

                    <p className="text-gray-400 mb-4">
                        Located in Viman Nagar, Town Square, New Lounge Salon
                        delivers a premium grooming experience tailored for modern lifestyles.
                    </p>

                    <p className="text-gray-400 mb-6">
                        From precision haircuts to luxury skin treatments,
                        we combine expertise with top-tier products to ensure
                        every visit leaves you confident and refreshed.
                    </p>

                    <button
                        onClick={() => navigate("/services")}
                        className="border border-yellow-500 px-6 py-3 rounded hover:bg-yellow-500 hover:text-black transition"
                    >
                        Discover Services
                    </button>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="px-6 lg:px-16 py-16 text-center bg-zinc-950">
                <h2 className="text-3xl font-bold mb-10">
                    How It <span className="text-red-600">Works</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div>
                        <h3 className="text-xl font-semibold mb-2">1. Choose Service</h3>
                        <p className="text-gray-400">Browse from our premium offerings</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">2. Book Instantly</h3>
                        <p className="text-gray-400">Pick your preferred time slot</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">3. Get Styled</h3>
                        <p className="text-gray-400">Walk in & enjoy the experience</p>
                    </div>

                </div>
            </section>

            {/* WHY US */}
            <section className="px-6 lg:px-16 py-16 text-center">
                <h2 className="text-3xl font-bold mb-8">
                    Why Choose <span className="text-yellow-500">Us</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">

                    <div>✔ Certified & Skilled Professionals</div>
                    <div>✔ Premium Products Only</div>
                    <div>✔ Hygienic & Modern Setup</div>
                    <div>✔ Seamless Online Booking</div>

                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-6 lg:px-16 py-20 text-center bg-gradient-to-r from-black via-zinc-900 to-black">
                <h2 className="text-4xl font-bold mb-4">
                    Ready for a <span className="text-red-600">New Look?</span>
                </h2>

                <p className="text-gray-400 mb-8">
                    Experience premium grooming like never before
                </p>

                <button
                    onClick={() => navigate("/services")}
                    className="bg-yellow-500 text-black px-10 py-4 rounded font-semibold hover:bg-yellow-400 transition"
                >
                    Get Started
                </button>
            </section>

        </div>
    );
}