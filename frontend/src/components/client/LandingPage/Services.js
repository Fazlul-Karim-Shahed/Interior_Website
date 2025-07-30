import React from "react";
import ClientImageWithLoader from "../../Common/ClientImageWithLoader";

const services = [
    {
        title: "Home Interior",
        desc: "Elegant and functional designs to create cozy, stylish living spaces.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Office Interior",
        desc: "Modern office environments designed to boost productivity and comfort.",
        image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Custom Furniture",
        desc: "Handcrafted furniture tailored to your space, style, and needs.",
        image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=800&q=80",
    },
];

export default function Services() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-brand-50 to-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-brand-dark-navy-900 text-center">Our Services</h2>

            <div className=" max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                {services.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 backdrop-blur-md border border-brand-dark-navy-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative w-full h-72">
                            <ClientImageWithLoader src={item.image} alt={item.title} fill className="object-cover object-center rounded-t-3xl transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="p-5 text-center">
                            <h3 className="text-xl font-bold text-brand-dark-navy-500 mb-2">{item.title}</h3>
                            <p className="text-sm text-brand-dark-navy-900">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
