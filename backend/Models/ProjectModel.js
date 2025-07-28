const { model, Schema } = require("mongoose");

const ProjectModel = model(
    "Project",
    new Schema(
        {
            service: { type: Schema.Types.ObjectId, ref: "Service" },
            name: { type: String, required: [true, "Project name is required"] },
            description: { type: String },
            featureImage: { type: Object, name: String, url: String, contentType: String },
            images: [{ type: Object, name: String, url: String, contentType: String }],
            location: { type: String, required: [true, "Location is required"] },
            startDate: { type: Date, required: [true, "Start date is required"] },
            endDate: { type: Date },
            status: { type: String, required: [true, "Status is required"] },
            clientName: { type: String, required: [true, "Client name is required"] },
            clientMobile: { type: String, required: [true, "Client mobile number is required"] },
            clientEmail: { type: String },
            clientImage: { type: Object, name: String, url: String, contentType: String },
        },
        { timestamps: true }
    )
);

module.exports.ProjectModel = ProjectModel;
