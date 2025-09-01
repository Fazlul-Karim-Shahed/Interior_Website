const { model, Schema } = require("mongoose");

const SettingsModel = model(
    "Settings",
    new Schema(
        {
            sliderImages: [
                {
                    name: { type: String },
                    url: { type: String },
                    contentType: { type: String },
                },
            ],
            about: { type: String },
            services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
            projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
            videos: [{ type: Schema.Types.ObjectId, ref: "Videos" }],

            // Contact info
            contact: {
                gmail: { type: String },
                whatsapp: { type: String },
                phone1: { type: String },
                phone2: { type: String },
                facebook: { type: String },
                linkedin: { type: String },
                twitter: { type: String },
                instagram: { type: String },
                youtube: { type: String },
                address: { type: String },

            },

            heroVisibility: { type: Boolean, default: true },
            aboutVisibility: { type: Boolean, default: true },
            servicesVisibility: { type: Boolean, default: true },
            whyChooseUsVisibility: { type: Boolean, default: true },
            projectsVisibility: { type: Boolean, default: true },
            videosVisibility: { type: Boolean, default: true },
            workingProcessVisibility: { type: Boolean, default: true },
            reviewVisibility: { type: Boolean, default: true },
            clientVisibility: { type: Boolean, default: true },
            contactVisibility: { type: Boolean, default: true },
            signupVisibility: { type: Boolean, default: true },
        },
        { timestamps: true }
    )
);

module.exports.SettingsModel = SettingsModel;
