"use client";

import React from "react";

const sizeMap = {
    sm: "font-size: 0.875rem; padding: 0.5rem 1rem;",
    md: "font-size: 1rem; padding: 0.75rem 1.5rem;",
    lg: "font-size: 1.125rem; padding: 1rem 2rem;",
};

const colorMap = {
    primary: {
        bg: "#a855f7",
        glow: "#c084fc",
        hoverText: "#581c87",
    },
    neutral: {
        bg: "#6c757d",
        glow: "#adb5bd",
        hoverText: "#343a40",
    },
    danger: {
        bg: "#dc3545",
        glow: "#ff6f71",
        hoverText: "#720026",
    },
    success: {
        bg: "#28a745",
        glow: "#71ff6f",
        hoverText: "#145214",
    },
    warning: {
        bg: "#ffc107",
        glow: "#ffe066",
        hoverText: "#665200",
    },
    info: {
        bg: "#17a2b8",
        glow: "#66d9e8",
        hoverText: "#0f4c56",
    },
    purple: {
        bg: "#6f42c1",
        glow: "#a093ff",
        hoverText: "#27133a",
    },
    pink: {
        bg: "#d6336c",
        glow: "#ff7eb6",
        hoverText: "#3b0b2a",
    },
    cyan: {
        bg: "#0dcaf0",
        glow: "#87e9fd",
        hoverText: "#065664",
    },
    orange: {
        bg: "#fd7e14",
        glow: "#fda766",
        hoverText: "#7a4607",
    },
    indigo: {
        bg: "#4c51bf",
        glow: "#7896ff",
        hoverText: "#1b1c3f",
    },
    "dark-navy": {
        bg: "#1a202c",
        glow: "#6f7c9d",
        hoverText: "#05070a",
    },
};

const GlowBtn = ({
    effect = "slide_from_left",
    size = { sm: "sm", md: "md", lg: "lg" },
    color = "primary",
    shadow = true,
    radius = "0.5rem",
    animation = false, // <-- NEW PARAM
    children,
    ...props
}) => {
    const responsiveSize =
        typeof size === "string"
            ? { sm: size, md: size, lg: size }
            : {
                  sm: size.sm || "sm",
                  md: size.md || "md",
                  lg: size.lg || "lg",
              };

    const c = colorMap[color] || colorMap.primary;
    const boxShadowHover = shadow ? `0 8px 20px var(--btn-glow)` : "none";

    return (
        <>
            <button
                className={`${effect} btn-responsive ${animation ? "glossy-animated" : ""}`}
                style={{
                    "--btn-bg": c.bg,
                    "--btn-glow": c.glow,
                    "--btn-hover-text": c.hoverText,
                    "--btn-box-shadow": boxShadowHover,
                    borderRadius: radius,
                }}
                {...props}
            >
                {children}
            </button>

            <style jsx >{`
                button {
                    font-weight: 600;
                    font-family: "Segoe UI", sans-serif;
                    background: var(--btn-bg);
                    color: white;
                    border: none;
                    position: relative;
                    z-index: 1;
                    overflow: hidden;
                    transition: color 0.3s ease, transform 0.2s, box-shadow 0.3s ease;
                    margin: 1rem;
                    cursor: pointer;
                }

                button:hover {
                    color: var(--btn-hover-text);
                    transform: translateY(-1px);
                    box-shadow: var(--btn-box-shadow);
                }

                button::after {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    background: var(--btn-glow);
                    transition: all 0.35s ease;
                }

                .slide_from_left::after {
                    top: 0;
                    bottom: 0;
                    left: -100%;
                    right: 100%;
                }
                .slide_from_left:hover::after {
                    left: 0;
                    right: 0;
                }

                .slide_from_right::after {
                    top: 0;
                    bottom: 0;
                    left: 100%;
                    right: -100%;
                }
                .slide_from_right:hover::after {
                    left: 0;
                    right: 0;
                }

                .slide_from_top::after {
                    left: 0;
                    right: 0;
                    top: -100%;
                    bottom: 100%;
                }
                .slide_from_top:hover::after {
                    top: 0;
                    bottom: 0;
                }

                .slide_from_bottom::after {
                    left: 0;
                    right: 0;
                    top: 100%;
                    bottom: -100%;
                }
                .slide_from_bottom:hover::after {
                    top: 0;
                    bottom: 0;
                }

                button.grow_box::after {
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    transform: scale(0, 0);
                }
                button.grow_box:hover::after {
                    transform: scale(1, 1);
                }

                button.grow_ellipse::after {
                    border-radius: 50%;
                    left: -50%;
                    right: -50%;
                    top: -150%;
                    bottom: -150%;
                    transform: scale(0, 0);
                }
                button.grow_ellipse:hover::after {
                    transform: scale(1, 1);
                }

                button.grow_skew_forward::after {
                    left: -20%;
                    right: -20%;
                    top: 0;
                    bottom: 0;
                    transform: skewX(-45deg) scale(0, 1);
                }
                button.grow_skew_forward:hover::after {
                    transform: skewX(-45deg) scale(1, 1);
                }

                button.grow_skew_backward::after {
                    left: -20%;
                    right: -20%;
                    top: 0;
                    bottom: 0;
                    transform: skewX(45deg) scale(0, 1);
                }
                button.grow_skew_backward:hover::after {
                    transform: skewX(45deg) scale(1, 1);
                }

                button.grow_spin::after {
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    transform: scale(0, 0) rotate(-180deg);
                }
                button.grow_spin:hover::after {
                    transform: scale(1, 1) rotate(0deg);
                }

                /* Responsive sizes */
                @media (max-width: 639px) {
                    .btn-responsive {
                        ${sizeMap[responsiveSize.sm]}
                    }
                }
                @media (min-width: 640px) and (max-width: 1023px) {
                    .btn-responsive {
                        ${sizeMap[responsiveSize.md]}
                    }
                }
                @media (min-width: 1024px) {
                    .btn-responsive {
                        ${sizeMap[responsiveSize.lg]}
                    }
                }

                /* Glossy Animation */
                .glossy-animated {
                    position: relative;
                    overflow: hidden;
                    isolation: isolate;
                }

                .glossy-animated::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -75%;
                    height: 100%;
                    width: 50%;
                    background: linear-gradient(120deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.1) 100%);
                    transform: skewX(-20deg);
                    animation: glossy-slide 4s infinite;
                    z-index: 0;
                    pointer-events: none;
                }

                .glossy-animated > * {
                    position: relative;
                    z-index: 1;
                }

                @keyframes glossy-slide {
                    0% {
                        left: -75%;
                    }
                    100% {
                        left: 125%;
                    }
                }
            `}</style>
        </>
    );
};

export default GlowBtn;
