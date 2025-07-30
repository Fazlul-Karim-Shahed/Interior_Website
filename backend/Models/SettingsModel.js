const { model, Schema } = require("mongoose");

const SettingsModel = model(
    "Settings",
    new Schema(
        {
            sliderImages: [{ type: Object, name: String, url: String, contentType: String }],
            about: { type: String },
            services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
            projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
            videos: [{ type: Schema.Types.ObjectId, ref: "Videos" }],
        },
        { timestamps: true }
    )
);

module.exports.SettingsModel = SettingsModel;
