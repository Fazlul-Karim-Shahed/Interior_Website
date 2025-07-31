const { model, Schema } = require("mongoose");

const ReviewModel = model(
    "Review",
    new Schema(
        {
            name: { type: String, required: [true, "Review name is required"] },
            review: { type: String },
            customerImage: { type: Object, name: String, url: String, contentType: String },
            customerDesignation: { type: String },
        },
        { timestamps: true }
    )
);

module.exports.ReviewModel = ReviewModel;
