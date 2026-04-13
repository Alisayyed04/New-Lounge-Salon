import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
export default function Booking() {
    let { id: ID } = useParams();
    let [data, setData] = useState(null);
    const { showAlert } = useAlert();

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");

            try {
                let res = await axios.get(
                    `${API}/api/bookings/` + ID,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setData(res.data.data);
            } catch (err) {
                showAlert(
                    err.response?.data?.message || "Failed to fetch booking"
                );
            }
        };

        getData();
    }, [ID]);

    if (!data) {
        return (
            <section className="text-white text-center py-20">
                Loading booking...
            </section>
        );
    }

    const getImage = () => {
        if (data?.service?.image?.url) return data.service.image.url;
        if (data?.service?.image) return data.service.image;
        if (data?.service?.img) return data.service.img;
        return "/photos/default-service.jpg";
    };

    const date = data?.date?.split("T")[0];

    return (
        <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-20">

            {/* RECEIPT CARD */}
            <div className="w-full max-w-md bg-gradient-to-b from-[#111] to-[#0a0a0a] 
            border border-yellow-500/20 
            rounded-2xl 
            shadow-[0_0_60px_rgba(255,215,0,0.08)] 
            overflow-hidden">

                {/* TOP IMAGE */}
                <div className="relative">
                    <img
                        src={getImage()}
                        alt={data?.service?.name}
                        className="w-full h-48 object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-yellow-400">
                        {data?.service?.name}
                    </h2>
                </div>

                {/* RECEIPT BODY */}
                <div className="p-6 space-y-5">

                    {/* TITLE */}
                    <div className="text-center">
                        <h3 className="text-lg tracking-widest text-yellow-500">
                            BOOKING RECEIPT
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            New Lounge Salon
                        </p>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-dashed border-white/10"></div>

                    {/* DETAILS */}
                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span className="text-zinc-400">Service</span>
                            <span className="text-white">{data?.service?.category}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-400">Date</span>
                            <span className="text-white">{date}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-400">Time</span>
                            <span className="text-white">{data?.time}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-400">Status</span>
                            <span className="text-yellow-400 capitalize">
                                {data?.status}
                            </span>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-dashed border-white/10"></div>

                    {/* TOTAL */}
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400 text-sm">Total</span>
                        <span className="text-xl font-semibold text-yellow-400">
                            ₹{data?.totalPrice}
                        </span>
                    </div>

                    {/* NOTES */}
                    {data?.notes && (
                        <>
                            <div className="border-t border-dashed border-white/10"></div>

                            <div>
                                <p className="text-zinc-400 text-xs mb-1">Notes</p>
                                <p className="text-zinc-300 text-sm italic">
                                    {data.notes}
                                </p>
                            </div>
                        </>
                    )}

                    {/* FOOTER */}
                    <div className="pt-4 text-center text-xs text-zinc-500">
                        Thank you for choosing New Lounge ✂️
                    </div>
                </div>
            </div>

        </section>
    );
}