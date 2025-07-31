const { model, Schema } = require("mongoose");

const VideosModel = model(
    "Videos",
    new Schema(
        {
            title: { type: String, required: [true, "Video name is required"] },
            url: { type: String, required: [true, "Video URL is required"] },
        },
        { timestamps: true }
    )
);

module.exports.VideosModel = VideosModel;
