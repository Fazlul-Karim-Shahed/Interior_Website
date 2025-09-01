"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsApp({ contact }) {
    return (
        <FloatingWhatsApp
            avatar="/Logo_Trans.svg"
            phoneNumber={contact.whatsapp}
            accountName={"Misoran Interior BD"}
            allowEsc
            key="whatsapp"
            chatMessage={"হ্যালো! Misoran Interior BD-তে স্বাগতম 🤝 \n\nআপনাকে কিভাবে সাহায্য করতে পারি?"}
        />
    );
}
