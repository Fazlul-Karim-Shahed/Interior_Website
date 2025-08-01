"use client";

import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg px-10 py-8 text-center animate-fade-in space-y-4">
                {/* Spinner */}
                <div className="w-10 h-10 border-[3px] border-[#a38a74] border-t-transparent rounded-full animate-spin-slow mx-auto" />

                {/* Text */}
                <p className="text-[#4c4037] text-base font-medium animate-pulse-slow">Loading your space...</p>
            </div>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out both;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-spin-slow {
                    animation: spin 1.2s linear infinite;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .animate-pulse-slow {
                    animation: pulse 2.2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </div>
    );
}
