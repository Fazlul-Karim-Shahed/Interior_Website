const { model, Schema } = require("mongoose");

const SettingsModel = model(
    "Settings",
    new Schema(
        {
            coverPhoto: { type: Object, contentType: String, name: String },
            
        },
        { timestamps: true }
    )
);

module.exports.SettingsModel = SettingsModel;
