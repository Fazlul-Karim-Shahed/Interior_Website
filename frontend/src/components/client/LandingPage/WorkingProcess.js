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
        <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white to-gray-100 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-14">Working Process</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center group">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sky-100 group-hover:bg-sky-600 transition-colors duration-300 mb-4 shadow-inner">
                            <FontAwesomeIcon icon={step.icon} className="text-sky-600 group-hover:text-white transition-all duration-300 text-2xl" />
                        </div>
                        <p className="text-gray-700 font-semibold text-sm md:text-base">{step.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
