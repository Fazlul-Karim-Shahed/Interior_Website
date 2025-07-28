const { model, Schema } = require("mongoose");

const ServiceModel = model(
    "Service",
    new Schema(
        {
            name: { type: String, required: [true, "Service name is required"] },
            description: { type: String },
            image: { type: Object, name: String, url: String, contentType: String },
        },
        { timestamps: true }
    )
);

module.exports.ServiceModel = ServiceModel;
