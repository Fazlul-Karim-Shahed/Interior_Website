import React from "react";
import { faPerson, faTableCells, faDraftingCompass, faSackDollar, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const steps = [
    { title: "Project Visit", icon: faPerson },
    { title: "Design Proposal", icon: faTableCells },
    { title: "2D Layout Plan & 3D Design", icon: faDraftingCompass },
    { title: "Total Budget Submit", icon: faSackDollar },
    { title: "Agreement", icon: faFileSignature },
];

export default function WorkingProcess() {
    return (
        <section className="pt-10 pb-5 px-6 text-center bg-gradient-to-br from-brand-50 to-white">
            <h2 className="text-4xl font-bold text-brand-900 mb-14">Working Process</h2>

            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 md:gap-7 lg:gap-10">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="bg-brand-100/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center group"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-200 group-hover:bg-brand-600 transition-colors duration-300 mb-4 shadow-inner">
                            <FontAwesomeIcon icon={step.icon} className="text-brand-700 group-hover:text-brand-50 transition-all duration-300 text-2xl" />
                        </div>
                        <p className="text-brand-800 font-semibold text-sm md:text-base">{step.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
