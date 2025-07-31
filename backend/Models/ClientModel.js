const { model, Schema } = require("mongoose");

const ClientModel = model(
    "Client",
    new Schema(
        {
            name: { type: String, required: [true, "Video name is required"] },
            image: { type: Object, name: String, url: String, contentType: String },
        },
        { timestamps: true }
    )
);

module.exports.ClientModel = ClientModel;
