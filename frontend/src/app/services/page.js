"use client";

import React, { useEffect, useState } from "react";
import { getAllServiceApi } from "@/src/api/ServiceApi";

export default function ShowAllServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await getAllServiceApi();
            if (!res.error) {
                setServices(res.data);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-800">
            {/* HEADER SECTION */}
            <div
                className="w-full h-56 md:h-72 bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1594873604892-b599f847e859?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <h1 className="relative text-white text-3xl md:text-5xl font-extrabold tracking-wide text-center drop-shadow-lg">Our Premium Services</h1>
            </div>

            {/* SERVICES LIST */}
            <div className="px-6 md:px-20 py-16">
                {loading ? (
                    <p className="text-center text-gray-500 text-lg">Loading services...</p>
                ) : services.length === 0 ? (
                    <p className="text-center text-red-500 text-lg">No services found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map(({ _id, name, description, image }) => (
                            <div key={_id} className="bg-white/30 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl transition duration-300 rounded-3xl overflow-hidden">
                                {/* Responsive Image Box */}
                                {image?.url && (
                                    <div className="relative w-full pt-[56.25%] overflow-hidden">
                                        <img src={image.url} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                                    </div>
                                )}

                                {/* Card Content */}
                                <div className="p-6 flex flex-col h-full">
                                    <h2 className="text-xl font-bold text-brand-800 mb-2">{name}</h2>
                                    <p className="text-gray-700 text-sm leading-relaxed mt-4 overflow-hidden pr-1 line-clamp-2 ">
                                        <div dangerouslySetInnerHTML={{ __html: description }} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
