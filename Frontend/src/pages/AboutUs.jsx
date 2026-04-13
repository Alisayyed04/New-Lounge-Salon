import { useNavigate } from "react-router-dom";

export default function AboutUs() {
    const navigate = useNavigate();

    return (
        <section className="relative text-white overflow-hidden">

            {/* BACKGROUND LAYERS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,0,0,0.25),transparent_40%),radial-gradient(circle_at_bottom,rgba(212,175,55,0.08),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>

            {/* CONTENT */}
            <div className="relative z-10">

                {/* HERO */}
                <div className="max-w-6xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
                        <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            New Lounge Salon
                        </span>
                    </h1>

                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Where style meets precision — crafted experiences designed to elevate your confidence.
                    </p>

                    <button
                        onClick={() => navigate("/services")}
                        className="mt-10 px-8 py-3 rounded-xl text-white 
                        bg-gradient-to-r from-red-900 to-red-700 
                        hover:from-red-800 hover:to-red-600
                        transition-all duration-300 
                        shadow-lg shadow-red-900/40 
                        hover:shadow-red-700/50 
                        hover:scale-[1.03]"
                    >
                        Explore Services
                    </button>
                </div>

                {/* DIVIDER */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10"></div>

                {/* INTRO */}
                <div className="max-w-5xl mx-auto px-6 py-12 text-center">
                    <p className="text-zinc-400 leading-relaxed text-lg">
                        Located in the heart of Viman Nagar, New Lounge Salon is more than just a salon —
                        it’s a refined space built for relaxation, transformation, and confidence.
                        Every detail is designed to deliver a premium experience from the moment you walk in.
                    </p>
                </div>

                {/* STORY */}
                <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl font-semibold mb-6">
                            <span className="text-yellow-500">Our Story</span>
                        </h2>

                        <p className="text-zinc-400 mb-4">
                            New Lounge Salon was built on a simple philosophy — combining expertise,
                            hygiene, and creativity into one seamless experience.
                        </p>

                        <p className="text-zinc-400">
                            We don’t just provide services. We understand your style, your preferences,
                            and craft results that feel uniquely yours.
                        </p>
                    </div>

                    {/* QUOTE CARD */}
                    <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 backdrop-blur-xl rounded-2xl p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-yellow-500 transition-all duration-300">
                        <p className="text-yellow-500 italic text-lg">
                            “Luxury is in the detail — and every detail matters.”
                        </p>
                    </div>

                </div>

                {/* SERVICES */}
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-semibold text-center mb-12">
                        <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            What We Offer
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            "Haircuts, styling & coloring",
                            "Facials & skincare treatments",
                            "Manicure & pedicure",
                            "Waxing & grooming",
                            "Makeup for every occasion",
                            "Hair treatments & care"
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-b from-[#111] to-[#0a0a0a] 
                                border border-white/5 
                                backdrop-blur-xl 
                                p-6 rounded-2xl 
                                text-center 
                                shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
                                hover:border-yellow-500 
                                hover:scale-[1.02] 
                                transition-all duration-300"
                            >
                                <p className="text-zinc-300">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WHY US */}
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 backdrop-blur-xl rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
                        <h2 className="text-3xl font-semibold text-center mb-10">
                            <span className="text-yellow-500">Why Choose Us</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                "Experienced & skilled professionals",
                                "Clean, hygienic & relaxing environment",
                                "Premium products & modern techniques",
                                "Personalized consultation for every client",
                                "Consistent, high-quality results",
                                "Attention to detail in every service"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-red-700 rounded-full"></span>
                                    <p className="text-zinc-400">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PROMISE */}
                <div className="max-w-5xl mx-auto px-6 py-24 text-center">
                    <h2 className="text-3xl font-semibold mb-6">
                        <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            Our Promise
                        </span>
                    </h2>

                    <p className="text-zinc-400 mb-4">
                        Every visit is designed to leave you feeling confident, refreshed, and elevated.
                        We focus not just on how you look — but how you feel.
                    </p>

                    <p className="text-zinc-500 italic">
                        Because you deserve more than a service — you deserve an experience.
                    </p>

                    <button
                        onClick={() => navigate("/services")}
                        className="mt-10 px-8 py-3 rounded-xl text-white 
                        bg-gradient-to-r from-red-900 to-red-700 
                        hover:from-red-800 hover:to-red-600
                        transition-all duration-300 
                        shadow-lg shadow-red-900/40 
                        hover:shadow-red-700/50 
                        hover:scale-[1.03]"
                    >
                        Check Out Services
                    </button>
                </div>

            </div>
        </section>
    );
}