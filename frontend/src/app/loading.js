"use client";

import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg px-10 py-8 text-center space-y-4 animate-fade-in">
                {/* Spinner */}
                <div className="w-10 h-10 border-4 border-[#a38a74] border-t-transparent rounded-full animate-spin mx-auto" />

                {/* Text */}
                <p className="text-[#4c4037] text-base font-medium animate-pulse">Loading your space...</p>
            </div>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
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
            `}</style>
        </div>
    );
}
