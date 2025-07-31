import React from "react";
import GlowBtn from "../../Common/GlowBtn";

export default function About({ about }) {
    return (
        <section className="pt-10 pb-5 px-6 md:px-20 text-center">
            <h2 className="text-2xl md:text-5xl font-bold mb-10 md:max-w-3xl mx-auto text-brand-700">Best Interior Design Company in Bangladesh</h2>
            <p className="text-gray-700 max-w-5xl mx-auto">
                <div dangerouslySetInnerHTML={{ __html: about }} />
            </p>

            <div className="mt-10 flex justify-center">
                <GlowBtn effect="grow_skew_forward" color="success" shadow={false} radius="100rem" size={{ sm: "sm", md: "md", lg: "md" }}>
                    Our Portfolio
                </GlowBtn>
                <GlowBtn effect="grow_skew_backward" color="primary" shadow={false} radius="100rem" size={{ sm: "sm", md: "md", lg: "md" }}>
                    Contact Us
                </GlowBtn>
            </div>
        </section>
    );
}
