const { sendEmail } = require("../../Functions/sendEmail");

const createBooking = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                error: true,
                message: "Name, email, and message are required.",
            });
        }

        // Email to Admin
        const adminEmailContent = `
            <h2>📩 New Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
        `;

        // await sendEmail(process.env.EMAIL_USER, "New Booking Request", adminEmailContent);

        // Feedback Email to Client
        const clientFeedbackContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 10px;">
                <div style="margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h2 style="color: #333;">Thank You for Booking with Us!</h2>
                    <p>Dear <strong>${name}</strong>,</p>
                    <p>We have received your booking request and will get back to you as soon as possible.</p>
                    <p style="margin-top: 20px;"><strong>Your Message:</strong></p>
                    <p style="font-style: italic;">${message.replace(/\n/g, "<br>")}</p>
                    <p style="margin-top: 30px;">If you have any urgent queries, feel free to reach out to us at <a href="mailto:triovabd@gmail.com">triovabd@gmail.com</a>.</p>
                    <p>Best regards,<br><strong>Misoran Interior Team</strong></p>
                </div>
            </div>
        `;

        await sendEmail(email, "We Received Your Booking Request", clientFeedbackContent);

        return res.status(200).json({
            error: false,
            message: "Booking request sent successfully.",
        });
    } catch (err) {
        console.error("Booking Error:", err);
        return res.status(500).json({
            error: true,
            message: "An error occurred while processing the booking.",
        });
    }
};

module.exports = { createBooking };
