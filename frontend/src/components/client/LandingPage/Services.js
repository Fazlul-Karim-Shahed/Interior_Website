import React from "react";
import ClientImageWithLoader from "../../Common/ClientImageWithLoader";

export default function Services({ services }) {
    return (
        <section className="pt-10 pb-5 px-6 bg-gradient-to-br from-brand-50 to-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-brand-dark-navy-900 text-center">Our Services</h2>

            <div className="max-w-7xl mx-auto grid  gap-4 md:gap-7 lg:gap-10 grid-cols-2 md:grid-cols-3">
                {services.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 backdrop-blur-md border border-brand-dark-navy-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative w-full aspect-[4/3]">
                            <ClientImageWithLoader src={item.image.url} alt={item.title} fill className="object-cover object-center transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="md:text-lg font-semibold text-brand-dark-navy-600 mb-1">{item.name}</h3>
                            {/* <div className="text-xs md:text-sm text-brand-dark-navy-900 hidden md:block line-clamp-2">
                                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
