const formidable = require("formidable");
const { ProjectModel } = require("../../Models/ProjectModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const mongoose = require("mongoose");

// Create project controller
const createProject = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true; // allow multiple files for images array

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send(err);

        try {
            fields = cleanObject(formDataToObj(fields));

            // Validate required ObjectId field 'service'
            if (!fields.service || !mongoose.Types.ObjectId.isValid(fields.service)) {
                return res.status(400).send({ message: "Valid service ID is required", error: true });
            }

            // Parse dates
            if (fields.startDate) fields.startDate = new Date(fields.startDate);
            if (fields.endDate) fields.endDate = new Date(fields.endDate);

            // Create project document
            const project = new ProjectModel(fields);

            // Save featureImage if uploaded
            if (files.featureImage && files.featureImage[0]) {
                const savedFeatureImage = await saveAndGetFile(files.featureImage[0]);
                project.featureImage = savedFeatureImage;
            }

            // Save clientImage if uploaded
            if (files.clientImage && files.clientImage[0]) {
                const savedClientImage = await saveAndGetFile(files.clientImage[0]);
                project.clientImage = savedClientImage;
            }

            // Save multiple images if uploaded
            if (files.images && files.images.length > 0) {
                const savedImages = await Promise.all(files.images.map((file) => saveAndGetFile(file)));
                project.images = savedImages;
            }

            await project.save();

            res.send({ message: "Project created successfully", error: false, data: project });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.createProject = createProject;
