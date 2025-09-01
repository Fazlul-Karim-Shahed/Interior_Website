import React from "react";
import ClientImageWithLoader from "../../Common/ClientImageWithLoader";
import Link from "next/link";
import { slugify } from "@/src/functions/CustomFunction";

export default function Services({ services }) {
    return (
        <section className="pt-10 pb-5 px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-brand-dark-navy-900 text-center">Our Services</h2>

            <div className="max-w-7xl mx-auto grid  gap-4 md:gap-7 lg:gap-10 grid-cols-2 md:grid-cols-3">
                {services.map((item, idx) => (
                    <Link
                        href={`/services/${slugify(item.name)}`}
                        key={idx}
                        className="bg-white/80 backdrop-blur-md border border-brand-dark-navy-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative w-full aspect-[4/3] bg-slate-100">
                            <ClientImageWithLoader src={item.image.url} alt={item.title} fill className="object-cover object-center transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-sm md:text-lg font-semibold text-brand-dark-navy-600 my-3">{item.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
