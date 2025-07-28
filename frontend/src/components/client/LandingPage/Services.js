import React from "react";

export default function Services() {
    return (
        <section className="py-16 px-6 md:px-20 bg-gray-100 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10">Our Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[
                    { title: "Home Interior", desc: "Personalized design for your home." },
                    { title: "Office Interior", desc: "Modern & productive workspace design." },
                    { title: "Custom Furniture", desc: "Unique furniture for every space." },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
