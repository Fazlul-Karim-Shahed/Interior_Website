import React from "react";
import ClientImageWithLoader from "../../Common/ClientImageWithLoader";
import Link from "next/link";
import { slugify } from "@/src/functions/CustomFunction";

export default function Portfolio({ projects }) {
    return (
        <section className="pt-10 pb-5 px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 tracking-wide">Our Portfolio</h2>
            <div className="max-w-7xl mx-auto grid  gap-4 md:gap-7 lg:gap-10 grid-cols-2 md:grid-cols-3">
                {projects.map((project, i) => (
                    <Link href={`/project/${slugify(project.name)}`} key={i} className="group cursor-pointer shadow-lg rounded-3xl bg-white overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                        <div className="relative w-full aspect-[4/3] rounded-3xl">
                            <ClientImageWithLoader src={project.featureImage.url} alt={project.alt} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0  transition-opacity duration-300 pointer-events-none rounded-3xl"></div>
                        </div>
                        <div className="py-4 px-5">
                            <h3 className="text-sm md:text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{project.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
