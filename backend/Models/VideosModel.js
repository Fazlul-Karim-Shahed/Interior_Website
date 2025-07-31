const { model, Schema } = require("mongoose");

const VideosModel = model(
    "Videos",
    new Schema(
        {
            title: { type: String, required: [true, "Video name is required"] },
            url: { type: Object, name: String, url: String, contentType: String },
        },
        { timestamps: true }
    )
);

module.exports.VideosModel = VideosModel;
