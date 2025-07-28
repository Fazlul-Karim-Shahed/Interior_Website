const formidable = require("formidable");
const { ProjectModel } = require("../../Models/ProjectModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const mongoose = require("mongoose");

const updateProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid project ID", error: true });

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send(err);

        try {
            // Convert form fields to usable object and clean
            fields = cleanObject(formDataToObj(fields));

            // Parse dates if present
            if (fields.startDate) fields.startDate = new Date(fields.startDate);
            if (fields.endDate) fields.endDate = new Date(fields.endDate);

            // Find the existing project
            const project = await ProjectModel.findById(id);
            if (!project) return res.status(404).send({ message: "Project not found", error: true });

            // Update other fields except images
            Object.assign(project, fields);

            // Handle featureImage
            if (files.featureImage && files.featureImage[0]) {
                // New featureImage uploaded: replace
                project.featureImage = await saveAndGetFile(files.featureImage[0]);
            } else if (fields.existingFeatureImage) {
                // Keep existing featureImage sent from frontend (JSON string)
                project.featureImage = JSON.parse(fields.existingFeatureImage);
            } else {
                // No existing featureImage and no new upload: clear
                project.featureImage = null;
            }

            // Handle clientImage
            if (files.clientImage && files.clientImage[0]) {
                project.clientImage = await saveAndGetFile(files.clientImage[0]);
            } else if (fields.existingClientImage) {
                project.clientImage = JSON.parse(fields.existingClientImage);
            } else {
                project.clientImage = null;
            }

            // Handle multiple images
            let existingImages = [];
            if (fields.existingImages) {
                // Parse JSON array of existing images to keep
                existingImages = JSON.parse(fields.existingImages);
            }

            // Save new uploaded images if any
            let newImages = [];
            if (files.images && files.images.length > 0) {
                newImages = await Promise.all(files.images.map((file) => saveAndGetFile(file)));
            }

            // Combine kept existing images and newly uploaded images
            project.images = [...existingImages, ...newImages];

            // Save updated project
            await project.save();

            res.send({ message: "Project updated successfully", error: false, data: project });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.updateProject = updateProject;
